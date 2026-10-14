import { getVerb, type Verb } from '@content/data/verbs';

/**
 * Conjugation engine. Given a verb, a tense and a subject, it returns every
 * correct written form (alternative participles such as learnt/learned
 * included). Contractions are not produced here: the checking engine
 * accepts them automatically.
 */

export const TENSES = [
  'present-simple',
  'present-continuous',
  'past-simple',
  'past-continuous',
  'present-perfect',
  'present-perfect-continuous',
  'past-perfect',
  'past-perfect-continuous',
  'will',
  'going-to',
  'future-continuous',
  'future-perfect',
  'future-perfect-continuous',
  'past-going-to',
  'would',
  'would-have',
  'would-be-ing',
] as const;
export type Tense = (typeof TENSES)[number];

export const TENSE_NAMES: Record<Tense, string> = {
  'present-simple': 'present simple',
  'present-continuous': 'present continuous',
  'past-simple': 'past simple',
  'past-continuous': 'past continuous',
  'present-perfect': 'present perfect',
  'present-perfect-continuous': 'present perfect continuous',
  'past-perfect': 'past perfect',
  'past-perfect-continuous': 'past perfect continuous',
  will: 'will + infinitive',
  'going-to': 'be going to',
  'future-continuous': 'future continuous',
  'future-perfect': 'future perfect',
  'future-perfect-continuous': 'future perfect continuous',
  'past-going-to': 'was/were going to (future in the past)',
  would: 'would + infinitive',
  'would-have': 'would have + past participle',
  'would-be-ing': 'would be + -ing',
};

export interface Subject {
  text: string;
  person: 1 | 2 | 3;
  plural: boolean;
  /** Pronoun used to refer back to this subject (he, she, they, it…). */
  pronoun: string;
}

export const S: Record<'I' | 'you' | 'he' | 'she' | 'it' | 'we' | 'they', Subject> = {
  I: { text: 'I', person: 1, plural: false, pronoun: 'I' },
  you: { text: 'you', person: 2, plural: true, pronoun: 'you' },
  he: { text: 'he', person: 3, plural: false, pronoun: 'he' },
  she: { text: 'she', person: 3, plural: false, pronoun: 'she' },
  it: { text: 'it', person: 3, plural: false, pronoun: 'it' },
  we: { text: 'we', person: 1, plural: true, pronoun: 'we' },
  they: { text: 'they', person: 3, plural: true, pronoun: 'they' },
};

export function np(text: string, plural: boolean, pronoun?: string): Subject {
  return { text, person: 3, plural, pronoun: pronoun ?? (plural ? 'they' : 'it') };
}

const isThirdSg = (s: Subject) => s.person === 3 && !s.plural;

export function beForm(s: Subject, time: 'present' | 'past'): string {
  if (time === 'present') {
    if (s.person === 1 && !s.plural) return 'am';
    return isThirdSg(s) ? 'is' : 'are';
  }
  return (s.person === 1 && !s.plural) || isThirdSg(s) ? 'was' : 'were';
}

export function haveForm(s: Subject): string {
  return isThirdSg(s) ? 'has' : 'have';
}

export function doForm(s: Subject): string {
  return isThirdSg(s) ? 'does' : 'do';
}

/** -ise verbs also take -ize (AmE/Oxford); practise (BrE verb) = practice (AmE). */
function spellingVariants(form: string): string[] {
  const out = [form];
  const m = /^(.*(?:apolog|critic|emphas|organ|real|recogn|special|summar|minim|maxim|prior|standard|util))is(e|ed|es|ing)$/.exec(form);
  if (m) out.push(`${m[1]}iz${m[2]}`);
  const p = /^practis(e|ed|es|ing)$/.exec(form);
  if (p) out.push(`practic${p[1]}`);
  return out;
}

function vf(v: Verb, kind: 'base' | 's' | 'past' | 'pp' | 'ing'): string[] {
  const raw = kind === 'base' ? [v.base] : kind === 's' ? [v.s] : v[kind];
  return [...new Set(raw.flatMap(spellingVariants))];
}

function prefixed(prefix: string, forms: string[]): string[] {
  return forms.map((f) => (prefix ? `${prefix} ${f}` : f));
}

export interface ConjugateOptions {
  negative?: boolean;
  /** For the past simple of "be" with I/he/she/it in unreal clauses (were). */
  subjunctiveWere?: boolean;
}

/**
 * All correct forms of the verb phrase (without the subject).
 * e.g. conjugate('write', 'present-perfect', S.she) → ['has written']
 */
