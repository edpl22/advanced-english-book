import { S, np, type Subject, type Tense } from '../../src/lib/generators/conjugate';

/**
 * Data for the passive / causative generator. Each tense is paired with a
 * time expression that suits it, so every active and passive sentence the
 * generator writes is natural.
 */

export interface PassiveFrame {
  agent: Subject;
  /** A vague agent (people, someone) is normally omitted in the passive. */
  vagueAgent?: boolean;
  v: string;
  obj: Subject;
  uses: Array<[Tense | 'modal', string]>;
  modal?: string;
}

export const PASSIVE_FRAMES: PassiveFrame[] = [
  {
    agent: np('the city council', false),
    v: 'approve',
    obj: np('the new budget', false),
    uses: [['past-simple', 'last month'], ['will', 'next week']],
  },
  {
    agent: np('a team of volunteers', false),
    v: 'clean',
    obj: np('the beaches', true),
    uses: [['present-simple', 'every Sunday morning'], ['past-simple', 'after the festival'], ['present-continuous', 'right now']],
  },
  {
    agent: np('engineers', true),
    v: 'inspect',
    obj: np('the bridge', false),
    uses: [['present-simple', 'twice a year'], ['present-continuous', 'at the moment'], ['will', 'before the reopening']],
  },
  {
    agent: np('someone', false),
    vagueAgent: true,
    v: 'steal',
    obj: np('my laptop', false),
    uses: [['past-simple', 'from the library yesterday'], ['present-perfect', 'from the car']],
  },
  {
    agent: np('the publisher', false),
    v: 'translate',
    obj: np('her novels', true),
    uses: [['present-perfect', 'into twelve languages'], ['will', 'into Portuguese next year']],
  },
  {
    agent: np('the board', false),
    v: 'appoint',
    obj: np('a new chief executive', false),
    uses: [['past-simple', 'in March'], ['will', 'before the end of the year'], ['going-to', 'next month']],
  },
  {
    agent: np('the police', true),
    v: 'question',
    obj: np('three suspects', true),
    uses: [['past-simple', 'last night'], ['present-continuous', 'as we speak'], ['past-continuous', 'when the lawyer arrived']],
  },
  {
    agent: np('the company', false),
    v: 'launch',
    obj: np('the new model', false),
    uses: [['will', 'in September'], ['going-to', 'at the trade fair'], ['past-simple', 'with a huge advertising campaign']],
  },
  {
    agent: np('the organisers', true),
    v: 'cancel',
    obj: np('the concert', false),
    uses: [['past-simple', 'because of the storm'], ['present-perfect', 'because of the storm'], ['past-perfect', 'before we reached the stadium']],
  },
  {
    agent: np('people', true),
    vagueAgent: true,
    v: 'speak',
    obj: np('Portuguese', false),
    uses: [['present-simple', 'in nine countries']],
  },
  {
    agent: np('the architects', true),
    v: 'design',
    obj: np('the new terminal', false),
    uses: [['past-simple', 'in 2015'], ['present-perfect', 'to reduce energy use']],
  },
  {
    agent: np('a private firm', false),
    v: 'build',
    obj: np('the stadium', false),
    uses: [['past-simple', 'in less than two years'], ['present-continuous', 'on the site of the old factory'], ['will', 'next to the river']],
  },
  {
    agent: np('the committee', false),
    v: 'review',
    obj: np('all applications', true),
    uses: [['modal', 'before the deadline'], ['will', 'in the order they arrive'], ['present-simple', 'within ten working days']],
    modal: 'must',
  },
  {
    agent: np('the hospital', false),
    v: 'treat',
    obj: np('over two hundred patients', true),
    uses: [['past-simple', 'after the accident'], ['present-perfect', 'since the outbreak began']],
  },
  {
    agent: np('the IT department', false),
    v: 'update',
    obj: np('the software', false),
    uses: [['present-simple', 'automatically every night'], ['present-continuous', 'at the moment'], ['present-perfect', 'twice this week']],
  },
  {
    agent: np('the auditors', true),
    v: 'examine',
    obj: np('the accounts', true),
    uses: [['past-continuous', 'when the scandal broke'], ['past-simple', 'last year'], ['will', 'next month']],
  },
  {
    agent: np('the jury', false),
    v: 'award',
    obj: np('the prize', false),
    uses: [['past-simple', 'to a first-time novelist'], ['will', 'at a ceremony in Paris']],
  },
  {
    agent: np('the students', true),
    v: 'write',
    obj: np('the report', false),
    uses: [['past-simple', 'in English'], ['present-perfect', 'in English'], ['modal', 'in English']],
    modal: 'should',
  },
  {
    agent: np('the government', false),
    v: 'introduce',
    obj: np('new regulations', true),
    uses: [['will', 'next year'], ['going-to', 'after the elections']],
  },
  {
    agent: np('the museum', false),
    v: 'acquire',
    obj: np('the painting', false),
    uses: [['past-simple', 'in 1998'], ['past-perfect', 'long before the scandal']],
  },
];

export interface DitransitiveFrame {
  agent: Subject;
  v: 'give' | 'offer' | 'send' | 'show' | 'promise' | 'award' | 'lend' | 'teach' | 'pay';
  person: Subject;
  thing: Subject;
  tense: Tense;
  tail: string;
}

