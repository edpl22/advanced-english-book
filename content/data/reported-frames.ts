import type { Tense } from '../../src/lib/generators/conjugate';

/**
 * Data for the reported-speech generator. Possessives and object pronouns
 * inside complements are written as tokens ({my}, {our}, {me}, {us}, {your})
 * so that the generator can shift them with the subject.
 */

export interface Speaker {
  name: string;
  pron: 'he' | 'she';
}

export const SPEAKERS: Speaker[] = [
  { name: 'Laura', pron: 'she' },
  { name: 'Marcos', pron: 'he' },
  { name: 'The CEO', pron: 'she' },
  { name: 'My tutor', pron: 'he' },
  { name: 'Ana', pron: 'she' },
  { name: 'The pilot', pron: 'he' },
];

/** Time and place expressions and their reported equivalents (first = canonical). */
export const ADVERBS: Record<string, string[]> = {
  today: ['that day'],
  tonight: ['that night'],
  tomorrow: ['the next day', 'the following day', 'the day after'],
  yesterday: ['the day before', 'the previous day'],
  now: ['then', 'at that moment', 'at that time'],
  'this week': ['that week'],
  'next month': ['the following month', 'the next month', 'the month after'],
  'last year': ['the previous year', 'the year before'],
  'two days ago': ['two days before', 'two days earlier'],
  here: ['there'],
};

export type QuoteTense = Extract<
  Tense,
  'present-simple' | 'present-continuous' | 'present-perfect' | 'present-perfect-continuous' | 'past-simple' | 'will' | 'going-to'
> | 'can' | 'must' | 'may';

export interface StatementFrame {
  subj: 'I' | 'we';
  tense: QuoteTense;
  v: string;
  o: string;
  adv?: keyof typeof ADVERBS;
}

export const STATEMENTS: StatementFrame[] = [
  { subj: 'I', tense: 'present-continuous', v: 'work', o: 'from home', adv: 'today' },
  { subj: 'I', tense: 'will', v: 'send', o: 'you the figures', adv: 'tomorrow' },
  { subj: 'we', tense: 'present-perfect', v: 'finish', o: 'the first phase of the project' },
  { subj: 'I', tense: 'past-simple', v: 'meet', o: 'the new investors', adv: 'yesterday' },
  { subj: 'I', tense: 'can', v: 'speak', o: 'four languages' },
  { subj: 'we', tense: 'going-to', v: 'open', o: 'a new branch in Curitiba', adv: 'next month' },
  { subj: 'I', tense: 'present-simple', v: 'live', o: 'near the airport' },
  { subj: 'I', tense: 'must', v: 'leave', o: 'early', adv: 'tonight' },
  { subj: 'we', tense: 'present-perfect-continuous', v: 'wait', o: 'for an answer for weeks' },
  { subj: 'I', tense: 'may', v: 'be', o: 'a little late' },
  { subj: 'I', tense: 'past-simple', v: 'lose', o: '{my} passport', adv: 'two days ago' },
  { subj: 'we', tense: 'present-simple', v: 'need', o: 'more time to analyse the data' },
  { subj: 'I', tense: 'present-continuous', v: 'stay', o: 'at a hotel', adv: 'this week' },
  { subj: 'I', tense: 'will', v: 'call', o: 'the supplier', adv: 'now' },
  { subj: 'we', tense: 'past-simple', v: 'sell', o: 'more cars than ever', adv: 'last year' },
  { subj: 'I', tense: 'present-perfect', v: 'never / see', o: 'such a good presentation' },
];

export interface QuestionFrame {
  wh: string | null;
  tense: Extract<Tense, 'present-simple' | 'present-continuous' | 'present-perfect' | 'past-simple' | 'will'> | 'can';
  v: string;
  o: string;
  adv?: keyof typeof ADVERBS;
}