export function conjugate(base: string, tense: Tense, s: Subject, o: ConjugateOptions = {}): string[] {
  const v = getVerb(base);
  const neg = o.negative ?? false;
  const not = neg ? ' not' : '';
  const isBe = v.base === 'be';

  switch (tense) {
    case 'present-simple':
      if (isBe) return [beForm(s, 'present') + not];
      if (neg) return prefixed(`${doForm(s)} not`, vf(v, 'base'));
      return isThirdSg(s) ? vf(v, 's') : vf(v, 'base');
    case 'past-simple':
      if (isBe) {
        const w = o.subjunctiveWere ? 'were' : beForm(s, 'past');
        return o.subjunctiveWere && w === 'were' && beForm(s, 'past') === 'was' ? ['were' + not, 'was' + not] : [w + not];
      }
      if (neg) return prefixed('did not', vf(v, 'base'));
      return vf(v, 'past');
    case 'present-continuous':
      return prefixed(beForm(s, 'present') + not, vf(v, 'ing'));
    case 'past-continuous':
      return prefixed(beForm(s, 'past') + not, vf(v, 'ing'));
    case 'present-perfect':
      return prefixed(haveForm(s) + not, vf(v, 'pp'));
    case 'present-perfect-continuous':
      return prefixed(`${haveForm(s)}${not} been`, vf(v, 'ing'));
    case 'past-perfect':
      return prefixed('had' + not, vf(v, 'pp'));
    case 'past-perfect-continuous':
      return prefixed(`had${not} been`, vf(v, 'ing'));
    case 'will':
      return prefixed('will' + not, vf(v, 'base'));
    case 'going-to':
      return prefixed(`${beForm(s, 'present')}${not} going to`, vf(v, 'base'));
    case 'past-going-to':
      return prefixed(`${beForm(s, 'past')}${not} going to`, vf(v, 'base'));
    case 'future-continuous':
      return prefixed(`will${not} be`, vf(v, 'ing'));
    case 'future-perfect':
      return prefixed(`will${not} have`, vf(v, 'pp'));
    case 'future-perfect-continuous':
      return prefixed(`will${not} have been`, vf(v, 'ing'));
    case 'would':
      return prefixed('would' + not, vf(v, 'base'));
    case 'would-have':
      return prefixed(`would${not} have`, vf(v, 'pp'));
    case 'would-be-ing':
      return prefixed(`would${not} be`, vf(v, 'ing'));
  }
}

/** Passive verb phrase: the right form of "be" + past participle. */
export function passive(base: string, tense: Tense | 'modal', s: Subject, modal = 'must'): string[] {
  const v = getVerb(base);
  const pp = vf(v, 'pp');
  const be: Record<Tense | 'modal', string> = {
    'present-simple': beForm(s, 'present'),
    'past-simple': beForm(s, 'past'),
    'present-continuous': `${beForm(s, 'present')} being`,
    'past-continuous': `${beForm(s, 'past')} being`,
    'present-perfect': `${haveForm(s)} been`,
    'present-perfect-continuous': `${haveForm(s)} been being`,
    'past-perfect': 'had been',
    'past-perfect-continuous': 'had been being',
    will: 'will be',
    'going-to': `${beForm(s, 'present')} going to be`,
    'past-going-to': `${beForm(s, 'past')} going to be`,
    'future-continuous': 'will be being',
    'future-perfect': 'will have been',
    'future-perfect-continuous': 'will have been being',
    would: 'would be',
    'would-have': 'would have been',
    'would-be-ing': 'would be being',
    modal: `${modal} be`,
  };
  return prefixed(be[tense], pp);
}

