import type { ExamTagT, Item, LevelT } from '../schema';
import type { Topic } from '../topics';
import { Rng } from '../rng';
import { buildGap, buildMcq, genId, type Generator } from './core';

/**
 * Frame generators.
 *
 * A frame is a hand-written sentence with one gap, the answers that are
 * correct in it and the distractors that are wrong in it. Variety comes from
 * slots ({city}, {f}, {m}…) whose fillers never change the grammar of the
 * sentence: a female name is always followed by “she”, a city never needs an
 * article. Because the grammar is fixed by the author, every item is
 * guaranteed to be correct; the generator only chooses the frame, the slot
 * fillers, the item type and the position of the key.
 */
export interface Frame {
  /** Book section for “Review”. */
  ref: string;
  level: LevelT;
  /** Sentence with exactly one ___ and optional {slot} placeholders. */
  text: string;
  /** Accepted answers; the first is the key shown in multiple choice. */
  answer: string[];
  /** At least three wrong options (never acceptable in this frame). */
  wrong: string[];
  /** Shown in brackets in gap mode, e.g. a verb to put in the right form. */
  cue?: string;
  /**
   * Gap mode is offered when there is a cue, or when `answer` lists every
   * acceptable completion (set gap: true). Otherwise only multiple choice.
   */
  gap?: boolean;
  /**
   * The options differ only in punctuation (commas, capitals). Such frames
   * are multiple choice only, because typed answers ignore commas and case.
   */
  punctuation?: boolean;
  /** Short explanation shown after checking. */
  note: string;
}

/** Slot fillers: each one fits every frame that uses the slot. */
export const SLOTS: Record<string, string[]> = {
  /** Cities that take no article. */
  city: ['Recife', 'Manaus', 'Curitiba', 'Belém', 'Salvador', 'Fortaleza', 'Porto Alegre', 'Natal', 'Florianópolis', 'Goiânia', 'Lisbon', 'Santiago'],
  /** Women’s names (refer back with she / her). */
  f: ['Ana', 'Beatriz', 'Carla', 'Júlia', 'Marina', 'Luísa', 'Helena', 'Camila', 'Renata', 'Sofia'],
  /** Men’s names (refer back with he / him / his). */
  m: ['Paulo', 'Lucas', 'Rafael', 'Tiago', 'Bruno', 'Diego', 'Marcos', 'Pedro', 'André', 'Felipe'],
  /** Weekdays. */
  day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

const SLOT_RE = /\{(\w+)\}/g;

/** Slots used by a frame (in order of first appearance). */
export function slotsOf(text: string): string[] {
  return [...new Set([...text.matchAll(SLOT_RE)].map((m) => m[1]))];
}

/** Fill every slot of a text; the same slot gets the same filler throughout. */
export function fillSlots(rng: Rng, text: string): string {
  const chosen = new Map<string, string>();
  for (const s of slotsOf(text)) {
    const pool = SLOTS[s];
    if (!pool) throw new Error(`unknown slot {${s}}`);
    chosen.set(s, rng.pick(pool));
  }
  return text.replace(SLOT_RE, (_, s: string) => chosen.get(s)!);
}

const DIFF: Record<LevelT, number> = { B1: 2, B2: 3, C1: 4, C2: 5 };

export function canGap(f: Frame): boolean {
  return !f.punctuation && (Boolean(f.cue) || f.gap === true);
}

/** Build one item from a frame. kind: 'mcq' | 'gap' (gap falls back to mcq). */
export function frameItem(
  rng: Rng,
  f: Frame,
  id: string,
  kind: 'mcq' | 'gap',
  meta: { topic: Topic; examTags: ExamTagT[]; skill?: 'grammar' | 'vocabulary' },
): Item {
  const prompt = fillSlots(rng, f.text);
  const m = {
    level: f.level,
    difficulty: DIFF[f.level],
    topic: meta.topic,
    ref: f.ref,
    explanation: f.note,
    examTags: meta.examTags,
    skill: meta.skill ?? 'grammar',
  };
  if (kind === 'gap' && canGap(f)) {
    return buildGap(id, prompt, f.answer, { ...m, instruction: f.cue ? 'Complete the sentence with the correct form of the word in brackets.' : 'Complete the sentence with one suitable word or phrase.' }, {
      cue: f.cue,
      noAlmost: !f.cue,
    });
  }
  return buildMcq(rng, id, prompt, f.answer[0], f.wrong, f.answer, { ...m, instruction: 'Choose the correct option.' }, 4, f.punctuation);
}

export function makeFrameGenerator(opts: {
  key: string;
  title: string;
  topic: Topic;
  ref: string;
  frames: Frame[];
  examTags: ExamTagT[];
  skill?: 'grammar' | 'vocabulary';
  /** Probability of a gap item when the frame allows it (default 0.4). */
  gapRate?: number;
}): Generator {
  return {
    key: opts.key,
    title: opts.title,
    topic: opts.topic,
    ref: opts.ref,
    generate(seed: number) {
      const rng = new Rng(seed);
      const f = rng.pick(opts.frames);
      const kind = canGap(f) && rng.chance(opts.gapRate ?? 0.4) ? 'gap' : 'mcq';
      return frameItem(rng, f, genId(opts.key, seed), kind, { topic: opts.topic, examTags: opts.examTags, skill: opts.skill });
    },
  };
}
