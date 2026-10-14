import {
  COND_FRAMES,
  ITS_TIME,
  WISH_PAST,
  WISH_PRESENT,
  WOULD_RATHER,
  type Clause,
  type CondFrame,
  type CondType,
} from '@content/data/conditional-frames';
import { getVerb } from '@content/data/verbs';
import { Rng } from '../rng';
import type { ErrorItemT, Item, WordOrderItemT } from '../schema';
import { capitalize, conjugate, contract, malformed, sentence, type Subject, type Tense } from './conjugate';
import { buildGap, buildKwt, buildMcq, genId, type Generator, type ItemMeta } from './core';

export const COND_TENSES: Record<CondType, { ifc: Tense; main: Tense; mainAlso?: Tense[] }> = {
  zero: { ifc: 'present-simple', main: 'present-simple', mainAlso: ['will'] },
  first: { ifc: 'present-simple', main: 'will' },
  second: { ifc: 'past-simple', main: 'would' },
  third: { ifc: 'past-perfect', main: 'would-have' },
  'mixed-past-present': { ifc: 'past-perfect', main: 'would' },
  'mixed-present-past': { ifc: 'past-simple', main: 'would-have' },
};

/** Tenses that are clearly wrong in each clause, given the other clause. */
const WRONG_IF: Record<CondType, Tense[]> = {
  zero: ['will', 'would', 'past-simple'],
  first: ['will', 'would', 'past-simple'],
  second: ['would', 'will', 'present-simple'],
  third: ['would-have', 'present-perfect', 'will'],
  'mixed-past-present': ['would-have', 'present-perfect', 'will'],
  'mixed-present-past': ['would', 'will', 'present-simple'],
};
const WRONG_MAIN: Record<CondType, Tense[]> = {
  zero: ['would', 'past-simple', 'would-have'],
  first: ['would', 'would-have'],
  second: ['will', 'present-simple'],
  third: ['will', 'past-perfect'],
  'mixed-past-present': ['will', 'present-simple', 'past-perfect'],
  'mixed-present-past': ['will', 'past-perfect', 'past-simple'],
};

export const COND_NAMES: Record<CondType, string> = {
  zero: 'zero conditional',
  first: 'first conditional',
  second: 'second conditional',
  third: 'third conditional',
  'mixed-past-present': 'mixed conditional (past condition → present result)',
  'mixed-present-past': 'mixed conditional (present condition → past result)',
};

const COND_EXPLANATION: Record<CondType, string> = {
  zero: 'Zero conditional (if + present, present) for things that are always true; "will" in the main clause is also possible.',
  first: 'First conditional (if + present simple, will + infinitive) for a real possibility in the future. Never "will" in the if-clause.',
  second: 'Second conditional (if + past simple, would + infinitive) for an unreal or unlikely present/future situation. Never "would" in the if-clause.',
  third: 'Third conditional (if + past perfect, would have + past participle) for an unreal past situation.',
  'mixed-past-present': 'Mixed conditional: an unreal PAST condition (past perfect) with a PRESENT result (would + infinitive).',
  'mixed-present-past': 'Mixed conditional: an unreal PRESENT or permanent condition (past simple) with a PAST result (would have + past participle).',
};

const COND_REF: Record<CondType, string> = {
  zero: '7.1',
  first: '7.1',
  second: '7.2',
  third: '7.2',
  'mixed-past-present': '7.3',
  'mixed-present-past': '7.3',
};

const COND_LEVEL: Record<CondType, ItemMeta['level']> = {
  zero: 'B1',
  first: 'B1',
  second: 'B1',
  third: 'B2',
  'mixed-past-present': 'C1',
  'mixed-present-past': 'C1',
};

function vp(c: Clause, t: Tense): string[] {
  return conjugate(c.v, t, c.s, { negative: c.neg, subjunctiveWere: t === 'past-simple' });
}

export interface CondParts {
  ifAccepted: string[];
  mainAccepted: string[];
  ifWrong: string[];
  mainWrong: string[];
  ifText: (gap: string) => string;
  mainText: (gap: string) => string;
}

