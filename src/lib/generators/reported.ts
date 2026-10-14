import {
  ADVERBS,
  COMMANDS,
  QUESTIONS,
  REPORTING_VERBS,
  SPEAKERS,
  STATEMENTS,
  type CommandFrame,
  type QuestionFrame,
  type QuoteTense,
  type Speaker,
  type StatementFrame,
} from '@content/data/reported-frames';
import { getVerb } from '@content/data/verbs';
import { Rng } from '../rng';
import type { Item } from '../schema';
import { capitalize, conjugate, contract, S, type Subject, type Tense } from './conjugate';
import { buildGap, buildMcq, genId, type Generator, type ItemMeta } from './core';

/** Backshift table: direct tense → reported tense(s) (first = canonical). */
export const BACKSHIFT: Record<QuoteTense, Array<Tense | 'could' | 'might' | 'had to' | 'must'>> = {
  'present-simple': ['past-simple'],
  'present-continuous': ['past-continuous'],
  'present-perfect': ['past-perfect'],
  'present-perfect-continuous': ['past-perfect-continuous'],
  'past-simple': ['past-perfect', 'past-simple'],
  will: ['would'],
  'going-to': ['past-going-to'],
  can: ['could'],
  must: ['had to', 'must'],
  may: ['might'],
};

const POSS: Record<string, string> = { I: 'my', you: 'your', he: 'his', she: 'her', we: 'our', they: 'their' };
const OBJ: Record<string, string> = { I: 'me', you: 'you', he: 'him', she: 'her', we: 'us', they: 'them' };

function subjectFor(p: string): Subject {
  return (S as Record<string, Subject>)[p];
}

/** Verb phrase for a tense, handling modals and "never / see" style adverbs. */
function vpFor(v: string, tense: Tense | 'can' | 'must' | 'may' | 'could' | 'might' | 'had to', s: Subject): string[] {
  const [adv, verb] = v.includes(' / ') ? v.split(' / ') : ['', v];
  const base = getVerb(verb).base;
  const modal = (m: string) => [`${m} ${base}`];
  let forms: string[];
  if (tense === 'can' || tense === 'must' || tense === 'may' || tense === 'could' || tense === 'might' || tense === 'had to') forms = modal(tense);
  else forms = conjugate(verb, tense, s);
  if (!adv) return forms;
  // Insert the adverb after the first auxiliary: "have never seen".
  return forms.map((f) => {
    const parts = f.split(' ');
    return parts.length > 1 ? [parts[0], adv, ...parts.slice(1)].join(' ') : `${adv} ${f}`;
  });
}

function shiftTokens(o: string, from: string, to: string): string {
  return o.replace('{my}', POSS[to]).replace('{our}', POSS[to]).replace('{me}', OBJ[to]).replace('{us}', OBJ[to]).replace('{your}', POSS[from]);
}

function directTokens(o: string, subj: string): string {
  return o.replace('{my}', POSS[subj]).replace('{our}', POSS[subj]).replace('{me}', OBJ[subj]).replace('{us}', OBJ[subj]);
}

export interface ReportedStatement {
  direct: string;
  /** All accepted reported clauses after "X said (that)". */
  clauses: string[];
  /** Accepted verb phrases only. */
  vps: string[];
  /** Reported sentence with ___ for the verb phrase. */
  gapPrompt: string;
  wrongVps: string[];
  full: string[];
}

