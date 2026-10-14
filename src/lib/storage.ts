import { z } from 'zod';

/**
 * All persistent state lives in one localStorage key. Every read and write
 * is wrapped in try/catch: in a private window, with storage blocked or full,
 * the site keeps working with in-memory state only.
 */

const KEY = 'aeb.progress.v1';
const MAX_ATTEMPTS = 6000;

export const AttemptSchema = z.object({
  itemId: z.string(),
  topic: z.string(),
  result: z.enum(['correct', 'almost', 'incorrect']),
  at: z.number(),
  /** 'book' | 'test' | 'review' | 'practice' | 'toefl' | 'medieval' | 'lexicon' */
  context: z.string().default('book'),
  ref: z.string().optional(),
});
export type Attempt = z.infer<typeof AttemptSchema>;

export const ItemStatSchema = z.object({
  n: z.number(),
  correct: z.number(),
  lastAt: z.number(),
  lastResult: z.enum(['correct', 'almost', 'incorrect']),
  /** Leitner box 1–5 (only items answered wrongly at least once enter review). */
  box: z.number().min(0).max(5),
  due: z.number(),
  topic: z.string(),
  ref: z.string().optional(),
});
export type ItemStat = z.infer<typeof ItemStatSchema>;

export const TestRecordSchema = z.object({
  id: z.string(),
  kind: z.enum(['practice', 'toefl']),
  title: z.string(),
  seed: z.string(),
  at: z.number(),
  durationSec: z.number(),
  score: z.number(),
  max: z.number(),
  config: z.record(z.unknown()).optional(),
  itemIds: z.array(z.string()).optional(),
  byTopic: z.record(z.tuple([z.number(), z.number()])).optional(),
  bands: z.record(z.number()).optional(),
});
export type TestRecord = z.infer<typeof TestRecordSchema>;

export const BookmarkSchema = z.object({ path: z.string(), label: z.string(), at: z.number() });
export type Bookmark = z.infer<typeof BookmarkSchema>;

export const LexStatSchema = z.object({ box: z.number().min(1).max(5), due: z.number(), seen: z.number(), correct: z.number() });
export type LexStat = z.infer<typeof LexStatSchema>;

export const DailyDaySchema = z.object({ score: z.number(), total: z.number(), at: z.number(), level: z.string() });
export const DailySchema = z
  .object({
    /** Consecutive days completed, ending today or yesterday. */
    streak: z.number().default(0),
    best: z.number().default(0),
    /** Local date (YYYY-MM-DD) of the last completed challenge. */
    last: z.string().nullable().default(null),
    level: z.enum(['B1', 'B2', 'C1', 'C2']).default('B2'),
    days: z.record(DailyDaySchema).default({}),
    /** Challenge in progress: first verdict of each question answered so far. */
    current: z
      .object({ date: z.string(), level: z.string(), results: z.array(z.enum(['correct', 'almost', 'incorrect'])) })
      .nullable()
      .default(null),
  })
  .default({});
export type Daily = z.infer<typeof DailySchema>;

export const StateSchema = z.object({
  version: z.literal(1),
  attempts: z.array(AttemptSchema),
  items: z.record(ItemStatSchema),
  tests: z.array(TestRecordSchema),
  bookmarks: z.array(BookmarkSchema),
  lexicon: z.record(LexStatSchema),
  daily: DailySchema,
  settings: z
    .object({
      theme: z.enum(['auto', 'day', 'night']).default('auto'),
      speechRate: z.number().min(0.5).max(1.5).default(0.95),
      streak: z.number().default(0),
      bestStreak: z.number().default(0),
    })
    .default({}),
});
export type State = z.infer<typeof StateSchema>;

export function emptyState(): State {
  return {
    version: 1,
    attempts: [],
    items: {},
    tests: [],
    bookmarks: [],
    lexicon: {},
    daily: { streak: 0, best: 0, last: null, level: 'B2', days: {}, current: null },
    settings: { theme: 'auto', speechRate: 0.95, streak: 0, bestStreak: 0 },
  };
}

let memory: State | null = null;
let storageOk = true;
const listeners = new Set<() => void>();

function safeGet(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    storageOk = false;
    return null;
  }
}

function safeSet(value: string): void {
  try {
    window.localStorage.setItem(KEY, value);
    storageOk = true;
  } catch {
    storageOk = false;
  }
}

/** Parse stored JSON leniently: anything invalid falls back to an empty state. */
export function parseState(raw: string | null): State {
  if (!raw) return emptyState();
  try {
    const parsed = StateSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : emptyState();
  } catch {
    return emptyState();
  }
}

export function load(): State {
  if (memory) return memory;
  memory = typeof window === 'undefined' ? emptyState() : parseState(safeGet());
  return memory;
}

export function isStorageAvailable(): boolean {
  load();
  return storageOk;
}

export function save(next: State): void {
  if (next.attempts.length > MAX_ATTEMPTS) next = { ...next, attempts: next.attempts.slice(-MAX_ATTEMPTS) };
  memory = next;
  if (typeof window !== 'undefined') safeSet(JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function update(fn: (s: State) => State): State {
  const next = fn(load());
  save(next);
  return next;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Export everything as pretty JSON (for a download). */
export function exportJson(): string {
  return JSON.stringify({ app: 'advanced-english-book', exportedAt: new Date().toISOString(), state: load() }, null, 2);
}

/** Import a previously exported file. Returns an error message or null. */
export function importJson(text: string, mode: 'replace' | 'merge' = 'replace'): string | null {
  try {
    const obj = JSON.parse(text);
    const parsed = StateSchema.safeParse(obj?.state ?? obj);
    if (!parsed.success) return 'The file is not a valid progress export.';
    if (mode === 'replace') {
      save(parsed.data);
      return null;
    }
    const cur = load();
    const inc = parsed.data;
    const items = { ...cur.items };
    for (const [k, v] of Object.entries(inc.items)) if (!items[k] || items[k].lastAt < v.lastAt) items[k] = v;
    save({
      ...cur,
      attempts: [...cur.attempts, ...inc.attempts].sort((a, b) => a.at - b.at),
      items,
      tests: [...cur.tests, ...inc.tests.filter((t) => !cur.tests.some((c) => c.id === t.id))],
      bookmarks: [...cur.bookmarks, ...inc.bookmarks.filter((b) => !cur.bookmarks.some((c) => c.path === b.path))],
      lexicon: { ...inc.lexicon, ...cur.lexicon },
      daily: mergeDaily(cur.daily, inc.daily),
    });
    return null;
  } catch {
    return 'Could not read the file (invalid JSON).';
  }
}

/** Merge two daily records: union of completed days, the more recent streak. */
function mergeDaily(a: Daily, b: Daily): Daily {
  const newer = (b.last ?? '') > (a.last ?? '') ? b : a;
  return { ...newer, best: Math.max(a.best, b.best), days: { ...b.days, ...a.days } };
}

export function resetAll(): void {
  save(emptyState());
}

/** Test hook: forget the in-memory copy. */
export function _resetMemory(): void {
  memory = null;
}
