import { TENSE_TEMPLATES, type TenseFrame, type TenseTemplate } from '@content/data/tense-templates';
import { Rng } from '../rng';
import type { Item } from '../schema';
import { conjugate, malformed, sentence, TENSE_NAMES, type Subject, type Tense } from './conjugate';
import { buildGap, buildMcq, fill, genId, type Generator } from './core';

const CONTINUOUS: Tense[] = [
  'present-continuous',
  'past-continuous',
  'present-perfect-continuous',
  'past-perfect-continuous',
  'future-continuous',
  'future-perfect-continuous',
];

/** Accept / reject lists after applying the stative rule. */
export function tenseSets(t: TenseTemplate, f: TenseFrame): { accept: Tense[]; reject: Tense[] } {
  if (!f.stative) return { accept: t.accept, reject: t.reject };
  const accept = t.accept.filter((x) => !CONTINUOUS.includes(x));
  const moved = t.accept.filter((x) => CONTINUOUS.includes(x));
  return { accept, reject: [...new Set([...t.reject, ...moved])] };
}

export function renderPrompt(t: TenseTemplate, f: TenseFrame, s: Subject): string {
  const third = s.person === 3 && !s.plural;
  return sentence(
    fill(t.text, {
      S: s.text,
      V: '___',
      O: f.o ?? '',
      pron: s.pronoun,
      s: third ? 's' : '',
    }),
  );
}

export interface TenseItemParts {
  prompt: string;
  cue: string;
  correct: string;
  accepted: string[];
  distractors: string[];
  tense: Tense;
}

/** Everything needed for an item, without randomness (used by tests too). */
export function tenseItemParts(t: TenseTemplate, f: TenseFrame, s: Subject): TenseItemParts {
  const { accept, reject } = tenseSets(t, f);
  if (accept.length === 0) throw new Error(`Template ${t.id}: frame ${f.v} leaves no accepted tense`);
  const neg = { negative: t.negative };
  const accepted = [...new Set(accept.flatMap((x) => conjugate(f.v, x, s, neg)))];
  const correct = conjugate(f.v, accept[0], s, neg)[0];
  const distractors = [
    ...reject.map((x) => conjugate(f.v, x, s, neg)[0]),
    ...malformed(f.v, accept[0], s, neg),
  ];
  return {
    prompt: renderPrompt(t, f, s),
    cue: t.negative ? `not / ${f.v}` : f.v,
    correct,
    accepted,
    distractors,
    tense: accept[0],
  };
}

export function buildTenseItem(t: TenseTemplate, f: TenseFrame, s: Subject, kind: 'mcq' | 'gap', rng: Rng, id: string): Item {
  const p = tenseItemParts(t, f, s);
  const meta = {
    level: t.level,
    difficulty: t.difficulty,
    topic: t.topic,
    ref: t.ref,
    explanation: `${t.explanation} → ${TENSE_NAMES[p.tense]}: “${p.correct}”.`,
    examTags: ['ENEM', 'EsPCEx', 'EFOMM', 'TOEFL'] as const,
  };
  if (kind === 'mcq') {
    return buildMcq(rng, id, p.prompt, p.correct, p.distractors, p.accepted, {
      ...meta,
      examTags: [...meta.examTags],
      instruction: 'Choose the correct verb form.',
    });
  }
  return buildGap(id, p.prompt, p.accepted, { ...meta, examTags: [...meta.examTags], instruction: 'Complete with the correct form of the verb in brackets.' }, { cue: p.cue });
}

function pickSubject(t: TenseTemplate, f: TenseFrame, rng: Rng): Subject {
  if (f.s) return f.s;
  if (!t.subjects?.length) throw new Error(`Template ${t.id} has no subjects for frame ${f.v}`);
  return rng.pick(t.subjects);
}

export function makeTenseGenerator(templates: TenseTemplate[], key: string, title: string, topic: TenseTemplate['topic'], ref: string): Generator {
  return {
    key,
    title,
    topic,
    ref,
    generate(seed: number): Item {
      const rng = new Rng(seed);
      const t = rng.pick(templates);
      const f = rng.pick(t.frames);
      const s = pickSubject(t, f, rng);
      const kind = rng.chance(0.5) ? 'mcq' : 'gap';
      return buildTenseItem(t, f, s, kind, rng, genId(key, seed));
    },
  };
}

export const tensesGenerator = makeTenseGenerator(TENSE_TEMPLATES, 'tenses', 'Verb tenses (all)', 'perfect-tenses', '2.1');

export const TENSE_GENERATORS: Generator[] = (['present-past', 'perfect-tenses', 'narrative-tenses', 'future'] as const).map((topic) =>
  makeTenseGenerator(
    TENSE_TEMPLATES.filter((t) => t.topic === topic),
    `tenses-${topic}`,
    {
      'present-past': 'Present simple and continuous; stative verbs',
      'perfect-tenses': 'Present perfect and past simple',
      'narrative-tenses': 'Narrative tenses',
      future: 'Future forms',
    }[topic],
    topic,
    TENSE_TEMPLATES.find((t) => t.topic === topic)!.ref,
  ),
);
