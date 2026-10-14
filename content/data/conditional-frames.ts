import { S, np, type Subject } from '../../src/lib/generators/conjugate';

/**
 * Conditional frames: an if-clause and a main clause, plus the conditional
 * types that make sense for that content. Every frame was checked for each
 * listed type, in both clause orders.
 */

export type CondType = 'zero' | 'first' | 'second' | 'third' | 'mixed-past-present' | 'mixed-present-past';

export interface Clause {
  s: Subject;
  v: string;
  o?: string;
  neg?: boolean;
}

export interface CondFrame {
  id: string;
  ifc: Clause;
  main: Clause;
  types: CondType[];
}

const you = S.you;

export const COND_FRAMES: CondFrame[] = [
  { id: 'water', ifc: { s: you, v: 'heat', o: 'water to 100°C' }, main: { s: S.it, v: 'boil' }, types: ['zero'] },
  { id: 'colours', ifc: { s: you, v: 'mix', o: 'blue and yellow' }, main: { s: you, v: 'get', o: 'green' }, types: ['zero'] },
  { id: 'plants', ifc: { s: you, v: 'water', o: 'plants', neg: true }, main: { s: S.they, v: 'die' }, types: ['zero'] },
  { id: 'exercise', ifc: { s: np('people', true), v: 'exercise', o: 'regularly' }, main: { s: S.they, v: 'tend', o: 'to live longer' }, types: ['zero'] },
  { id: 'button', ifc: { s: you, v: 'press', o: 'this button' }, main: { s: np('the machine', false), v: 'stop', o: 'immediately' }, types: ['zero', 'first'] },
  { id: 'lake', ifc: { s: np('the temperature', false), v: 'drop', o: 'below zero' }, main: { s: np('the lake', false), v: 'freeze' }, types: ['zero', 'first', 'second', 'third'] },
  { id: 'train', ifc: { s: S.we, v: 'leave', o: 'right away' }, main: { s: S.we, v: 'catch', o: 'the last train' }, types: ['first', 'second', 'third'] },
  { id: 'exam', ifc: { s: S.she, v: 'study', o: 'harder' }, main: { s: S.she, v: 'pass', o: 'the exam' }, types: ['first', 'second', 'third'] },
  { id: 'renewables', ifc: { s: np('the company', false, 'it'), v: 'invest', o: 'in renewable energy' }, main: { s: S.it, v: 'save', o: 'money in the long run' }, types: ['first', 'second', 'third'] },
  { id: 'prices', ifc: { s: np('the shop', false, 'it'), v: 'lower', o: 'its prices' }, main: { s: S.it, v: 'sell', o: 'more' }, types: ['first', 'second', 'third'] },
  { id: 'rain', ifc: { s: S.it, v: 'rain', o: 'on Saturday' }, main: { s: S.we, v: 'hold', o: 'the party indoors' }, types: ['first', 'second'] },
  { id: 'dubai', ifc: { s: S.he, v: 'take', o: 'the job in Dubai' }, main: { s: S.he, v: 'earn', o: 'twice as much' }, types: ['first', 'second', 'third'] },
  { id: 'book', ifc: { s: S.we, v: 'book', o: 'earlier' }, main: { s: S.we, v: 'get', o: 'a better price' }, types: ['first', 'second', 'third'] },
  { id: 'taxes', ifc: { s: np('the government', false, 'it'), v: 'raise', o: 'taxes' }, main: { s: np('consumers', true), v: 'spend', o: 'less' }, types: ['first', 'second', 'third'] },
  { id: 'final', ifc: { s: np('the team', false, 'they'), v: 'win', o: 'on Sunday' }, main: { s: S.they, v: 'qualify', o: 'for the final' }, types: ['first', 'second'] },
  { id: 'act', ifc: { s: S.we, v: 'act', o: 'quickly', neg: true }, main: { s: np('the situation', false), v: 'get', o: 'worse' }, types: ['first', 'second'] },
  { id: 'hurry', ifc: { s: you, v: 'hurry', neg: true }, main: { s: you, v: 'miss', o: 'the beginning of the film' }, types: ['first'] },
  { id: 'piano', ifc: { s: S.I, v: 'have', o: 'more free time' }, main: { s: S.I, v: 'learn', o: 'to play the piano' }, types: ['second'] },
  { id: 'were-you', ifc: { s: S.I, v: 'be', o: 'you' }, main: { s: S.I, v: 'accept', o: 'the offer' }, types: ['second'] },
  { id: 'lottery', ifc: { s: S.they, v: 'win', o: 'the lottery' }, main: { s: S.they, v: 'travel', o: 'around the world' }, types: ['second'] },
  { id: 'number', ifc: { s: S.I, v: 'know', o: 'her number' }, main: { s: S.I, v: 'call', o: 'her' }, types: ['second', 'third'] },
  { id: 'driver', ifc: { s: np('the driver', false, 'he'), v: 'be', o: 'so tired', neg: true }, main: { s: np('the accident', false), v: 'happen', neg: true }, types: ['third'] },
  { id: 'alarm', ifc: { s: S.I, v: 'hear', o: 'the alarm' }, main: { s: S.I, v: 'arrive', o: 'on time' }, types: ['third'] },
  { id: 'warned', ifc: { s: np('someone', false, 'they'), v: 'warn', o: 'us' }, main: { s: S.we, v: 'cancel', o: 'the trip' }, types: ['third'] },
  { id: 'flight', ifc: { s: S.I, v: 'miss', o: 'the flight', neg: true }, main: { s: S.I, v: 'be', o: 'in Rome now' }, types: ['mixed-past-present'] },
  { id: 'google', ifc: { s: S.she, v: 'accept', o: 'the offer from Google' }, main: { s: S.she, v: 'live', o: 'in California now' }, types: ['mixed-past-present'] },
  { id: 'medicine', ifc: { s: S.he, v: 'study', o: 'medicine' }, main: { s: S.he, v: 'be', o: 'a doctor today' }, types: ['mixed-past-present'] },
  { id: 'organised', ifc: { s: S.he, v: 'be', o: 'more organised' }, main: { s: S.he, v: 'forget', o: 'the meeting yesterday', neg: true }, types: ['mixed-present-past'] },
  { id: 'german', ifc: { s: S.I, v: 'speak', o: 'German' }, main: { s: S.I, v: 'apply', o: 'for that job last year' }, types: ['mixed-present-past'] },
  { id: 'shy', ifc: { s: S.she, v: 'be', o: 'so shy', neg: true }, main: { s: S.she, v: 'speak', o: 'at the meeting last night' }, types: ['mixed-present-past'] },
];

