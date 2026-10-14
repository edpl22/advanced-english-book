/* Service worker: caches every built file on install so the book works
   offline after the first visit. The list comes from precache-manifest.json,
   written by the build (see vite.config.ts). */

const PREFIX = 'aeb-';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const res = await fetch('./precache-manifest.json', { cache: 'no-store' });
      const { version, files } = await res.json();
      const cache = await caches.open(PREFIX + version);
      await cache.addAll(files.map((f) => new URL(f, self.registration.scope).toString()));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const res = await fetch('./precache-manifest.json', { cache: 'no-store' }).catch(() => null);
      const current = res ? PREFIX + (await res.json()).version : null;
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== current).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

// Module scripts are requested with an Origin header while the precache used
// plain requests; servers that send "Vary: Origin" would otherwise never match.
const MATCH = { ignoreVary: true, ignoreSearch: false };

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Network first for the page itself (to pick up new versions), cache first for assets.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(
        async () =>
          (await caches.match(req, MATCH)) ||
          (await caches.match(new URL('./index.html', self.registration.scope).toString(), MATCH)) ||
          Response.error(),
      ),
    );
    return;
  }
  event.respondWith(
    caches.match(req, MATCH).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.keys().then((keys) => {
              const k = keys.filter((x) => x.startsWith(PREFIX)).pop();
              if (k) caches.open(k).then((c) => c.put(req, copy));
            });
          }
          return res;
        }),
    ),
  );
});
