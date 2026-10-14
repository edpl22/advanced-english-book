import type { Frame } from '../../../src/lib/generators/frames';
import type { LevelT } from '../../../src/lib/schema';

/**
 * Unit 11 — verb patterns. Each frame names the verb in brackets; the four
 * forms (infinitive without to, to-infinitive, -ing, to + -ing) are built
 * from the pair [base, -ing] so that the distractors are always the other
 * forms of the same verb.
 */
type Kind = 'ing' | 'to' | 'bare';
const FORMS = (v: [string, string]) => ({ bare: v[0], to: `to ${v[0]}`, ing: v[1], toIng: `to ${v[1]}` });

function vp(ref: string, level: LevelT, text: string, verb: [string, string], kind: Kind, note: string, extra: string[] = []): Frame {
  const f = FORMS(verb);
  const answer = [f[kind], ...extra];
  const wrong = [f.bare, f.to, f.ing, f.toIng].filter((x) => !answer.includes(x));
  return { ref, level, text, cue: verb[0], answer, wrong, note };
}

export const VERB_PATTERN_FRAMES: Frame[] = [
  // verb + -ing
  vp('11.1', 'B1', 'I really enjoy ___ in the sea.', ['swim', 'swimming'], 'ing', 'enjoy + -ing.'),
  vp('11.1', 'B1', 'Try to avoid ___ in the rush hour.', ['drive', 'driving'], 'ing', 'avoid + -ing.'),
  vp('11.1', 'B1', 'Would you mind ___ the door?', ['close', 'closing'], 'ing', 'mind + -ing.'),
  vp('11.1', 'B1', 'Have you finished ___ the report yet?', ['write', 'writing'], 'ing', 'finish + -ing.'),
  vp('11.1', 'B2', 'We’re considering ___ to {city}.', ['move', 'moving'], 'ing', 'consider + -ing.'),
  vp('11.3', 'B2', 'He denied ___ the documents.', ['take', 'taking'], 'ing', 'deny + -ing (or having + past participle).', ['having taken']),
  vp('11.3', 'B2', '{f} admitted ___ a mistake.', ['make', 'making'], 'ing', 'admit + -ing (or having + past participle).', ['having made']),
  vp('11.1', 'B2', 'She suggested ___ a taxi to the airport.', ['take', 'taking'], 'ing', 'suggest + -ing (never suggest + to-infinitive).'),
  vp('11.1', 'B1', 'He kept ___ me while I was working.', ['interrupt', 'interrupting'], 'ing', 'keep + -ing = continue / repeat.'),
  vp('11.1', 'B2', 'I miss ___ my grandmother’s cooking.', ['eat', 'eating'], 'ing', 'miss + -ing.'),
  vp('11.1', 'B2', 'If you don’t book now, you risk ___ the concert.', ['miss', 'missing'], 'ing', 'risk + -ing.'),
  vp('11.1', 'B2', 'They have postponed ___ a decision until May.', ['make', 'making'], 'ing', 'postpone + -ing.'),
  vp('11.1', 'B1', 'I can’t stand ___ in queues.', ['wait', 'waiting'], 'ing', 'can’t stand + -ing.'),
  vp('11.1', 'B2', 'It’s no use ___ — the shop is already closed.', ['complain', 'complaining'], 'ing', 'It’s no use + -ing.'),
  vp('11.1', 'B2', 'The cathedral is well worth ___.', ['visit', 'visiting'], 'ing', 'worth + -ing.'),
  vp('11.1', 'B1', 'I’m looking forward to ___ you next week.', ['see', 'seeing'], 'ing', 'look forward to + -ing (to is a preposition).'),
  vp('11.1', 'B2', '{m} is used to ___ at night.', ['work', 'working'], 'ing', 'be used to + -ing.'),
  vp('11.1', 'B1', 'Are you interested in ___ the choir?', ['join', 'joining'], 'ing', 'preposition + -ing.'),
  vp('11.1', 'B1', 'He left without ___ goodbye.', ['say', 'saying'], 'ing', 'without + -ing.'),
  vp('11.1', 'B1', 'Why don’t you walk instead of ___ the bus?', ['take', 'taking'], 'ing', 'instead of + -ing.'),
  vp('11.1', 'B2', 'You should practise ___ English every day.', ['speak', 'speaking'], 'ing', 'practise + -ing.'),
  vp('11.1', 'B1', '{f} gave up ___ two years ago.', ['smoke', 'smoking'], 'ing', 'give up + -ing.'),
  // verb + to-infinitive
  vp('11.1', 'B1', 'We decided ___ the train instead of flying.', ['take', 'taking'], 'to', 'decide + to-infinitive.'),
  vp('11.1', 'B1', 'I can’t afford ___ a new car.', ['buy', 'buying'], 'to', 'afford + to-infinitive.'),
  vp('11.1', 'B1', 'He refused ___ the contract.', ['sign', 'signing'], 'to', 'refuse + to-infinitive.'),
  vp('11.1', 'B1', 'Did you manage ___ tickets for the final?', ['get', 'getting'], 'to', 'manage + to-infinitive.'),
  vp('11.1', 'B1', '{f} promised ___ me back later.', ['call', 'calling'], 'to', 'promise + to-infinitive.'),
  vp('11.1', 'B1', 'He offered ___ me to the airport.', ['drive', 'driving'], 'to', 'offer + to-infinitive.'),
  vp('11.1', 'B1', 'We hope ___ you again soon.', ['see', 'seeing'], 'to', 'hope + to-infinitive.'),
  vp('11.1', 'B1', 'They’re planning ___ round Chile next year.', ['travel', 'travelling'], 'to', 'plan + to-infinitive.'),
  vp('11.3', 'B2', 'The new system seems ___ well.', ['work', 'working'], 'to', 'seem + to-infinitive (or continuous infinitive).', ['to be working']),
  vp('11.1', 'B2', 'He pretended ___ asleep when I came in.', ['be', 'being'], 'to', 'pretend + to-infinitive.'),
  vp('11.1', 'B2', 'The government failed ___ its promises.', ['keep', 'keeping'], 'to', 'fail + to-infinitive.'),
  vp('11.1', 'B2', 'People tend ___ more when they are stressed.', ['eat', 'eating'], 'to', 'tend + to-infinitive.'),
  vp('11.1', 'B1', 'I’d like ___ a table for four, please.', ['book', 'booking'], 'to', 'would like + to-infinitive.'),
  vp('11.1', 'B1', 'They agreed ___ the costs.', ['share', 'sharing'], 'to', 'agree + to-infinitive.'),
  vp('11.1', 'B2', 'We’ve arranged ___ outside the station.', ['meet', 'meeting'], 'to', 'arrange + to-infinitive.'),
  vp('11.1', 'B2', 'The workers threatened ___ on strike.', ['go', 'going'], 'to', 'threaten + to-infinitive.'),
  vp('11.4', 'B2', 'I want you ___ me the truth.', ['tell', 'telling'], 'to', 'want + object + to-infinitive.'),
  vp('11.4', 'B2', 'Our teacher encouraged us ___ for the scholarship.', ['apply', 'applying'], 'to', 'encourage + object + to-infinitive.'),
  vp('11.4', 'B2', 'The guide warned us not ___ the water.', ['drink', 'drinking'], 'to', 'warn + object + not to-infinitive.'),
  // infinitive without to
  vp('11.4', 'B1', 'The teacher made us ___ the whole essay.', ['rewrite', 'rewriting'], 'bare', 'make + object + infinitive without to.'),
  vp('11.4', 'B1', 'My parents let me ___ the car at weekends.', ['borrow', 'borrowing'], 'bare', 'let + object + infinitive without to.'),
  vp('11.4', 'B1', 'You’d better ___ now, or you’ll be late.', ['leave', 'leaving'], 'bare', 'had better + infinitive without to.'),
  vp('11.4', 'B2', 'I’d rather ___ at home tonight.', ['stay', 'staying'], 'bare', 'would rather + infinitive without to.'),
  vp('11.4', 'B2', 'I saw him ___ the road and get on the bus.', ['cross', 'crossing'], 'bare', 'see + object + infinitive (the whole action).'),
  // verbs that change meaning
  vp('11.2', 'B2', 'He stopped ___ when the doctor warned him about his lungs.', ['smoke', 'smoking'], 'ing', 'stop + -ing = give up.'),
  vp('11.2', 'B2', 'Halfway to {city}, we stopped ___ petrol.', ['buy', 'buying'], 'to', 'stop + to-infinitive = stop in order to.'),
  vp('11.2', 'B1', 'Remember ___ the door when you leave.', ['lock', 'locking'], 'to', 'remember + to-infinitive: a duty.'),
  vp('11.2', 'B2', 'I remember ___ him at a party years ago.', ['meet', 'meeting'], 'ing', 'remember + -ing: a memory.', ['having met']),
  vp('11.2', 'B1', 'Don’t forget ___ your passport.', ['bring', 'bringing'], 'to', 'forget + to-infinitive: a duty.'),
  vp('11.2', 'B2', 'I’ll never forget ___ the Pantanal for the first time.', ['see', 'seeing'], 'ing', 'never forget + -ing: a memory.'),
  vp('11.2', 'C1', 'We regret ___ you that the course has been cancelled.', ['inform', 'informing'], 'to', 'regret + to-infinitive: formal bad news.'),
  vp('11.2', 'B2', 'I didn’t mean ___ you.', ['upset', 'upsetting'], 'to', 'mean + to-infinitive = intend.'),
  vp('11.2', 'C1', 'Taking the job would mean ___ abroad for two years.', ['live', 'living'], 'ing', 'mean + -ing = involve.'),
  vp('11.2', 'C1', 'The windows need ___.', ['clean', 'cleaning'], 'ing', 'need + -ing has a passive meaning.', ['to be cleaned']),
  // perfect infinitive
  {
    ref: '11.3', level: 'C1', text: 'He claims ___ the president when he was young.', cue: 'meet',
    answer: ['to have met'], wrong: ['to meet', 'meeting', 'having met'], note: 'An earlier action: perfect infinitive.',
  },
  {
    ref: '11.3', level: 'C1', text: '{f} seems ___ her keys — she’s looking everywhere.', cue: 'lose',
    answer: ['to have lost'], wrong: ['to lose', 'losing', 'lose'], note: 'An earlier action: perfect infinitive.',
  },
  {
    ref: '11.3', level: 'C1', text: 'I would love ___ the concert, but I was ill.', cue: 'see',
    answer: ['to have seen'], wrong: ['seeing', 'to see', 'having seen'], note: 'Unfulfilled past wish: would love + perfect infinitive.',
  },
];
