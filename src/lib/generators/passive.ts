import {
  CAUSATIVE_FRAMES,
  CAUSATIVE_SUBJECTS,
  DITRANSITIVE_FRAMES,
  PASSIVE_FRAMES,
  POSSESSIVE,
  REPORTING_FRAMES,
  type CausativeFrame,
  type DitransitiveFrame,
  type PassiveFrame,
  type ReportingFrame,
} from '@content/data/passive-frames';
import { getVerb } from '@content/data/verbs';
import { Rng } from '../rng';
import type { Item } from '../schema';
import { conjugate, passive, sentence, type Subject, type Tense } from './conjugate';
import { buildGap, buildKwt, buildMcq, genId, type Generator, type ItemMeta } from './core';

const flip = (s: Subject): Subject => ({ ...s, plural: !s.plural });

function activeVP(v: string, tense: Tense | 'modal', s: Subject, modal = 'must'): string {
  return tense === 'modal' ? `${modal} ${getVerb(v).base}` : conjugate(v, tense, s)[0];
}

/** Wrong passive forms: missing participle, active form, agreement, past for participle. */
export function passiveMalformed(v: string, tense: Tense | 'modal', s: Subject, modal = 'must'): string[] {
  const verb = getVerb(v);
  const right = passive(v, tense, s, modal)[0];
  const bePart = right.slice(0, right.length - verb.pp[0].length).trim();
  const out = [`${bePart} ${verb.base}`, activeVP(v, tense, s, modal)];
  const flipped = passive(v, tense, flip(s), modal)[0];
  if (flipped !== right) out.push(flipped);
  if (verb.irregular && !verb.pp.includes(verb.past[0])) out.push(`${bePart} ${verb.past[0]}`);
  if (tense === 'will') out.push(`will been ${verb.pp[0]}`);
  if (tense === 'present-perfect') out.push(`${bePart.replace('been', 'be')} ${verb.pp[0]}`);
  if (tense === 'present-continuous' || tense === 'past-continuous') out.push(`${bePart.replace('being', 'been')} ${verb.pp[0]}`);
  if (tense === 'modal') out.push(`${modal} been ${verb.pp[0]}`, `${modal} to be ${verb.pp[0]}`);
  if (tense === 'going-to') out.push(`${bePart.replace(' be', '')} ${verb.pp[0]}`);
  if (tense === 'past-perfect') out.push(`had be ${verb.pp[0]}`, `had being ${verb.pp[0]}`);
  const ok = new Set(passive(v, tense, s, modal));
  return [...new Set(out)].filter((x) => !ok.has(x));
}

export function activeSentence(f: PassiveFrame, tense: Tense | 'modal', tail: string): string {
  return sentence(f.agent.text, activeVP(f.v, tense, f.agent, f.modal), f.obj.text, tail, '.');
}

export function passiveAnswers(f: PassiveFrame, tense: Tense | 'modal'): string[] {
  const vps = passive(f.v, tense, f.obj, f.modal);
  return vps.flatMap((vp) => [`${vp} by ${f.agent.text}`, vp]);
}

const META_BASE = { topic: 'passive' as const, examTags: ['CAE' as const, 'EsPCEx' as const, 'EN' as const, 'ENEM' as const] };

function basicItem(rng: Rng, id: string): Item {
  const f = rng.pick(PASSIVE_FRAMES);
  const [tense, tail] = rng.pick(f.uses);
  const verb = getVerb(f.v);
  const correctVP = passive(f.v, tense, f.obj, f.modal)[0];
  const meta: ItemMeta = {
    ...META_BASE,
    level: tense === 'past-perfect' || tense === 'past-continuous' || tense === 'modal' ? 'B2' : 'B1',
    difficulty: tense === 'present-simple' || tense === 'past-simple' ? 2 : 3,
    ref: '9.1',
    explanation: `Passive = the right form of BE in the same tense as the active verb + past participle (${verb.pp[0]}). ${
      f.vagueAgent ? 'The agent ("by ' + f.agent.text + '") adds no information, so it is normally left out.' : 'The agent can be kept with "by" or omitted.'
    }`,
  };
  const active = activeSentence(f, tense, tail);
  if (rng.chance(0.5)) {
    const prompt = `${active} → ${sentence(f.obj.text, '___', f.vagueAgent ? '' : `by ${f.agent.text}`, tail, '.')}`;
    return buildMcq(rng, id, prompt, correctVP, passiveMalformed(f.v, tense, f.obj, f.modal), passive(f.v, tense, f.obj, f.modal), {
      ...meta,
      instruction: 'Choose the passive form that keeps the meaning of the active sentence.',
    });
  }
  const prompt = `${active} → ${sentence(f.obj.text, '___', tail, '.')}`;
  return buildGap(id, prompt, passiveAnswers(f, tense), { ...meta, instruction: 'Rewrite in the passive: complete the second sentence (include the agent only if it is useful).' });
}

