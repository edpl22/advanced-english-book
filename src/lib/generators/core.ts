import type { ExamTagT, GapItemT, Item, KwtItemT, LevelT, McqItemT } from '../schema';
import type { Topic } from '../topics';
import { normalize } from '../checking/normalize';
import { Rng, hashSeed } from '../rng';

/**
 * Shared machinery for procedural generators. A generator is a pure
 * function of its seed: generate(seed) always returns the same item.
 */
export interface Generator {
  key: string;
  title: string;
  topic: Topic;
  /** Default book section for "Review". */
  ref: string;
  generate(seed: number): Item;
}

export interface ItemMeta {
  level: LevelT;
  difficulty: number;
  topic: Topic;
  ref: string;
  explanation: string;
  examTags?: ExamTagT[];
  skill?: 'grammar' | 'vocabulary' | 'use-of-english';
  instruction?: string;
}

export function genId(key: string, seed: number): string {
  return `g:${key}:${seed >>> 0}`;
}

function metaFields(id: string, m: ItemMeta) {
  return {
    id,
    level: m.level,
    difficulty: m.difficulty,
    topics: [m.topic],
    skill: m.skill ?? 'grammar',
    examTags: m.examTags ?? [],
    source: 'generated' as const,
    ref: m.ref,
    explanation: m.explanation,
    ...(m.instruction ? { instruction: m.instruction } : {}),
  };
}

const same = (a: string, b: string, keepCommas = false) => normalize(a, { keepCommas }) === normalize(b, { keepCommas });

/**
 * Build a 4-option MCQ. Distractors equal (after normalisation) to any
 * accepted answer are discarded; the correct option lands in a random slot,
 * which keeps A–D uniformly distributed across seeds.
 */
export function buildMcq(
  rng: Rng,
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  accepted: string[],
  m: ItemMeta,
  nOptions = 4,
  /** Keep commas when comparing options (punctuation items). */
  keepCommas = false,
): McqItemT {
  const pool: string[] = [];
  for (const d of rng.shuffle(distractors)) {
    if (accepted.some((a) => same(a, d, keepCommas)) || same(d, correct, keepCommas)) continue;
    if (pool.some((p) => same(p, d, keepCommas))) continue;
    pool.push(d);
    if (pool.length === nOptions - 1) break;
  }
  if (pool.length < nOptions - 1) throw new Error(`buildMcq(${id}): not enough distractors`);
  const answer = rng.int(nOptions);
  const options = [...pool];
  options.splice(answer, 0, correct);
  return { ...metaFields(id, m), type: 'mcq', prompt, options, answer };
}

export function buildGap(
  id: string,
  prompt: string,
  accepted: string[],
  m: ItemMeta,
  extra: { cue?: string; type?: GapItemT['type']; noAlmost?: boolean; contractions?: GapItemT['contractions'] } = {},
): GapItemT {
  return {
    ...metaFields(id, m),
    type: extra.type ?? 'gap',
    prompt,
    acceptedAnswers: [...new Set(accepted)],
    ...(extra.cue ? { cue: extra.cue } : {}),
    ...(extra.noAlmost ? { noAlmost: true } : {}),
    ...(extra.contractions ? { contractions: extra.contractions } : {}),
  };
}

export function buildKwt(
  id: string,
  first: string,
  keyword: string,
  before: string,
  after: string,
  accepted: string[],
  m: ItemMeta,
  limits: { min?: number; max?: number } = {},
): KwtItemT {
  return {
    ...metaFields(id, m),
    type: 'kwt',
    first,
    keyword,
    before,
    after,
    acceptedAnswers: [...new Set(accepted)],
    ...(limits.min ? { minWords: limits.min } : {}),
    ...(limits.max ? { maxWords: limits.max } : {}),
  };
}

/** Text used to detect duplicate items. */
export function itemFingerprint(item: Item): string {
  switch (item.type) {
    case 'reading':
      // Generic prompts ("What is the main idea?") recur across passages.
      return normalize(`reading|${item.passageId}|${item.prompt}`);
    case 'mcq':
    case 'gap':
    case 'word-formation':
    case 'phrasal-choice':
      return normalize(`${item.type}|${item.prompt}|${'cue' in item ? item.cue ?? '' : ''}`);
    case 'kwt':
      return normalize(`${item.first}|${item.keyword}`);
    case 'error-correction':
      return normalize(item.parts.map((p) => (typeof p === 'string' ? p : p.u)).join(''));
    case 'matching':
      return normalize(item.left.join('|'));
    case 'word-order':
      return normalize(item.acceptedAnswers[0]);
    case 'open-cloze':
    case 'mc-cloze':
      return normalize(item.text);
  }
}

/**
 * n distinct items from a generator, starting at a seed. Duplicates
 * (same fingerprint) are skipped, so the output never repeats an item.
 */
export function generateMany(gen: Generator, seed: number | string, n: number, maxTries = n * 20): Item[] {
  const base = typeof seed === 'number' ? seed >>> 0 : hashSeed(seed);
  const seen = new Set<string>();
  const out: Item[] = [];
  for (let i = 0; out.length < n && i < maxTries; i++) {
    const item = gen.generate((base + Math.imul(i, 2654435761)) >>> 0);
    const fp = itemFingerprint(item);
    if (seen.has(fp)) continue;
    seen.add(fp);
    out.push(item);
  }
  return out;
}

/** Replace {S}, {V}, {O}… placeholders. Missing keys become empty strings. */
export function fill(template: string, slots: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => slots[k] ?? '');
}