export const DITRANSITIVE_FRAMES: DitransitiveFrame[] = [
  { agent: np('the company', false), v: 'give', person: np('each employee', false), thing: np('a bonus', false), tense: 'past-simple', tail: 'in December' },
  { agent: np('the university', false), v: 'offer', person: np('my cousin', false, 'she'), thing: np('a scholarship', false), tense: 'present-perfect', tail: '' },
  { agent: np('the bank', false), v: 'send', person: np('all customers', true), thing: np('a new card', false), tense: 'will', tail: 'next month' },
  { agent: np('the guide', false), v: 'show', person: np('the visitors', true), thing: np('the old cellars', true), tense: 'past-simple', tail: 'at the end of the tour' },
  { agent: np('the manager', false), v: 'promise', person: np('the staff', true), thing: np('a pay rise', false), tense: 'past-simple', tail: 'last year' },
  { agent: np('the foundation', false), v: 'award', person: np('the researchers', true), thing: np('a grant', false), tense: 'present-perfect', tail: '' },
  { agent: np('the library', false), v: 'lend', person: np('the students', true), thing: np('laptops', true), tense: 'present-simple', tail: 'for the whole term' },
  { agent: np('the client', false), v: 'pay', person: np('the consultants', true), thing: np('a large fee', false), tense: 'past-simple', tail: 'for the report' },
];

export interface CausativeFrame {
  /** Things the subject owns, written with {poss}. */
  thing: string;
  thingPlural?: boolean;
  v: string;
  tense: Tense;
  tail: string;
}

export const CAUSATIVE_SUBJECTS: Subject[] = [S.I, S.we, S.they, S.he, S.she, np('my brother', false, 'he'), np('the Oliveiras', true)];

export const CAUSATIVE_FRAMES: CausativeFrame[] = [
  { thing: '{poss} car', v: 'service', tense: 'past-simple', tail: 'last week' },
  { thing: '{poss} hair', v: 'cut', tense: 'past-simple', tail: 'yesterday' },
  { thing: '{poss} kitchen', v: 'redecorate', tense: 'present-continuous', tail: 'this month' },
  { thing: '{poss} eyes', thingPlural: true, v: 'test', tense: 'going-to', tail: 'tomorrow' },
  { thing: '{poss} passport photos', thingPlural: true, v: 'take', tense: 'present-perfect', tail: '' },
  { thing: '{poss} roof', v: 'repair', tense: 'will', tail: 'before the rainy season' },
  { thing: '{poss} documents', thingPlural: true, v: 'translate', tense: 'past-simple', tail: 'by a sworn translator' },
  { thing: '{poss} suit', v: 'clean', tense: 'past-simple', tail: 'before the wedding' },
  { thing: '{poss} contract', v: 'check', tense: 'past-simple', tail: 'by a lawyer' },
  { thing: '{poss} groceries', thingPlural: true, v: 'deliver', tense: 'present-simple', tail: 'every Friday' },
];

export const POSSESSIVE: Record<string, string> = { I: 'my', you: 'your', he: 'his', she: 'her', it: 'its', we: 'our', they: 'their' };

/** Reporting passives: People say that X … → X is said to … / It is said that … */
export interface ReportingFrame {
  subject: Subject;
  /** Present-tense clause, e.g. ['own', 'three hotels'] */
  v: string;
  o: string;
  /** Relation of the clause to the reporting time. */
  time: 'same' | 'continuous' | 'past';
  /** Tense of a 'past' clause in the active sentence (default past simple). */
  pastTense?: 'past-simple' | 'present-perfect';
  reporting: 'say' | 'believe' | 'think' | 'report' | 'know' | 'consider' | 'understand' | 'expect';
}

export const REPORTING_FRAMES: ReportingFrame[] = [
  { subject: np('the minister', false, 'she'), v: 'resign', o: '', time: 'past', pastTense: 'present-perfect', reporting: 'say' },
  { subject: np('the minister', false, 'she'), v: 'plan', o: 'to resign', time: 'continuous', reporting: 'say' },
  { subject: np('the singer', false, 'he'), v: 'own', o: 'three hotels in Lisbon', time: 'same', reporting: 'say' },
  { subject: np('the company', false), v: 'lose', o: 'millions last year', time: 'past', reporting: 'believe' },
  { subject: np('the thieves', true), v: 'escape', o: 'through a tunnel', time: 'past', reporting: 'think' },
  { subject: np('the virus', false), v: 'spread', o: 'more slowly than expected', time: 'continuous', reporting: 'report' },
  { subject: np('the painting', false), v: 'be', o: 'worth over a million dollars', time: 'same', reporting: 'believe' },
  { subject: np('the director', false, 'she'), v: 'negotiate', o: 'with a Chinese investor', time: 'continuous', reporting: 'understand' },
  { subject: np('the drug', false), v: 'reduce', o: 'the risk of heart disease', time: 'same', reporting: 'think' },
  { subject: np('the two leaders', true), v: 'meet', o: 'secretly last month', time: 'past', reporting: 'report' },
  { subject: np('the castle', false), v: 'date', o: 'from the twelfth century', time: 'same', reporting: 'think' },
  { subject: np('the coach', false, 'he'), v: 'consider', o: 'an offer from a Spanish club', time: 'continuous', reporting: 'say' },
  { subject: np('the hackers', true), v: 'steal', o: 'the data of thousands of clients', time: 'past', reporting: 'believe' },
  { subject: np('the island', false), v: 'have', o: 'the clearest water in the region', time: 'same', reporting: 'say' },
  { subject: np('the senator', false, 'he'), v: 'know', o: 'about the deal from the start', time: 'past', reporting: 'think' },
  { subject: np('Marie Curie', false, 'she'), v: 'be', o: 'one of the greatest scientists of her time', time: 'same', reporting: 'consider' },
];