export function condParts(f: CondFrame, type: CondType): CondParts {
  const t = COND_TENSES[type];
  const ifAccepted = vp(f.ifc, t.ifc);
  const mainAccepted = [...new Set([t.main, ...(t.mainAlso ?? [])].flatMap((x) => vp(f.main, x)))];
  const ifWrong = [
    ...WRONG_IF[type].map((x) => vp(f.ifc, x)[0]),
    ...malformed(f.ifc.v, t.ifc, f.ifc.s, { negative: f.ifc.neg }),
  ];
  const mainWrong = [
    ...WRONG_MAIN[type].map((x) => vp(f.main, x)[0]),
    ...malformed(f.main.v, t.main, f.main.s, { negative: f.main.neg }),
  ];
  const ifText = (gap: string) => ['if', f.ifc.s.text, gap, f.ifc.o ?? ''].filter(Boolean).join(' ');
  const mainText = (gap: string) => [f.main.s.text, gap, f.main.o ?? ''].filter(Boolean).join(' ');
  return { ifAccepted, mainAccepted, ifWrong, mainWrong, ifText, mainText };
}

/** Main clause may come first only if it does not start with a pronoun pointing forward. */
function mainFirstAllowed(f: CondFrame): boolean {
  const forward = ['it', 'they', 'he', 'she'].includes(f.main.s.text) && f.main.s.text !== f.ifc.s.text;
  return !forward;
}

export function condSentence(f: CondFrame, type: CondType, gapIn: 'if' | 'main' | null, mainFirst = false): string {
  const p = condParts(f, type);
  const ifc = p.ifText(gapIn === 'if' ? '___' : contract(p.ifAccepted[0]));
  const main = p.mainText(gapIn === 'main' ? '___' : contract(p.mainAccepted[0]));
  return mainFirst ? sentence(main, ifc, '.') : sentence(`${ifc},`, main, '.');
}

/** Inverted conditional (formal): Had I known…, Were I you…, Should you need… */
export function inversion(f: CondFrame, type: CondType): { keyword: string; answer: string; rest: string } | null {
  const c = f.ifc;
  const v = getVerb(c.v);
  const subj = c.s.text;
  const not = c.neg ? ' not' : '';
  const rest = `${c.o ? c.o : ''}`;
  if (type === 'third' || type === 'mixed-past-present') {
    return { keyword: 'HAD', answer: `Had ${subj}${not} ${v.pp[0]}`, rest };
  }
  if (type === 'second' || type === 'mixed-present-past') {
    if (v.base === 'be') return { keyword: 'WERE', answer: `Were ${subj}${not}`, rest };
    // "Were … to" is hypothetical-future: not with negatives, states or a past result.
    if (c.neg || type !== 'second' || ['have', 'know'].includes(v.base)) return null;
    return { keyword: 'WERE', answer: `Were ${subj} to ${v.base}`, rest };
  }
  if (type === 'first' && !c.neg) {
    return { keyword: 'SHOULD', answer: `Should ${subj} ${v.base}`, rest };
  }
  return null;
}

function condMeta(type: CondType, extra = ''): ItemMeta {
  return {
    level: COND_LEVEL[type],
    difficulty: type.startsWith('mixed') ? 4 : type === 'third' ? 3 : 2,
    topic: 'conditionals',
    ref: COND_REF[type],
    explanation: `${COND_EXPLANATION[type]}${extra}`,
    examTags: ['CAE', 'IELTS', 'TOEFL', 'EsPCEx', 'AFA', 'ENEM'],
  };
}

