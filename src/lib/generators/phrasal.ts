import { PHRASAL_VERBS, pvLabel, type PhrasalVerb } from '@content/phrasal/dictionary';
import { KNOWN_COMBOS } from '@content/phrasal/combos';
import { Rng } from '../rng';
import type { Item, McqItemT } from '../schema';
import { buildGap, buildMcq, genId, type Generator, type ItemMeta } from './core';
import { capitalize } from './conjugate';

const SINGLE_PARTICLES = ['up', 'down', 'out', 'off', 'on', 'over', 'through', 'away', 'back', 'in', 'into', 'across', 'along', 'round', 'about', 'forward', 'by'];
const MULTI_PARTICLES = [...new Set(PHRASAL_VERBS.filter((p) => p.particle.includes(' ')).map((p) => p.particle))];

const DICT_COMBOS = new Set(PHRASAL_VERBS.map((p) => pvLabel(p)));

/** Is "verb + particle" a real phrasal verb (so unsafe as a wrong option)? */
export function isRealCombo(verb: string, particle: string): boolean {
  const c = `${verb} ${particle}`;
  return DICT_COMBOS.has(c) || KNOWN_COMBOS.has(c);
}

/** Particles that are safe wrong answers for this entry. */
export function safeParticleDistractors(pv: PhrasalVerb): string[] {
  const pool = pv.particle.includes(' ') ? MULTI_PARTICLES : SINGLE_PARTICLES;
  return pool.filter((p) => p !== pv.particle && !(pv.alsoAccept ?? []).includes(p) && !isRealCombo(pv.verb, p));
}

export interface ParsedExample {
  /** Sentence with the phrasal verb replaced by ___ (contiguous examples only). */
  gapped: string | null;
  /** Conjugated phrasal verb as written in the example, e.g. "called off". */
  form: string | null;
  /** Conjugated verb only, e.g. "called". */
  verbForm: string | null;
  plain: string;
}

/** Parse "{called off} the strike" or "{put} it {off}" markup. */
export function parseExample(ex: string, pv: PhrasalVerb): ParsedExample {
  const pieces = ex.match(/\{[^}]+\}/g) ?? [];
  const plain = ex.replace(/[{}]/g, '');
  if (pieces.length !== 1) return { gapped: null, form: null, verbForm: null, plain };
  const form = pieces[0].slice(1, -1);
  const nPart = pv.particle.split(' ').length;
  const words = form.split(' ');
  const verbForm = words.slice(0, words.length - nPart).join(' ');
  return { gapped: ex.replace(pieces[0], '___'), form, verbForm, plain };
}

function meta(pv: PhrasalVerb, ref: string, explanation: string, extra: Partial<ItemMeta> = {}): ItemMeta {
  return {
    level: pv.level,
    difficulty: { B1: 2, B2: 3, C1: 4, C2: 5 }[pv.level],
    topic: 'phrasal-verbs',
    ref: pv.type === 'three-part' && ref === '22.3' ? '22.6' : ref,
    explanation,
    examTags: ['TOEFL', 'IELTS', 'CAE', 'ENEM', 'EsPCEx'],
    skill: 'vocabulary',
    ...extra,
  };
}

/**
 * Formal verbs too close in meaning to be offered against each other.
 */
const FORMAL_CLUSTERS: string[][] = [
  ['withdraw', 'resign', 'abandon', 'quit', 'surrender'],
  ['reduce', 'lower', 'minimise', 'decelerate', 'diminish', 'cut'],
  ['examine', 'inspect', 'review', 'investigate', 'analyse', 'consult', 'monitor'],
  ['discover', 'encounter', 'locate', 'solve', 'calculate', 'discern'],
  ['cancel', 'terminate', 'abolish', 'discontinue', 'exclude', 'eliminate', 'eradicate', 'omit', 'discard', 'remove'],
  ['delay', 'postpone', 'restrain'],
  ['continue', 'maintain', 'proceed', 'wait'],
  ['establish', 'commence', 'undertake', 'conduct', 'devise', 'fabricate', 'draft'],
  ['tolerate', 'accept', 'confront'],
  ['support', 'defend', 'rely', 'depend'],
  ['depart', 'disembark', 'arrive', 'appear', 'visit'],
  ['complete', 'conclude', 'fulfil', 'succeed', 'summarise', 'survive', 'manage', 'recover', 'revive'],
  ['raise', 'present', 'propose', 'indicate', 'represent', 'convey', 'transmit', 'stipulate'],
  ['cause', 'trigger', 'arise', 'occur', 'erupt', 'prove'],
  ['repay', 'compensate', 'return', 'retract'],
  ['persuade', 'urge', 'reconcile'],
  ['consider', 'reflect', 'anticipate', 'admire'],
  ['acquire', 'collect', 'occupy', 'transfer', 'donate', 'distribute', 'reserve', 'advance'],
  ['resolve', 'solve', 'handle', 'seek', 'accommodate', 'connect'],
  ['fail', 'collapse', 'expire', 'exhaust', 'vanish', 'die', 'quarrel', 'escape'],
];