/** Common wrong forms learners produce, for use as distractors. */
export function malformed(base: string, tense: Tense, s: Subject, o: ConjugateOptions = {}): string[] {
  const v = getVerb(base);
  const neg = o.negative ?? false;
  const not = neg ? ' not' : '';
  const out: string[] = [];
  const wrongHave = isThirdSg(s) ? 'have' : 'has';
  const wrongBePres = isThirdSg(s) ? 'are' : 'is';
  const wrongBePast = beForm(s, 'past') === 'was' ? 'were' : 'was';
  const regularised = v.base.endsWith('e') ? v.base + 'd' : v.base + 'ed';

  switch (tense) {
    case 'present-simple':
      if (v.base === 'be') out.push(wrongBePres + not);
      else if (neg) out.push(`${isThirdSg(s) ? 'do' : 'does'} not ${v.base}`, `${doForm(s)} not ${v.s}`);
      else out.push(isThirdSg(s) ? v.base : v.s, `${beForm(s, 'present')} ${v.base}`);
      break;
    case 'past-simple':
      if (neg) out.push(`did not ${v.past[0]}`);
      else {
        out.push(`did ${v.past[0]}`);
        if (v.irregular && !v.past.includes(regularised)) out.push(regularised);
        if (v.irregular && !v.past.includes(v.pp[0])) out.push(v.pp[0]);
      }
      break;
    case 'present-continuous':
      out.push(`${wrongBePres}${not} ${v.ing[0]}`, `${beForm(s, 'present')}${not} ${v.base}`);
      break;
    case 'past-continuous':
      out.push(`${wrongBePast}${not} ${v.ing[0]}`, `${beForm(s, 'past')}${not} ${v.base}`);
      break;
    case 'present-perfect':
      out.push(`${wrongHave}${not} ${v.pp[0]}`, `${haveForm(s)}${not} ${v.base}`);
      if (v.irregular && !v.pp.includes(v.past[0])) out.push(`${haveForm(s)}${not} ${v.past[0]}`);
      out.push(`${haveForm(s)}${not} ${v.ing[0]}`);
      break;
    case 'present-perfect-continuous':
      out.push(`${haveForm(s)}${not} been ${v.base}`, `${wrongHave}${not} been ${v.ing[0]}`, `${haveForm(s)}${not} being ${v.ing[0]}`);
      break;
    case 'past-perfect':
      out.push(`had${not} ${v.base}`);
      if (v.irregular && !v.pp.includes(v.past[0])) out.push(`had${not} ${v.past[0]}`);
      out.push(`have had${not} ${v.pp[0]}`);
      break;
    case 'past-perfect-continuous':
      out.push(`had${not} been ${v.base}`, `had${not} being ${v.ing[0]}`);
      break;
    case 'will':
      out.push(`will${not} ${isThirdSg(s) ? v.s : v.ing[0]}`, `will${not} to ${v.base}`);
      break;
    case 'going-to':
      out.push(`${beForm(s, 'present')}${not} going ${v.base}`, `${wrongBePres}${not} going to ${v.base}`);
      break;
    case 'past-going-to':
      out.push(`${beForm(s, 'past')}${not} going ${v.base}`, `${wrongBePast}${not} going to ${v.base}`);
      break;
    case 'future-continuous':
      out.push(`will${not} be ${v.base}`, `will${not} being ${v.ing[0]}`);
      break;
    case 'future-perfect':
      out.push(`will${not} have ${v.base}`, `will${not} has ${v.pp[0]}`);
      if (v.irregular && !v.pp.includes(v.past[0])) out.push(`will${not} have ${v.past[0]}`);
      break;
    case 'future-perfect-continuous':
      out.push(`will${not} have been ${v.base}`, `will${not} has been ${v.ing[0]}`, `will${not} been ${v.ing[0]}`);
      break;
    case 'would':
      out.push(`would${not} ${v.past[0]}`, `would${not} to ${v.base}`);
      break;
    case 'would-have':
      out.push(`would${not} have ${v.base}`, `would${not} had ${v.pp[0]}`);
      if (v.irregular && !v.pp.includes(v.past[0])) out.push(`would${not} have ${v.past[0]}`);
      break;
    case 'would-be-ing':
      out.push(`would${not} be ${v.base}`, `would${not} been ${v.ing[0]}`);
      break;
  }
  const correct = new Set(conjugate(base, tense, s, o));
  return [...new Set(out)].filter((f) => !correct.has(f));
}

export function capitalize(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/** Join words and tidy spaces before punctuation. */
export function sentence(...parts: string[]): string {
  return capitalize(
    parts
      .filter((p) => p !== '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.;:!?])/g, '$1')
      .trim(),
  );
}

const CONTRACTIONS: Array<[RegExp, string]> = [
  [/\bdo not\b/g, "don't"],
  [/\bdoes not\b/g, "doesn't"],
  [/\bdid not\b/g, "didn't"],
  [/\bis not\b/g, "isn't"],
  [/\bare not\b/g, "aren't"],
  [/\bwas not\b/g, "wasn't"],
  [/\bwere not\b/g, "weren't"],
  [/\bhas not\b/g, "hasn't"],
  [/\bhave not\b/g, "haven't"],
  [/\bhad not\b/g, "hadn't"],
  [/\bwill not\b/g, "won't"],
  [/\bwould not\b/g, "wouldn't"],
  [/\bcould not\b/g, "couldn't"],
  [/\bcan not\b/g, "can't"],
];

/** Contract negatives in text shown to the learner (answers stay uncontracted; the checker accepts both). */
export function contract(s: string): string {
  return CONTRACTIONS.reduce((acc, [re, c]) => acc.replace(re, c), s);
}
