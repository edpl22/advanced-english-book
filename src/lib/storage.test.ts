import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

/**
 * Storage behaviour that needs a browser: a minimal window with
 * localStorage and the "storage" event, installed before the module loads.
 */

const store = new Map<string, string>();
const handlers: Array<(e: { key: string | null }) => void> = [];
let st: typeof import('./storage');

const KEY = 'aeb.progress.v1';
const stat = (topic = 'nouns') => ({ n: 1, correct: 1, lastAt: 1, lastResult: 'correct' as const, box: 0, due: Number.MAX_SAFE_INTEGER, topic });

beforeAll(async () => {
  (globalThis as unknown as { window: unknown }).window = {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    },
    addEventListener: (type: string, fn: (e: { key: string | null }) => void) => {
      if (type === 'storage') handlers.push(fn);
    },
  };
  st = await import('./storage');
});

beforeEach(() => {
  store.clear();
  st._resetMemory();
});

describe('progress shared between tabs', () => {
  it('never writes an older copy over progress saved by another tab', () => {
    st.save({ ...st.emptyState(), items: { a: stat() } });
    // Another tab, opened earlier, finishes two more items.
    store.set(KEY, JSON.stringify({ ...st.emptyState(), items: { a: stat(), b: stat(), c: stat() } }));
    // This tab then records an answer: the other tab's work must survive.
    st.update((s) => ({ ...s, items: { ...s.items, d: stat() } }));
    expect(Object.keys(st.load().items).sort()).toEqual(['a', 'b', 'c', 'd']);
    expect(Object.keys(JSON.parse(store.get(KEY)!).items).sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('re-reads the stored copy when another tab saves', () => {
    st.save({ ...st.emptyState(), items: { a: stat() } });
    store.set(KEY, JSON.stringify({ ...st.emptyState(), items: { a: stat(), b: stat() } }));
    handlers.forEach((h) => h({ key: KEY }));
    expect(Object.keys(st.load().items).sort()).toEqual(['a', 'b']);
  });
});

describe('damaged progress', () => {
  it('drops only the invalid entries and keeps an untouched backup', () => {
    const good = { itemId: 'x', topic: 'nouns', result: 'correct', at: 1, context: 'book' };
    const raw = JSON.stringify({
      ...st.emptyState(),
      attempts: [good, { ...good, at: null }, good],
      items: { a: stat(), b: { ...stat(), box: 9 } },
      tests: [{ id: 't', kind: 'toefl', title: 'T', seed: 's', at: 1, durationSec: 1, score: 1, max: 2, bands: { overall: null } }],
    });
    store.set(KEY, raw);
    const s = st.load();
    expect(s.attempts).toHaveLength(2);
    expect(Object.keys(s.items)).toEqual(['a']);
    expect(s.tests).toHaveLength(0);
    expect(store.get(`${KEY}.backup`)).toBe(raw);
  });
});

describe('units marked as completed', () => {
  it('can be marked, undone, and survive a reload', async () => {
    const { setUnitCompleted } = await import('./progress');
    setUnitCompleted('u12', true);
    setUnitCompleted('u13', true);
    setUnitCompleted('u13', false);
    st._resetMemory();
    expect(Object.keys(st.load().completed)).toEqual(['u12']);
  });

  it('older saves without the field still load', () => {
    const { completed: _, ...old } = st.emptyState();
    store.set(KEY, JSON.stringify({ ...old, items: { a: stat() } }));
    const s = st.load();
    expect(s.completed).toEqual({});
    expect(Object.keys(s.items)).toEqual(['a']);
    expect(store.get(`${KEY}.backup`)).toBeUndefined();
  });
});