function sameCluster(a: string, b: string): boolean {
  return a === b || FORMAL_CLUSTERS.some((c) => c.includes(a) && c.includes(b));
}

/** Phrasal verbs that would also be right: alternative particles and declared synonyms. */
export function relatedLabels(pv: PhrasalVerb): Set<string> {
  const out = new Set<string>([pvLabel(pv), ...(pv.synonyms ?? []), ...(pv.alsoAccept ?? []).map((p) => `${pv.verb} ${p}`)]);
  for (const o of PHRASAL_VERBS) if ((o.synonyms ?? []).includes(pvLabel(pv))) out.add(pvLabel(o));
  return out;
}

const definition = (pv: PhrasalVerb) => `“${pvLabel(pv)}” = ${pv.meaning}${pv.formal ? ` (formal: ${pv.formal})` : ''}.`;

export function particleItem(rng: Rng, pv: PhrasalVerb, id: string): McqItemT | null {
  const p = parseExample(pv.examples[0], pv);
  if (!p.form || !p.verbForm) return null;
  const wrong = safeParticleDistractors(pv);
  if (wrong.length < 3) return null;
  const prompt = pv.examples[0].replace(/\{[^}]+\}/, `${p.verbForm} ___`);
  return buildMcq(rng, id, prompt, pv.particle, wrong, [pv.particle, ...(pv.alsoAccept ?? [])], {
    ...meta(pv, '22.3', definition(pv)),
    instruction: 'Choose the particle that completes the phrasal verb.',
  });
}

export function conjugatedGapItem(pv: PhrasalVerb, id: string): Item | null {
  const p = parseExample(pv.examples[0], pv);
  if (!p.gapped || !p.form) return null;
  return buildGap(id, p.gapped, [p.form], { ...meta(pv, '22.4', definition(pv)), instruction: 'Complete with the phrasal verb in brackets in the correct form.' }, { cue: pvLabel(pv), type: 'phrasal-choice' });
}

export function meaningItem(rng: Rng, pv: PhrasalVerb, id: string): McqItemT | null {
  const p = parseExample(pv.examples[0], pv);
  const related = relatedLabels(pv);
  // Wrong meanings come from unrelated entries (different verb, particle and
  // themes, no shared formal sense), so only one meaning can fit the sentence.
  const pool = PHRASAL_VERBS.filter(
    (o) =>
      o.verb !== pv.verb &&
      o.particle !== pv.particle &&
      !related.has(pvLabel(o)) &&
      !o.themes.some((t) => pv.themes.includes(t)) &&
      !(o.formal && pv.formal && sameCluster(o.formal, pv.formal)),
  );
  if (pool.length < 3) return null;
  const label = p.form ?? pvLabel(pv);
  return buildMcq(rng, id, `${p.plain}\nWhat does “${label}” mean here?`, capitalize(pv.meaning), pool.map((o) => capitalize(o.meaning)), [capitalize(pv.meaning)], {
    ...meta(pv, '22.3', definition(pv)),
    instruction: 'Choose the meaning of the phrasal verb in this sentence.',
  });
}

/** Informal phrasal verb for a formal verb: options share the verb, so only the particle differs. */
export function registerItem(rng: Rng, pv: PhrasalVerb, id: string): McqItemT | null {
  if (!pv.formal) return null;
  const related = relatedLabels(pv);
  const sameVerb = PHRASAL_VERBS.filter(
    (o) => o.verb === pv.verb && !related.has(pvLabel(o)) && !(o.formal && sameCluster(o.formal, pv.formal!)) && !relatedLabels(o).has(pvLabel(pv)),
  );
  const wrong = [...new Set(sameVerb.map((o) => pvLabel(o)))].filter((w) => w !== pvLabel(pv));
  if (wrong.length < 3) return null;
  return buildMcq(rng, id, `Which phrasal verb with “${pv.verb}” is an informal equivalent of “${pv.formal}”?`, pvLabel(pv), wrong, [...related], {
    ...meta(pv, '22.5', `${definition(pv)} Phrasal verbs are typical of speech and informal writing; in academic and formal writing, the one-word verb (“${pv.formal}”) is usually preferred.`),
    instruction: 'Choose the phrasal verb.',
  });
}