export function ditransitiveForms(f: DitransitiveFrame): { personFirst: string; thingFirst: string; active: string } {
  return {
    active: sentence(f.agent.text, conjugate(f.v, f.tense, f.agent)[0], f.person.text, f.thing.text, f.tail, '.'),
    personFirst: sentence(f.person.text, passive(f.v, f.tense, f.person)[0], f.thing.text, f.tail, '.'),
    thingFirst: sentence(f.thing.text, passive(f.v, f.tense, f.thing)[0], 'to', f.person.text, f.tail, '.'),
  };
}

function ditransitiveItem(rng: Rng, id: string): Item {
  const f = rng.pick(DITRANSITIVE_FRAMES);
  const forms = ditransitiveForms(f);
  const verb = getVerb(f.v);
  const meta: ItemMeta = {
    ...META_BASE,
    level: 'B2',
    difficulty: 3,
    ref: '9.2',
    explanation: `With two objects, either can become the subject. The person as subject (“${forms.personFirst}”) is more common; with the thing as subject, the person needs “to”.`,
  };
  const right = passive(f.v, f.tense, f.person)[0];
  const bePart = right.slice(0, right.length - verb.pp[0].length).trim();
  // Only forms that are ungrammatical (or not passive) in any reading:
  // "were shown to the cellars" is grammatical (= taken there), so no "to".
  const wrong = [
    sentence(f.person.text, conjugate(f.v, f.tense, f.person)[0], f.thing.text, f.tail, '.'),
    sentence(f.person.text, passive(f.v, f.tense, flip(f.person))[0], f.thing.text, f.tail, '.'),
    sentence(f.person.text, bePart, verb.base, f.thing.text, f.tail, '.'),
    sentence(f.person.text, 'being', verb.pp[0], f.thing.text, f.tail, '.'),
  ];
  if (verb.irregular && !verb.pp.includes(verb.past[0])) wrong.push(sentence(f.person.text, bePart, verb.past[0], f.thing.text, f.tail, '.'));
  const all = [forms.personFirst, forms.thingFirst];
  return buildMcq(rng, id, `${forms.active}\nWhich sentence is the correct passive?`, forms.personFirst, wrong, all, {
    ...meta,
    instruction: 'Choose the correct passive sentence.',
  });
}

export function causativeAnswers(s: Subject, f: CausativeFrame, verb: 'have' | 'get'): string[] {
  const thing = f.thing.replace('{poss}', POSSESSIVE[s.pronoun] ?? 'their');
  const v = getVerb(f.v);
  return conjugate(verb, f.tense, s).flatMap((h) => v.pp.map((pp) => `${h} ${thing} ${pp}`));
}

function causativeItem(rng: Rng, id: string): Item {
  const s = rng.pick(CAUSATIVE_SUBJECTS);
  const f = rng.pick(CAUSATIVE_FRAMES);
  const thing = f.thing.replace('{poss}', POSSESSIVE[s.pronoun] ?? 'their');
  const v = getVerb(f.v);
  const haveForms = conjugate('have', f.tense, s);
  const accepted = [...causativeAnswers(s, f, 'have'), ...causativeAnswers(s, f, 'get')];
  const correct = causativeAnswers(s, f, 'have')[0];
  const meta: ItemMeta = {
    ...META_BASE,
    level: 'B2',
    difficulty: 3,
    ref: '9.3',
    explanation: `Causative: have/get + object + past participle, when someone else does the job for us (“${correct}”). “Get” is more informal.`,
  };
  const prompt = sentence(s.text, '___', f.tail, '.');
  if (rng.chance(0.5)) {
    return buildGap(id, prompt, accepted, { ...meta, instruction: 'Complete with the causative (have/get something done).' }, { cue: `${thing} / ${v.base}` });
  }
  const h = haveForms[0];
  const wrong = [`${h} ${v.pp[0]} ${thing}`, `${h} ${thing} ${v.base}`, `${h} ${thing} ${v.ing[0]}`, `${h} ${thing} to ${v.base}`];
  return buildMcq(rng, id, `${prompt} (${thing} / ${v.base})`, correct, wrong, accepted, { ...meta, instruction: 'Choose the correct causative form.' });
}

