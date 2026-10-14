import { z } from 'zod';
import { TOPICS } from './topics';

/**
 * Schemas for every exercise item in the book, the question bank and the
 * generators. Bank files are validated against these by `npm run bank:validate`,
 * and the app validates them again (safeParse) before use.
 */

export const LEVELS = ['B1', 'B2', 'C1', 'C2'] as const;
export const EXAM_TAGS = [
  'TOEFL',
  'IELTS',
  'CAE',
  'CPE',
  'ITA',
  'IME',
  'AFA',
  'EN',
  'EFOMM',
  'EsPCEx',
  'FUVEST',
  'ENEM',
] as const;
export const MILITARY_TAGS = ['ITA', 'IME', 'AFA', 'EN', 'EFOMM', 'EsPCEx'] as const;
export const SKILLS = ['grammar', 'vocabulary', 'reading', 'use-of-english'] as const;
export const SOURCES = ['authored', 'generated'] as const;
export const ITEM_TYPES = [
  'mcq',
  'gap',
  'open-cloze',
  'mc-cloze',
  'kwt',
  'error-correction',
  'matching',
  'word-order',
  'word-formation',
  'phrasal-choice',
  'reading',
] as const;

export const ITEM_TYPE_LABELS: Record<(typeof ITEM_TYPES)[number], string> = {
  mcq: 'Multiple choice',
  gap: 'Gap fill',
  'open-cloze': 'Open cloze',
  'mc-cloze': 'Multiple-choice cloze',
  kwt: 'Key word transformation',
  'error-correction': 'Error correction',
  matching: 'Matching',
  'word-order': 'Word order',
  'word-formation': 'Word formation',
  'phrasal-choice': 'Phrasal verb in context',
  reading: 'Reading comprehension',
};

export const Level = z.enum(LEVELS);
export const ExamTag = z.enum(EXAM_TAGS);
export const Skill = z.enum(SKILLS);
export const Source = z.enum(SOURCES);
export const TopicSchema = z.enum(TOPICS);

/** How an ambiguous contraction in this item must be read ("'d", "'s"). */
export const ContractionContext = z
  .object({ d: z.enum(['would', 'had']).optional(), s: z.enum(['is', 'has']).optional() })
  .strict();

const meta = {
  id: z.string().min(1),
  level: Level,
  difficulty: z.number().int().min(1).max(5),
  topics: z.array(TopicSchema).min(1),
  skill: Skill,
  examTags: z.array(ExamTag),
  source: Source,
  /** Book section to review, e.g. "7.2". */
  ref: z.string().min(1),
  explanation: z.string().min(1),
  /** Optional per-item instruction (otherwise the exercise's). */
  instruction: z.string().optional(),
};

const nonEmpty = z.array(z.string().min(1)).min(1);

export const McqItem = z
  .object({
    ...meta,
    type: z.literal('mcq'),
    prompt: z.string().min(1),
    options: z.array(z.string().min(1)).min(2).max(5),
    answer: z.number().int().min(0),
  })
  .strict();

export const ReadingItem = z
  .object({
    ...meta,
    type: z.literal('reading'),
    passageId: z.string().min(1),
    prompt: z.string().min(1),
    options: z.array(z.string().min(1)).min(2).max(5),
    answer: z.number().int().min(0),
  })
  .strict();

export const GapItem = z
  .object({
    ...meta,
    type: z.enum(['gap', 'word-formation', 'phrasal-choice']),
    /** Must contain exactly one "___". */
    prompt: z.string().min(1),
    /** Shown in brackets after the gap, e.g. "(not / see)" or "DECIDE". */
    cue: z.string().optional(),
    acceptedAnswers: nonEmpty,
    caseSensitive: z.boolean().optional(),
    contractions: ContractionContext.optional(),
    /** Disable the "almost (spelling)" verdict, e.g. for prepositions. */
    noAlmost: z.boolean().optional(),
  })
  .strict();

export const KwtItem = z
  .object({
    ...meta,
    type: z.literal('kwt'),
    first: z.string().min(1),
    keyword: z.string().min(1),
    before: z.string(),
    after: z.string(),
    acceptedAnswers: nonEmpty,
    minWords: z.number().int().min(1).optional(),
    maxWords: z.number().int().min(1).optional(),
    contractions: ContractionContext.optional(),
  })
  .strict();

export const UnderlinedPart = z.object({ u: z.string().min(1) }).strict();

export const ErrorItem = z
  .object({
    ...meta,
    type: z.literal('error-correction'),
    /** Plain text and underlined segments, in order. */
    parts: z.array(z.union([z.string(), UnderlinedPart])).min(2),
    /** Index among the underlined segments only. */
    errorIndex: z.number().int().min(0),
    /** Accepted corrections of the wrong segment. */
    acceptedAnswers: nonEmpty,
    contractions: ContractionContext.optional(),
  })
  .strict();

export const MatchingItem = z
  .object({
    ...meta,
    type: z.literal('matching'),
    prompt: z.string().optional(),
    left: z.array(z.string().min(1)).min(2),
    right: z.array(z.string().min(1)).min(2),
    /** answer[i] = index in `right` that matches left[i]. */
    answer: z.array(z.number().int().min(0)),
  })
  .strict();

export const WordOrderItem = z
  .object({
    ...meta,
    type: z.literal('word-order'),
    /** Fragments in the correct order; the UI shuffles them. */
    fragments: z.array(z.string().min(1)).min(3),
    /** Full sentences accepted (the first is the canonical order). */
    acceptedAnswers: nonEmpty,
    context: z.string().optional(),
  })
  .strict();