function buildCondItem(rng: Rng, id: string): Item {
  const f = rng.pick(COND_FRAMES);
  const type = rng.pick(f.types);
  const p = condParts(f, type);
  const kind = rng.int(6);
  const gapIn: 'if' | 'main' = rng.chance(0.5) ? 'if' : 'main';
  const mainFirst = mainFirstAllowed(f) && rng.chance(0.3);
  const meta = condMeta(type);

  if (kind <= 1) {
    const clause = gapIn === 'if' ? f.ifc : f.main;
    const accepted = gapIn === 'if' ? p.ifAccepted : p.mainAccepted;
    const cue = clause.neg ? `not / ${clause.v}` : clause.v;
    return buildGap(id, condSentence(f, type, gapIn, mainFirst), accepted, { ...meta, instruction: 'Complete the conditional sentence with the verb in brackets.' }, { cue });
  }
  if (kind <= 3) {
    const accepted = gapIn === 'if' ? p.ifAccepted : p.mainAccepted;
    const wrong = gapIn === 'if' ? p.ifWrong : p.mainWrong;
    return buildMcq(rng, id, condSentence(f, type, gapIn, mainFirst), accepted[0], wrong, accepted, { ...meta, instruction: 'Choose the correct option.' });
  }
  if (kind === 4) {
    const inv = inversion(f, type);
    if (inv) {
      const first = condSentence(f, type, null);
      const mainPart = p.mainText(contract(p.mainAccepted[0]));
      const after = `${inv.rest}, ${mainPart}.`.trim();
      return buildKwt(id, first, inv.keyword, '', after, [inv.answer], {
        ...condMeta(type, ' In formal English the conditional can be inverted: Had + subject + past participle; Were + subject (+ to-infinitive); Should + subject + infinitive — without "if".'),
        level: 'C1',
        difficulty: 4,
        ref: '7.5',
        examTags: ['CAE', 'CPE', 'ITA', 'IME'],
        instruction: 'Rewrite the sentence without "if", using the word given. Use between two and five words.',
      });
    }
  }
  // Error correction: the classic "would"/"will" in the if-clause, or a wrong main-clause form.
  return errorItem(rng, id, f, type);
}

function errorItem(rng: Rng, id: string, f: CondFrame, type: CondType): ErrorItemT {
  const p = condParts(f, type);
  const errIn: 'if' | 'main' = rng.chance(0.6) ? 'if' : 'main';
  const wrongVP = errIn === 'if' ? rng.pick(p.ifWrong.slice(0, 2)) : rng.pick(p.mainWrong.slice(0, 2));
  const ifVP = errIn === 'if' ? wrongVP : p.ifAccepted[0];
  const mainVP = errIn === 'main' ? wrongVP : p.mainAccepted[0];
  const ifBefore = capitalize(`if ${f.ifc.s.text} `);
  const parts: ErrorItemT['parts'] = [
    ifBefore,
    { u: contract(ifVP) },
    `${f.ifc.o ? ' ' + f.ifc.o : ''}, ${f.main.s.text} `,
    { u: contract(mainVP) },
    `${f.main.o ? ' ' + f.main.o : ''}.`,
  ];
  const meta = condMeta(type);
  return {
    id,
    level: meta.level,
    difficulty: meta.difficulty + 1,
    topics: ['conditionals'],
    skill: 'grammar',
    examTags: ['EN', 'EFOMM', 'AFA', 'EsPCEx'],
    source: 'generated',
    ref: meta.ref,
    explanation: `${meta.explanation} Correct: “${condSentence(f, type, null)}”`,
    instruction: 'One underlined part is wrong. Select it and write the correction.',
    type: 'error-correction',
    parts,
    errorIndex: errIn === 'if' ? 0 : 1,
    acceptedAnswers: errIn === 'if' ? p.ifAccepted : p.mainAccepted,
  };
}

export const conditionalsGenerator: Generator = {
  key: 'conditionals',
  title: 'Conditionals (zero to mixed, inversion)',
  topic: 'conditionals',
  ref: '7.1',
  generate(seed: number): Item {
    const rng = new Rng(seed);
    return buildCondItem(rng, genId('conditionals', seed));
  },
};

/** Word-order items built from inverted conditionals. */
export function inversionWordOrder(f: CondFrame, type: CondType, id: string): WordOrderItemT | null {
  const inv = inversion(f, type);
  if (!inv) return null;
  const p = condParts(f, type);
  const full = sentence(`${inv.answer}${inv.rest ? ' ' + inv.rest : ''},`, p.mainText(p.mainAccepted[0]), '.');
  const words = full.replace(/[.]$/, '').split(' ');
  const fragments: string[] = [];
  for (let i = 0; i < words.length; i += 2) fragments.push(words.slice(i, i + 2).join(' '));
  const meta = condMeta(type);
  return {
    id,
    level: 'C1',
    difficulty: 4,
    topics: ['conditionals', 'inversion'],
    skill: 'grammar',
    examTags: ['CAE', 'CPE', 'ITA'],
    source: 'generated',
    ref: '7.5',
    explanation: `${meta.explanation} Inverted form: “${full}”`,
    instruction: 'Put the fragments in order to make an inverted conditional.',
    type: 'word-order',
    fragments,
    acceptedAnswers: [full],
  };
}