export function reportStatement(sp: Speaker, f: StatementFrame): ReportedStatement {
  const directSubj = subjectFor(f.subj);
  const newPron = f.subj === 'I' ? sp.pron : 'they';
  const newSubj = subjectFor(newPron);
  const directVP = vpFor(f.v, f.tense as Tense, directSubj)[0];
  const directO = directTokens(f.o, f.subj);
  const direct = `${sp.name} said, “${capitalize([f.subj, contract(directVP), directO, f.adv ?? ''].filter(Boolean).join(' '))}.”`;
  const vps = [...new Set(BACKSHIFT[f.tense].flatMap((t) => vpFor(f.v, t as Tense, newSubj)))];
  const o = shiftTokens(f.o, f.subj, newPron).replace(/\byou\b/, 'me');
  const advs = f.adv ? ADVERBS[f.adv] : [''];
  const clauses = vps.flatMap((vp) => advs.map((a) => [newPron, vp, o, a].filter(Boolean).join(' ')));
  const full = clauses.flatMap((c) => [`${sp.name} said that ${c}.`, `${sp.name} said ${c}.`]);
  const gapPrompt = `${direct} → ${sp.name} said that ${[newPron, '___', o, advs[0]].filter(Boolean).join(' ')}.`;
  // Wrong options. Keeping the original tense is only wrong when a shifted
  // time expression ("that day", "the next day") makes it inconsistent —
  // without one, "She said she lives near the airport" is acceptable.
  const base = getVerb(f.v.includes(' / ') ? f.v.split(' / ')[1] : f.v);
  const extraWrong: string[] = [];
  if (f.adv) extraWrong.push(vpFor(f.v, f.tense as Tense, newSubj)[0]);
  if (f.tense === 'will') extraWrong.push(`would ${base.past[0]}`, `would to ${base.base}`);
  if (f.tense === 'can') extraWrong.push(`could ${base.past[0]}`, `could to ${base.base}`);
  if (f.tense === 'may') extraWrong.push(`might to ${base.base}`, `might ${base.ing[0]}`);
  if (f.tense === 'must') extraWrong.push(`musted ${base.base}`, `had to ${base.past[0]}`);
  if (f.tense === 'going-to') extraWrong.push(`was going ${base.base}`, `would going to ${base.base}`);
  const wasBase = `${newSubj.plural ? 'were' : 'was'} ${base.base}`;
  const perfect = f.tense === 'present-perfect' || f.tense === 'present-perfect-continuous' ? [] : conjugate(base.base, 'present-perfect', newSubj);
  const wrongVps = [...extraWrong, ...perfect, `had ${base.ing[0]}`, wasBase, `would ${base.pp[0]}`].filter((w) => !vps.includes(w));
  return { direct, clauses, vps, gapPrompt, wrongVps, full };
}

export interface ReportedQuestion {
  direct: string;
  reported: string[];
  embedded: string[];
  wrongEmbedded: string[];
  prompt: string;
}

export function reportQuestion(sp: Speaker, q: QuestionFrame): ReportedQuestion {
  const I = S.I;
  const v = getVerb(q.v);
  const aux: Record<QuestionFrame['tense'], string> = {
    'present-simple': 'do',
    'present-continuous': 'are',
    'present-perfect': 'have',
    'past-simple': 'did',
    will: 'will',
    can: 'can',
  };
  const mainVerbForm: Record<QuestionFrame['tense'], string> = {
    'present-simple': v.base,
    'present-continuous': v.ing[0],
    'present-perfect': v.pp[0],
    'past-simple': v.base,
    will: v.base,
    can: v.base,
  };
  const directQ = capitalize([q.wh ?? '', aux[q.tense], 'you', mainVerbForm[q.tense], q.o, q.adv ?? ''].filter(Boolean).join(' ')) + '?';
  const direct = `${sp.name} asked me, “${directQ}”`;
  const shifted = BACKSHIFT[q.tense].flatMap((t) => vpFor(q.v, t as Tense, I));
  const intro = q.wh ?? 'if';
  const advs = q.adv ? ADVERBS[q.adv] : [''];
  const embedded = shifted.flatMap((vp) => advs.map((a) => [intro, 'I', vp, q.o, a].filter(Boolean).join(' ')));
  if (!q.wh) embedded.push(...embedded.map((e) => e.replace(/^if /, 'whether ')));
  const reported = embedded.map((e) => `${sp.name} asked me ${e}.`);
  // Wrong: question word order kept, or no backshift with a direct-question auxiliary.
  const backAux: Record<QuestionFrame['tense'], string> = {
    'present-simple': 'did',
    'present-continuous': 'was',
    'present-perfect': 'had',
    'past-simple': 'had',
    will: 'would',
    can: 'could',
  };
  const backMain: Record<QuestionFrame['tense'], string> = {
    'present-simple': v.base,
    'present-continuous': v.ing[0],
    'present-perfect': v.pp[0],
    'past-simple': v.pp[0],
    will: v.base,
    can: v.base,
  };
  const tail = [q.o, advs[0]].filter(Boolean).join(' ');
  const wrongEmbedded = [
    [intro, backAux[q.tense], 'I', backMain[q.tense], tail].filter(Boolean).join(' '),
    [intro, aux[q.tense], 'I', mainVerbForm[q.tense], tail].filter(Boolean).join(' '),
    [intro, 'did I', v.past[0], tail].filter(Boolean).join(' '),
    [q.wh ?? 'if', aux[q.tense], 'you', mainVerbForm[q.tense], tail].filter(Boolean).join(' '),
  ].map((s) => s.replace(/\s+/g, ' '));
  const prompt = `${direct} → ${sp.name} asked me ___.`;
  return { direct, reported, embedded, wrongEmbedded: [...new Set(wrongEmbedded)].filter((w) => !embedded.includes(w)), prompt };
}