/** Formal verb for an informal phrasal verb (TOEFL/IELTS academic writing). */
export function formalItem(rng: Rng, pv: PhrasalVerb, id: string): McqItemT | null {
  if (!pv.formal) return null;
  const distractors = PHRASAL_VERBS.filter((o) => o.formal && !sameCluster(o.formal, pv.formal!) && !o.themes.some((t) => pv.themes.includes(t))).map((o) => o.formal!);
  const uniq = [...new Set(distractors)];
  if (uniq.length < 3) return null;
  const p = parseExample(pv.examples[0], pv);
  return buildMcq(rng, id, `${p.plain}\nIn a formal report, which verb would best replace “${p.form ?? pvLabel(pv)}”?`, pv.formal, uniq, [pv.formal], {
    ...meta(pv, '22.5', `${definition(pv)} In formal writing, prefer the single-word verb (and adjust its form to the sentence).`),
    instruction: 'Choose the formal equivalent (base form).',
  });
}

export function pronounSentences(pv: PhrasalVerb): { correct: string; wrong: string[] } | null {
  if (!pv.obj || pv.type === 'intransitive') return null;
  const ex = pv.examples[0];
  const m = ex.match(/\{([^}]+)\}/);
  if ((ex.match(/\{/g) ?? []).length !== 1) return null;
  if (!m || !ex.includes(`{${m[1]}} ${pv.obj.noun}`)) return null;
  const form = m[1];
  const nPart = pv.particle.split(' ').length;
  const words = form.split(' ');
  const verb = words.slice(0, words.length - nPart).join(' ');
  const particles = words.slice(words.length - nPart);
  const pron = pv.obj.pron;
  const target = `{${form}} ${pv.obj.noun}`;
  const put = (s: string) => ex.replace(target, s);
  if (pv.type === 'separable') {
    return { correct: put(`${verb} ${pron} ${particles.join(' ')}`), wrong: [put(`${verb} ${particles.join(' ')} ${pron}`), put(`${pron} ${verb} ${particles.join(' ')}`)] };
  }
  if (pv.type === 'inseparable') {
    return { correct: put(`${verb} ${particles.join(' ')} ${pron}`), wrong: [put(`${verb} ${pron} ${particles.join(' ')}`), put(`${pron} ${verb} ${particles.join(' ')}`)] };
  }
  return {
    correct: put(`${verb} ${particles.join(' ')} ${pron}`),
    wrong: [put(`${verb} ${pron} ${particles.join(' ')}`), put(`${verb} ${particles[0]} ${pron} ${particles.slice(1).join(' ')}`)],
  };
}

export function pronounItem(rng: Rng, pv: PhrasalVerb, id: string): McqItemT | null {
  const s = pronounSentences(pv);
  if (!s) return null;
  const rule =
    pv.type === 'separable'
      ? `“${pvLabel(pv)}” is separable: a noun object can go before or after the particle, but a pronoun must go between the verb and the particle.`
      : pv.type === 'inseparable'
        ? `“${pvLabel(pv)}” is inseparable: the object (noun or pronoun) always follows the particle.`
        : `“${pvLabel(pv)}” is a three-part verb: it cannot be separated; the object goes at the end.`;
  return buildMcq(rng, id, `Replace “${pv.obj!.noun}” with “${pv.obj!.pron}”. Which sentence is correct?`, s.correct, s.wrong, [s.correct], { ...meta(pv, '22.2', rule), instruction: 'Choose the correct sentence.' }, 3);
}

const BUILDERS = [particleItem, meaningItem, registerItem, formalItem, pronounItem] as const;

export function phrasalItem(rng: Rng, pv: PhrasalVerb, id: string): Item {
  const order = rng.shuffle([0, 1, 2, 3, 4, 5]);
  for (const k of order) {
    const item = k === 5 ? conjugatedGapItem(pv, id) : BUILDERS[k](rng, pv, id);
    if (item) return item;
  }
  // Every entry has a meaning, so meaningItem always succeeds for large dictionaries.
  throw new Error(`No item could be built for ${pv.id}`);
}

export function makePhrasalGenerator(filter: (pv: PhrasalVerb) => boolean = () => true, key = 'phrasal-verbs', title = 'Phrasal verbs'): Generator {
  const pool = PHRASAL_VERBS.filter(filter);
  return {
    key,
    title,
    topic: 'phrasal-verbs',
    ref: '22.3',
    generate(seed: number): Item {
      const rng = new Rng(seed);
      const pv = rng.pick(pool);
      return phrasalItem(rng, pv, genId(key, seed));
    },
  };
}

export const phrasalGenerator = makePhrasalGenerator();