// ── Unreal past ────────────────────────────────────────────────────────

const POSS_PRONOUN = (s: Subject): Subject => ({ ...s, text: s.pronoun });

function wishVerb(s: Subject): string {
  return s.person === 3 && !s.plural ? 'wishes' : 'wish';
}

export function wishPresentParts(f: (typeof WISH_PRESENT)[number]) {
  const pron = POSS_PRONOUN(f.s);
  const realVP = f.modal === 'can' ? (f.realNeg ? `can't ${f.v}` : `can ${f.v}`) : contract(conjugate(f.v, 'present-simple', f.s, { negative: f.realNeg })[0]);
  const accepted = f.modal === 'can'
    ? [f.realNeg ? `could ${f.v}` : `could not ${f.v}`]
    : conjugate(f.v, 'past-simple', pron, { negative: !f.realNeg, subjunctiveWere: true });
  return {
    reality: sentence(f.s.text, realVP, f.o, '.'),
    prompt: sentence(f.s.text, wishVerb(f.s), pron.text, '___', f.o, '.'),
    accepted,
    wrong: [
      f.modal === 'can' ? `can ${f.v}` : conjugate(f.v, 'present-simple', pron, { negative: !f.realNeg })[0],
      conjugate(f.v, 'would', pron, { negative: !f.realNeg })[0],
      conjugate(f.v, 'will', pron, { negative: !f.realNeg })[0],
      conjugate(f.v, 'present-perfect', pron, { negative: !f.realNeg })[0],
    ],
    cue: f.modal === 'can' ? (f.realNeg ? `can / ${f.v}` : `not / can / ${f.v}`) : f.realNeg ? f.v : `not / ${f.v}`,
  };
}

export function wishPastParts(f: (typeof WISH_PAST)[number]) {
  const pron = POSS_PRONOUN(f.s);
  const v = getVerb(f.v);
  const accepted = conjugate(f.v, 'past-perfect', pron, { negative: !f.realNeg });
  const gerund = `${f.realNeg ? 'not ' : ''}${v.ing[0]}`;
  return {
    reality: sentence(f.s.text, contract(conjugate(f.v, 'past-simple', f.s, { negative: f.realNeg })[0]), f.o, '.'),
    regret: sentence(f.s.text, f.s.person === 3 && !f.s.plural ? 'regrets' : 'regret', gerund, f.o, '.'),
    prompt: sentence(f.s.text, wishVerb(f.s), pron.text, '___', f.o, '.'),
    accepted,
    kwt: accepted.map((a) => `${wishVerb(f.s)} ${pron.text} ${a}`),
    wrong: [
      conjugate(f.v, 'past-simple', pron, { negative: !f.realNeg })[0],
      conjugate(f.v, 'would', pron, { negative: !f.realNeg })[0],
      conjugate(f.v, 'present-perfect', pron, { negative: !f.realNeg })[0],
      `${!f.realNeg ? 'had not' : 'had'} ${v.past[0] === v.pp[0] ? v.base : v.past[0]}`,
    ],
    cue: f.realNeg ? f.v : `not / ${f.v}`,
  };
}

const UNREAL_META = (ref: string, explanation: string, level: ItemMeta['level'] = 'B2', difficulty = 3): ItemMeta => ({
  level,
  difficulty,
  topic: 'unreal-past',
  ref,
  explanation,
  examTags: ['CAE', 'IELTS', 'EsPCEx', 'EN', 'FUVEST'],
});