export function reportCommand(sp: Speaker, c: CommandFrame): { direct: string; reported: string; accepted: string[]; wrong: string[] } {
  const verb: Record<CommandFrame['kind'], string> = { ask: 'asked', tell: 'told', warn: 'warned', remind: 'reminded', advise: 'advised' };
  const o = c.o.replace('{my}', 'my');
  const inf = `${c.neg ? 'not ' : ''}to ${c.v}`;
  const accepted = [inf];
  const wrong = c.neg ? [`don't ${c.v}`, `not ${c.v}`, `to don't ${c.v}`, `not ${getVerb(c.v).ing[0]}`] : [c.v, `${getVerb(c.v).ing[0]}`, `to ${getVerb(c.v).ing[0]}`, `for ${c.v}`];
  return {
    direct: `${sp.name}: “${c.direct}”`,
    reported: `${sp.name} ${verb[c.kind]} me ___ ${o}.`,
    accepted,
    wrong,
  };
}

const META: Omit<ItemMeta, 'explanation' | 'ref'> = {
  level: 'B2',
  difficulty: 3,
  topic: 'reported-speech',
  examTags: ['CAE', 'IELTS', 'EsPCEx', 'EFOMM', 'EN', 'ENEM'],
};

function reportedItem(rng: Rng, id: string): Item {
  const sp = rng.pick(SPEAKERS);
  const kind = rng.int(6);
  if (kind <= 1) {
    const f = rng.pick(STATEMENTS);
    const r = reportStatement(sp, f);
    const adv = f.adv ? ` “${f.adv}” → “${ADVERBS[f.adv][0]}”.` : '';
    const explanation = `After a past reporting verb the tense moves back: ${f.tense} → ${BACKSHIFT[f.tense][0]}; pronouns change (${f.subj} → ${f.subj === 'I' ? sp.pron : 'they'}).${adv}`;
    if (kind === 0) {
      return buildGap(id, r.gapPrompt, r.vps, { ...META, ref: '10.1', explanation, instruction: 'Complete the reported statement (backshift the verb).' }, { cue: f.v.replace(' / ', ' ') });
    }
    return buildMcq(rng, id, r.gapPrompt, r.vps[0], r.wrongVps, r.vps, { ...META, ref: '10.1', explanation, instruction: 'Choose the correct verb form for the reported statement.' });
  }
  if (kind <= 3) {
    const q = rng.pick(QUESTIONS);
    const r = reportQuestion(sp, q);
    const explanation = `Reported questions use statement word order (subject + verb), no do/does/did and no question mark; yes/no questions use "if" or "whether". Tenses move back as in statements.`;
    if (kind === 2) {
      return buildMcq(rng, id, r.prompt, r.embedded[0], r.wrongEmbedded, r.embedded, { ...META, ref: '10.2', explanation, instruction: 'Choose the correct reported question.' });
    }
    return buildGap(id, r.prompt, r.embedded, { ...META, ref: '10.2', level: 'B2', difficulty: 4, explanation, instruction: 'Report the question. Write the missing words.' }, { noAlmost: false });
  }
  if (kind === 4) {
    const c = rng.pick(COMMANDS);
    const r = reportCommand(sp, c);
    const explanation = `Reported orders, requests and advice: verb + object + (not) to-infinitive.`;
    return buildMcq(rng, id, `${r.direct} → ${r.reported}`, r.accepted[0], r.wrong, r.accepted, { ...META, level: 'B1', difficulty: 2, ref: '10.3', explanation, instruction: 'Choose the correct option.' });
  }
  const rv = rng.pick(REPORTING_VERBS);
  const explanation = `Pattern: ${rv.pattern}.`;
  if (rng.chance(0.5)) {
    return buildMcq(rng, id, `${rv.direct} → ${rv.reported}`, rv.accepted[0], rv.wrong, rv.accepted, { ...META, level: 'C1', difficulty: 3, ref: '10.4', explanation, instruction: 'Choose the correct pattern after the reporting verb.' });
  }
  return buildGap(id, `${rv.direct} → ${rv.reported}`, rv.accepted, { ...META, level: 'C1', difficulty: 4, ref: '10.4', explanation, instruction: 'Complete with the correct form of the verb, following the pattern of the reporting verb.' });
}

export const reportedSpeechGenerator: Generator = {
  key: 'reported-speech',
  title: 'Reported speech and reporting verbs',
  topic: 'reported-speech',
  ref: '10.1',
  generate(seed: number): Item {
    return reportedItem(new Rng(seed), genId('reported-speech', seed));
  },
};
