/**
 * Text-to-speech through the Web Speech API (speechSynthesis), with a
 * different English voice per character where the browser offers several.
 * Everything degrades gracefully: without speech support the UI shows the
 * transcript instead.
 */

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function englishVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported()) return [];
  try {
    const all = window.speechSynthesis.getVoices();
    if (all.length) cachedVoices = all;
  } catch {
    return [];
  }
  const en = cachedVoices.filter((v) => /^en(-|_|$)/i.test(v.lang));
  // Prefer local voices (work offline), then the rest.
  return [...en.filter((v) => v.localService), ...en.filter((v) => !v.localService)];
}

/** Resolve once voices are loaded (Chrome loads them asynchronously). */
export function voicesReady(timeoutMs = 1500): Promise<SpeechSynthesisVoice[]> {
  if (!speechSupported()) return Promise.resolve([]);
  const now = englishVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const done = () => resolve(englishVoices());
    const t = setTimeout(done, timeoutMs);
    try {
      window.speechSynthesis.addEventListener(
        'voiceschanged',
        () => {
          clearTimeout(t);
          done();
        },
        { once: true },
      );
    } catch {
      clearTimeout(t);
      done();
    }
  });
}

export interface VoiceSpec {
  /** Character index: 0 = narrator, 1 = first speaker, 2 = second… */
  index: number;
  /** Rough gender hint used only to vary pitch when few voices exist. */
  pitch?: number;
}

export interface SpeakOptions {
  voice?: VoiceSpec;
  rate?: number;
}

/** Speak a line; resolves when it finishes (or immediately if unsupported). */
export function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  if (!speechSupported()) return Promise.resolve();
  return new Promise((resolve) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      const voices = englishVoices();
      const idx = opts.voice?.index ?? 0;
      if (voices.length) u.voice = voices[idx % voices.length];
      u.lang = u.voice?.lang ?? 'en-GB';
      u.rate = opts.rate ?? 0.95;
      // With a single voice, vary the pitch so characters stay distinct.
      u.pitch = opts.voice?.pitch ?? (voices.length > 1 ? 1 : [1, 0.8, 1.25, 0.95][idx % 4]);
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    } catch {
      resolve();
    }
  });
}

export interface ScriptLine {
  speaker: string;
  text: string;
}

/** Speak a whole script; each distinct speaker gets a different voice. */
export async function speakScript(lines: ScriptLine[], rate = 0.95, shouldStop: () => boolean = () => false): Promise<void> {
  const order: string[] = [];
  for (const l of lines) if (!order.includes(l.speaker)) order.push(l.speaker);
  await voicesReady();
  for (const l of lines) {
    if (shouldStop()) return;
    await speak(l.text, { voice: { index: order.indexOf(l.speaker) }, rate });
    await new Promise((r) => setTimeout(r, 250));
  }
}

export function stopSpeaking(): void {
  if (!speechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}