export const OpenClozeItem = z
  .object({
    ...meta,
    type: z.literal('open-cloze'),
    title: z.string().optional(),
    /** Text with numbered gaps written as [1], [2] … */
    text: z.string().min(1),
    gaps: z
      .array(z.object({ acceptedAnswers: nonEmpty, explanation: z.string().optional() }).strict())
      .min(1),
  })
  .strict();

export const McClozeItem = z
  .object({
    ...meta,
    type: z.literal('mc-cloze'),
    title: z.string().optional(),
    text: z.string().min(1),
    gaps: z
      .array(
        z
          .object({
            options: z.array(z.string().min(1)).min(3).max(4),
            answer: z.number().int().min(0),
            explanation: z.string().optional(),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

export const ItemSchema = z.union([
  McqItem,
  ReadingItem,
  GapItem,
  KwtItem,
  ErrorItem,
  MatchingItem,
  WordOrderItem,
  OpenClozeItem,
  McClozeItem,
]);

export type Item = z.infer<typeof ItemSchema>;
export type ItemType = Item['type'];
export type LevelT = z.infer<typeof Level>;
export type ExamTagT = z.infer<typeof ExamTag>;
export type SourceT = z.infer<typeof Source>;
export type McqItemT = z.infer<typeof McqItem>;
export type ReadingItemT = z.infer<typeof ReadingItem>;
export type GapItemT = z.infer<typeof GapItem>;
export type KwtItemT = z.infer<typeof KwtItem>;
export type ErrorItemT = z.infer<typeof ErrorItem>;
export type MatchingItemT = z.infer<typeof MatchingItem>;
export type WordOrderItemT = z.infer<typeof WordOrderItem>;
export type OpenClozeItemT = z.infer<typeof OpenClozeItem>;
export type McClozeItemT = z.infer<typeof McClozeItem>;
export type Contractions = z.infer<typeof ContractionContext>;

/** A bank file: /content/bank/<topic>/<batch>.json */
export const BankBatch = z
  .object({
    topic: TopicSchema,
    batch: z.number().int().min(1),
    title: z.string().optional(),
    /** Item-by-item grammatical review done (name/date). */
    reviewed: z.string().min(1),
    items: z.array(ItemSchema).min(1),
  })
  .strict();
export type BankBatchT = z.infer<typeof BankBatch>;

/** An original reading text with comprehension questions. */
export const Passage = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    level: Level,
    style: z.enum(['academic', 'general', 'military']),
    topics: z.array(TopicSchema).min(1),
    examTags: z.array(ExamTag),
    /** Paragraphs separated by a blank line. */
    text: z.string().min(1),
    glossary: z.array(z.tuple([z.string(), z.string()])).optional(),
    questions: z.array(ReadingItem).min(1),
  })
  .strict();
export type PassageT = z.infer<typeof Passage>;

/** Number of scorable points in an item (cloze gaps and matching pairs count one each). */
export function itemPoints(item: Item): number {
  switch (item.type) {
    case 'open-cloze':
    case 'mc-cloze':
      return item.gaps.length;
    case 'matching':
      return item.left.length;
    default:
      return 1;
  }
}

/** Structural checks Zod cannot express. Returns a list of problems. */
export function structuralProblems(item: Item): string[] {
  const p: string[] = [];
  const gapCount = (s: string) => (s.match(/___/g) ?? []).length;
  switch (item.type) {
    case 'mcq':
    case 'reading': {
      if (item.answer >= item.options.length) p.push('answer index out of range');
      const norm = item.options.map((o) => o.trim().toLowerCase());
      if (new Set(norm).size !== norm.length) p.push('duplicate options');
      break;
    }
    case 'gap':
    case 'word-formation':
    case 'phrasal-choice':
      if (gapCount(item.prompt) !== 1) p.push(`prompt must contain exactly one ___ (found ${gapCount(item.prompt)})`);
      break;
    case 'kwt':
      if (!/^[A-Z'’ -]+$/.test(item.keyword)) p.push('keyword must be in capitals');
      if ((item.minWords ?? 2) > (item.maxWords ?? 5)) p.push('minWords > maxWords');
      break;
    case 'error-correction': {
      const underlined = item.parts.filter((x) => typeof x !== 'string').length;
      if (item.errorIndex >= underlined) p.push('errorIndex out of range');
      if (underlined < 2) p.push('needs at least two underlined segments');
      break;
    }
    case 'matching':
      if (item.answer.length !== item.left.length) p.push('answer length must equal left length');
      if (item.answer.some((a) => a >= item.right.length)) p.push('answer index out of range');
      if (new Set(item.answer).size !== item.answer.length) p.push('two left items map to the same right item');
      break;
    case 'open-cloze':
    case 'mc-cloze': {
      const markers = item.text.match(/\[(\d+)\]/g) ?? [];
      if (markers.length !== item.gaps.length) p.push(`text has ${markers.length} gap markers but ${item.gaps.length} gaps`);
      markers.forEach((m, i) => {
        if (m !== `[${i + 1}]`) p.push(`gap markers must be numbered 1..n in order (found ${m})`);
      });
      if (item.type === 'mc-cloze')
        item.gaps.forEach((g, i) => {
          if (g.answer >= g.options.length) p.push(`gap ${i + 1}: answer out of range`);
        });
      break;
    }
    case 'word-order':
      break;
  }
  return p;
}