function unrealItem(rng: Rng, id: string): Item {
  const kind = rng.int(5);
  if (kind === 0) {
    const f = rng.pick(WISH_PRESENT);
    const p = wishPresentParts(f);
    const meta = UNREAL_META('8.1', 'Wish + past simple (or could) for a present situation we would like to be different. With "be", "were" is preferred in formal English.', 'B2', 2);
    if (rng.chance(0.5)) return buildGap(id, `${p.reality} → ${p.prompt}`, p.accepted, { ...meta, instruction: 'Complete the wish so that it refers to the situation in the first sentence.' }, { cue: p.cue });
    return buildMcq(rng, id, `${p.reality} → ${p.prompt}`, p.accepted[0], p.wrong, p.accepted, { ...meta, instruction: 'Choose the correct option.' });
  }
  if (kind === 1) {
    const f = rng.pick(WISH_PAST);
    const p = wishPastParts(f);
    const meta = UNREAL_META('8.1', 'Wish + past perfect to express regret about the past.', 'B2', 3);
    // The key word must stay unchanged, so KWT only with subjects that take "wish".
    const kwtOk = !(f.s.person === 3 && !f.s.plural);
    const r = rng.int(kwtOk ? 3 : 2);
    if (r === 0) return buildGap(id, `${p.reality} → ${p.prompt}`, p.accepted, { ...meta, instruction: 'Complete the wish.' }, { cue: p.cue });
    if (r === 1) return buildMcq(rng, id, `${p.reality} → ${p.prompt}`, p.accepted[0], p.wrong, p.accepted, { ...meta, instruction: 'Choose the correct option.' });
    return buildKwt(id, p.regret, 'WISH', f.s.text === 'I' ? 'I' : sentence(f.s.text), `${f.o}.`, p.kwt, {
      ...meta,
      level: 'C1',
      difficulty: 4,
      examTags: ['CAE', 'CPE', 'ITA'],
      instruction: 'Complete the second sentence so that it has a similar meaning to the first, using the word given. Use between two and five words.',
    });
  }
  if (kind === 2) {
    const f = rng.pick(WISH_PRESENT.filter((x) => !x.modal));
    const p = wishPresentParts(f);
    const prompt = `${p.reality} → If only ${POSS_PRONOUN(f.s).text} ___ ${f.o}!`.replace(/\s+!/, '!').replace(/ {2,}/g, ' ');
    return buildGap(id, prompt, p.accepted, UNREAL_META('8.1', '"If only" works like "wish" but is more emphatic: if only + past simple for the present.', 'B2', 3), { cue: p.cue });
  }
  if (kind === 3) {
    const f = rng.pick(ITS_TIME);
    const v = getVerb(f.v);
    const accepted = conjugate(f.v, 'past-simple', f.s, { subjunctiveWere: true });
    const prompt = sentence(`It's high time ${f.s.text} ___`, f.o, '.');
    const wrong = [`will ${v.base}`, `would ${v.base}`, conjugate(f.v, 'present-perfect', f.s)[0], v.ing[0]];
    const meta = UNREAL_META('8.2', "It's (high) time + subject + past simple: it should already be happening. (Without a subject: It's time to + infinitive.)", 'B2', 3);
    if (rng.chance(0.5)) return buildMcq(rng, id, prompt, accepted[0], wrong, accepted, meta);
    return buildGap(id, prompt, accepted, meta, { cue: f.v });
  }
  const f = rng.pick(WOULD_RATHER);
  const v = getVerb(f.v);
  const accepted = conjugate(f.v, 'past-simple', f.other, { negative: f.neg, subjunctiveWere: true });
  const prompt = sentence(`I'd rather ${f.other.text} ___`, f.o, '.');
  const neg = f.neg ? 'not ' : '';
  const wrong = [`${f.neg ? "won't" : 'will'} ${v.base}`, `${f.neg ? "wouldn't" : 'would'} ${v.base}`, `to ${neg}${v.base}`, `${neg}${v.ing[0]}`];
  const meta = UNREAL_META('8.2', 'Would rather + another subject + past simple refers to the present or future ("I\'d rather you didn\'t…").', 'C1', 3);
  if (rng.chance(0.5)) return buildMcq(rng, id, prompt, accepted[0], wrong, accepted, meta);
  return buildGap(id, prompt, accepted, meta, { cue: f.neg ? `not / ${f.v}` : f.v });
}

export const unrealPastGenerator: Generator = {
  key: 'unreal-past',
  title: 'Wish, if only, it’s time, would rather',
  topic: 'unreal-past',
  ref: '8.1',
  generate(seed: number): Item {
    return unrealItem(new Rng(seed), genId('unreal-past', seed));
  },
};