/** Questions asked to "me"; "you" becomes "I" in the reported version. */
export const QUESTIONS: QuestionFrame[] = [
  { wh: 'where', tense: 'present-simple', v: 'live', o: '' },
  { wh: 'what time', tense: 'present-simple', v: 'finish', o: 'work' },
  { wh: 'why', tense: 'past-simple', v: 'leave', o: 'the company' },
  { wh: 'how long', tense: 'present-perfect', v: 'work', o: 'there' },
  { wh: null, tense: 'present-simple', v: 'speak', o: 'Spanish' },
  { wh: null, tense: 'can', v: 'drive', o: 'a lorry' },
  { wh: 'what', tense: 'present-continuous', v: 'read', o: '' },
  { wh: null, tense: 'past-simple', v: 'see', o: 'the match', adv: 'yesterday' },
  { wh: 'when', tense: 'will', v: 'know', o: 'the results' },
  { wh: null, tense: 'present-perfect', v: 'finish', o: 'the report' },
  { wh: 'how much', tense: 'past-simple', v: 'pay', o: 'for the flat' },
  { wh: 'who', tense: 'present-simple', v: 'work', o: 'for' },
];

export interface CommandFrame {
  kind: 'ask' | 'tell' | 'warn' | 'remind' | 'advise';
  neg: boolean;
  /** Direct form, e.g. "Please close the door." */
  direct: string;
  v: string;
  o: string;
}

export const COMMANDS: CommandFrame[] = [
  { kind: 'ask', neg: false, direct: 'Could you close the door, please?', v: 'close', o: 'the door' },
  { kind: 'tell', neg: true, direct: "Don't touch the screen.", v: 'touch', o: 'the screen' },
  { kind: 'warn', neg: true, direct: "Don't leave your bag unattended.", v: 'leave', o: '{my} bag unattended' },
  { kind: 'remind', neg: false, direct: 'Remember to sign the form.', v: 'sign', o: 'the form' },
  { kind: 'advise', neg: false, direct: 'You should see a specialist.', v: 'see', o: 'a specialist' },
  { kind: 'tell', neg: false, direct: 'Wait outside, please.', v: 'wait', o: 'outside' },
  { kind: 'ask', neg: true, direct: 'Please don’t mention it to anyone.', v: 'mention', o: 'it to anyone' },
  { kind: 'advise', neg: true, direct: "If I were you, I wouldn't accept the offer.", v: 'accept', o: 'the offer' },
];

/** Reporting verbs and their patterns (authored items; the generator samples them). */
export interface ReportingVerbItem {
  verb: string;
  pattern: string;
  direct: string;
  /** Reported sentence with one ___ gap. */
  reported: string;
  accepted: string[];
  wrong: string[];
}

