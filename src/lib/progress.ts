import type { Verdict } from './checking';
import { load, update, type ItemStat, type State } from './storage';

/**
 * Recording answers, spaced repetition (Leitner) and difficulty calibration.
 * Pure helpers are exported separately so they can be unit-tested.
 */

const DAY = 24 * 60 * 60 * 1000;
/** Days until the next review for boxes 1..5. */
export const LEITNER_INTERVALS = [0, 1, 2, 4, 8, 16];

/** Next Leitner box: up one on success, back to box 1 on failure. */
export function nextBox(box: number, result: Verdict): number {
  if (result === 'correct') return Math.min(5, Math.max(1, box) + 1);
  return 1;
}

export function applyAttempt(prev: ItemStat | undefined, result: Verdict, now: number, topic: string, ref?: string): ItemStat {
  const n = (prev?.n ?? 0) + 1;
  const correct = (prev?.correct ?? 0) + (result === 'correct' ? 1 : 0);
  // An item enters spaced review the first time it is answered wrongly.
  const inReview = (prev?.box ?? 0) > 0 || result !== 'correct';
  const box = inReview ? nextBox(prev?.box ?? 0, result) : 0;
  const due = box > 0 ? now + LEITNER_INTERVALS[box] * DAY : Number.MAX_SAFE_INTEGER;
  return { n, correct, lastAt: now, lastResult: result, box, due, topic, ref: ref ?? prev?.ref };
}

/**
 * Personal difficulty (1–5): the author's rating until the learner has 10
 * attempts at the item, then recalibrated from the learner's accuracy.
 */
export function calibratedDifficulty(authored: number, stat: ItemStat | undefined): number {
  if (!stat || stat.n < 10) return authored;
  const acc = stat.correct / stat.n;
  if (acc >= 0.9) return 1;
  if (acc >= 0.75) return 2;
  if (acc >= 0.55) return 3;
  if (acc >= 0.35) return 4;
  return 5;
}

export function recordAnswer(itemId: string, topic: string, result: Verdict, context = 'book', ref?: string): void {
  const now = Date.now();
  update((s) => ({
    ...s,
    attempts: [...s.attempts, { itemId, topic, result, at: now, context, ref }],
    items: { ...s.items, [itemId]: applyAttempt(s.items[itemId], result, now, topic, ref) },
  }));
}

export function dueForReview(s: State = load(), now = Date.now()): Array<[string, ItemStat]> {
  return Object.entries(s.items)
    .filter(([, v]) => v.box > 0 && v.box < 5 && v.due <= now)
    .sort((a, b) => a[1].box - b[1].box || a[1].due - b[1].due);
}

export function inReview(s: State = load()): Array<[string, ItemStat]> {
  return Object.entries(s.items).filter(([, v]) => v.box > 0);
}

/** Accuracy per topic: [correct, total]. */
export function topicAccuracy(s: State = load()): Record<string, [number, number]> {
  const out: Record<string, [number, number]> = {};
  for (const a of s.attempts) {
    const t = (out[a.topic] ??= [0, 0]);
    t[1]++;
    if (a.result === 'correct') t[0]++;
  }
  return out;
}

/** Items answered wrongly most often. */
export function frequentErrors(s: State = load(), n = 10): Array<{ itemId: string; wrong: number; topic: string; ref?: string }> {
  const counts = new Map<string, { wrong: number; topic: string; ref?: string }>();
  for (const a of s.attempts) {
    if (a.result === 'correct') continue;
    const c = counts.get(a.itemId) ?? { wrong: 0, topic: a.topic, ref: a.ref };
    c.wrong++;
    counts.set(a.itemId, c);
  }
  return [...counts.entries()]
    .map(([itemId, v]) => ({ itemId, ...v }))
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, n);
}

/** Items the learner got right within the last `days` days. */
export function recentlyCorrect(s: State = load(), days = 14, now = Date.now()): Set<string> {
  const since = now - days * DAY;
  const out = new Set<string>();
  for (const [id, v] of Object.entries(s.items)) if (v.lastResult === 'correct' && v.lastAt >= since) out.add(id);
  return out;
}

/** Item ids answered correctly at least once (unit completion). */
export function everCorrect(s: State = load()): Set<string> {
  const out = new Set<string>();
  for (const [id, v] of Object.entries(s.items)) if (v.correct > 0) out.add(id);
  return out;
}