const REPORTING_PP: Record<ReportingFrame['reporting'], string> = {
  say: 'said',
  believe: 'believed',
  think: 'thought',
  report: 'reported',
  know: 'known',
  consider: 'considered',
  understand: 'understood',
  expect: 'expected',
};

export function reportingInfinitive(f: ReportingFrame): string {
  const v = getVerb(f.v);
  if (f.time === 'same') return `to ${v.base}`;
  if (f.time === 'continuous') return `to be ${v.ing[0]}`;
  return `to have ${v.pp[0]}`;
}

export function reportingForms(f: ReportingFrame) {
  const clauseTense: Tense = f.time === 'same' ? 'present-simple' : f.time === 'continuous' ? 'present-continuous' : (f.pastTense ?? 'past-simple');
  const clause = `${f.subject.text} ${conjugate(f.v, clauseTense, f.subject)[0]}`;
  const people = `People ${f.reporting} that ${clause}`;
  const be = f.subject.plural ? 'are' : 'is';
  const pp = REPORTING_PP[f.reporting];
  return {
    active: sentence(people, f.o, '.'),
    personalGap: `${be} ${pp} ${reportingInfinitive(f)}`,
    personal: sentence(f.subject.text, be, pp, reportingInfinitive(f), f.o, '.'),
    impersonal: sentence('It is', pp, 'that', clause, f.o, '.'),
    be,
    pp,
  };
}

function reportingItem(rng: Rng, id: string): Item {
  const f = rng.pick(REPORTING_FRAMES);
  const r = reportingForms(f);
  const v = getVerb(f.v);
  const meta: ItemMeta = {
    ...META_BASE,
    examTags: ['CAE', 'CPE', 'IELTS', 'ITA'],
    level: 'C1',
    difficulty: 4,
    ref: '9.4',
    explanation: `Reporting passive: subject + be ${r.pp} + infinitive. Same time → to + infinitive; in progress → to be + -ing; earlier → to have + past participle. Also possible: “${r.impersonal}”`,
  };
  const kind = rng.int(3);
  if (kind === 0) {
    const accepted = [r.personalGap];
    if (f.reporting === 'consider' && f.v === 'be' && f.time === 'same') accepted.push(`${r.be} ${r.pp}`);
    return buildKwt(id, r.active, r.pp.toUpperCase(), sentence(f.subject.text), f.o ? `${f.o}.` : '.', accepted, {
      ...meta,
      instruction: 'Complete the second sentence so that it has a similar meaning to the first, using the word given. Use between two and five words.',
    });
  }
  if (kind === 1) {
    const prompt = `${r.active} → ${sentence(f.subject.text, r.be, r.pp, '___', f.o, '.')}`;
    const forms = [`to ${v.base}`, `to be ${v.ing[0]}`, `to have ${v.pp[0]}`];
    const correct = reportingInfinitive(f);
    const wrong = [...forms.filter((x) => x !== correct), `to had ${v.pp[0]}`, `to have ${v.base}`, `${v.ing[0]}`];
    // Stative verbs make "to be + -ing" unnatural rather than a distinct meaning; keep it as a distractor only when the answer is not "to be -ing".
    return buildMcq(rng, id, prompt, correct, wrong, [correct], { ...meta, instruction: 'Choose the infinitive that keeps the time relation of the first sentence.' });
  }
  const prompt = sentence(`It ___ that`, `${f.subject.text} ${conjugate(f.v, f.time === 'same' ? 'present-simple' : f.time === 'continuous' ? 'present-continuous' : (f.pastTense ?? 'past-simple'), f.subject)[0]}`, f.o, '.');
  const rv = getVerb(f.reporting);
  const correct = `is ${r.pp}`;
  // "It says that…" / "It has said that…" are grammatical with a referential
  // "it" (a report), so only forms that are wrong in any reading are used.
  const wrong = [`is ${rv.base}`, `been ${r.pp}`, `being ${r.pp}`, `are ${r.pp}`];
  return buildMcq(rng, id, prompt, correct, wrong, [correct], { ...meta, level: 'B2', difficulty: 3, instruction: 'Choose the correct impersonal passive.' });
}

export const passiveGenerator: Generator = {
  key: 'passive',
  title: 'The passive, causative and reporting passive',
  topic: 'passive',
  ref: '9.1',
  generate(seed: number): Item {
    const rng = new Rng(seed);
    const id = genId('passive', seed);
    const r = rng.next();
    if (r < 0.45) return basicItem(rng, id);
    if (r < 0.6) return ditransitiveItem(rng, id);
    if (r < 0.8) return causativeItem(rng, id);
    return reportingItem(rng, id);
  },
};