export const REPORTING_VERBS: ReportingVerbItem[] = [
  { verb: 'deny', pattern: 'deny + -ing', direct: '"I didn\'t take the money," said Paulo.', reported: 'Paulo denied ___ the money.', accepted: ['taking', 'having taken'], wrong: ['to take', 'take', 'to have taken'] },
  { verb: 'admit', pattern: 'admit + -ing', direct: '"Yes, I made a mistake in the calculations," said the analyst.', reported: 'The analyst admitted ___ a mistake in the calculations.', accepted: ['making', 'having made'], wrong: ['to make', 'make', 'to have made'] },
  { verb: 'urge', pattern: 'urge + object + to-infinitive', direct: '"You really must apply for the scholarship," my teacher said to me.', reported: 'My teacher urged me ___ for the scholarship.', accepted: ['to apply'], wrong: ['applying', 'apply', 'that I apply to'] },
  { verb: 'refuse', pattern: 'refuse + to-infinitive', direct: '"I won\'t sign the contract," said the supplier.', reported: 'The supplier refused ___ the contract.', accepted: ['to sign'], wrong: ['signing', 'sign', 'not to sign'] },
  { verb: 'offer', pattern: 'offer + to-infinitive', direct: '"I\'ll drive you to the station," said Clara.', reported: 'Clara offered ___ me to the station.', accepted: ['to drive'], wrong: ['driving', 'drive', 'me to drive'] },
  { verb: 'suggest', pattern: 'suggest + -ing / that…', direct: '"Let\'s postpone the launch," said the manager.', reported: 'The manager suggested ___ the launch.', accepted: ['postponing', 'that we postpone', 'that we should postpone', 'that they postpone', 'that they should postpone'], wrong: ['to postpone', 'us to postpone', 'postpone'] },
  { verb: 'apologise', pattern: 'apologise for + -ing', direct: '"I\'m sorry I missed the meeting," said Tiago.', reported: 'Tiago apologised ___ the meeting.', accepted: ['for missing', 'for having missed'], wrong: ['to miss', 'missing', 'for miss'] },
  { verb: 'accuse', pattern: 'accuse + object + of + -ing', direct: '"You leaked the documents!" the director said to Rui.', reported: 'The director accused Rui ___ the documents.', accepted: ['of leaking', 'of having leaked'], wrong: ['for leaking', 'to leak', 'of leak'] },
  { verb: 'insist', pattern: 'insist on + -ing', direct: '"I\'m paying for dinner, and that\'s final," said my uncle.', reported: 'My uncle insisted ___ for dinner.', accepted: ['on paying'], wrong: ['to pay', 'paying', 'in paying'] },
  { verb: 'threaten', pattern: 'threaten + to-infinitive', direct: '"If you don\'t pay, I\'ll call my lawyer," the landlord said.', reported: 'The landlord threatened ___ his lawyer if we didn\'t pay.', accepted: ['to call'], wrong: ['calling', 'us to call', 'of calling'] },
  { verb: 'promise', pattern: 'promise + to-infinitive', direct: '"I\'ll send the report by Friday," said Júlia.', reported: 'Júlia promised ___ the report by Friday.', accepted: ['to send', 'that she would send'], wrong: ['sending', 'send', 'to sending'] },
  { verb: 'warn', pattern: 'warn + object + (not) to-infinitive', direct: '"Don\'t open any attachments from unknown senders," the IT team told us.', reported: 'The IT team warned us ___ any attachments from unknown senders.', accepted: ['not to open'], wrong: ['to not opening', 'not opening', "don't open"] },
  { verb: 'congratulate', pattern: 'congratulate + object + on + -ing', direct: '"Well done on winning the award!" said the dean to Beatriz.', reported: 'The dean congratulated Beatriz ___ the award.', accepted: ['on winning', 'on having won'], wrong: ['for win', 'to win', 'about winning'] },
  { verb: 'recommend', pattern: 'recommend + -ing / that…', direct: '"You should book the tickets well in advance," the travel agent told us.', reported: 'The travel agent recommended ___ the tickets well in advance.', accepted: ['booking', 'that we book', 'that we should book'], wrong: ['us to booking', 'to book', 'book'] },
  { verb: 'blame', pattern: 'blame + object + for + -ing', direct: '"It\'s your fault we lost the client," Pedro said to Lucas.', reported: 'Pedro blamed Lucas ___ the client.', accepted: ['for losing', 'for having lost'], wrong: ['of losing', 'to lose', 'for lose'] },
  { verb: 'agree', pattern: 'agree + to-infinitive', direct: '"All right, I\'ll lend you the car," said my father.', reported: 'My father agreed ___ me the car.', accepted: ['to lend'], wrong: ['lending', 'for lending', 'lend'] },
  { verb: 'remind', pattern: 'remind + object + to-infinitive', direct: '"Don\'t forget to back up the files," Rita said to me.', reported: 'Rita reminded me ___ the files.', accepted: ['to back up'], wrong: ['backing up', 'of backing up', 'back up'] },
  { verb: 'regret', pattern: 'regret + -ing', direct: '"I wish I hadn\'t sold the shares," said the investor.', reported: 'The investor regretted ___ the shares.', accepted: ['selling', 'having sold'], wrong: ['to sell', 'sell', 'to have selling'] },
];