/** Unreal past: wish / if only / it's time / would rather. */
export interface WishPresentFrame {
  s: Subject;
  v: string;
  o: string;
  /** True if the REAL situation is negative ("I don't have a car"). */
  realNeg: boolean;
  modal?: 'can';
}

export const WISH_PRESENT: WishPresentFrame[] = [
  { s: S.I, v: 'have', o: 'a car', realNeg: true },
  { s: S.I, v: 'live', o: 'so far from the office', realNeg: false },
  { s: S.she, v: 'speak', o: 'Mandarin', realNeg: true },
  { s: S.we, v: 'have', o: 'more time to prepare', realNeg: true },
  { s: np('my brother', false, 'he'), v: 'drive', o: '', realNeg: true, modal: 'can' },
  { s: S.I, v: 'be', o: 'so busy this week', realNeg: false },
  { s: S.they, v: 'know', o: 'the answer', realNeg: true },
  { s: S.he, v: 'work', o: 'at weekends', realNeg: false },
  { s: S.I, v: 'play', o: 'a musical instrument', realNeg: true, modal: 'can' },
];

export interface WishPastFrame {
  s: Subject;
  v: string;
  o: string;
  realNeg: boolean;
}

export const WISH_PAST: WishPastFrame[] = [
  { s: S.I, v: 'go', o: 'to the conference', realNeg: true },
  { s: S.I, v: 'say', o: 'that to my boss', realNeg: false },
  { s: S.we, v: 'buy', o: 'that old house', realNeg: false },
  { s: S.she, v: 'listen', o: 'to her lawyer', realNeg: true },
  { s: S.they, v: 'take', o: 'the earlier train', realNeg: true },
  { s: S.I, v: 'study', o: 'harder at school', realNeg: true },
  { s: S.he, v: 'sell', o: 'his shares so early', realNeg: false },
  { s: S.I, v: 'tell', o: 'her the truth', realNeg: true },
];

export interface ItsTimeFrame {
  s: Subject;
  v: string;
  o: string;
}

export const ITS_TIME: ItsTimeFrame[] = [
  { s: S.we, v: 'leave', o: '' },
  { s: S.you, v: 'start', o: 'revising for your exams' },
  { s: np('the government', false, 'it'), v: 'do', o: 'something about air pollution' },
  { s: S.I, v: 'look', o: 'for a new job' },
  { s: np('the company', false, 'it'), v: 'update', o: 'its website' },
  { s: S.they, v: 'replace', o: 'that old boiler' },
];

export interface RatherFrame {
  other: Subject;
  v: string;
  o: string;
  neg: boolean;
}

export const WOULD_RATHER: RatherFrame[] = [
  { other: S.you, v: 'smoke', o: 'in here', neg: true },
  { other: S.you, v: 'come', o: 'with me', neg: false },
  { other: S.they, v: 'tell', o: 'anyone yet', neg: true },
  { other: S.she, v: 'stay', o: 'at our house', neg: false },
  { other: S.you, v: 'pay', o: 'by bank transfer', neg: false },
  { other: S.he, v: 'drive', o: 'in this weather', neg: true },
];
