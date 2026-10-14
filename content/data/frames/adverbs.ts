import type { Frame } from '../../../src/lib/generators/frames';

/** Unit 18 — adverbs. */
export const ADVERB_FRAMES: Frame[] = [
  // Adjective → adverb (with cue)
  { ref: '18.4', level: 'B1', text: '{f} sings ___.', cue: 'beautiful', answer: ['beautifully'], wrong: ['beautiful', 'beauty', 'beautifuly'], note: 'Adverb of manner: -ly.' },
  { ref: '18.4', level: 'B1', text: '{m} drives very ___.', cue: 'careful', answer: ['carefully'], wrong: ['careful', 'carefuly', 'care'], note: 'Adverb of manner: -ly.' },
  { ref: '18.4', level: 'B1', text: 'They worked ___ all year and passed every exam.', cue: 'hard', answer: ['hard'], wrong: ['hardly', 'harder than', 'hardness'], note: 'hard = with effort (hardly = almost not).' },
  { ref: '18.3', level: 'B1', text: 'I can ___ hear you — the line is terrible.', cue: 'hard', answer: ['hardly'], wrong: ['hard', 'not hardly', 'harder'], note: 'hardly = almost not.' },
  { ref: '18.4', level: 'B1', text: 'Have you been to the cinema ___?', cue: 'late', answer: ['lately'], wrong: ['late', 'later', 'latest'], note: 'lately = recently.' },
  { ref: '18.4', level: 'B1', text: 'The train arrived ___, so we missed the meeting.', cue: 'late', answer: ['late'], wrong: ['lately', 'latest', 'latter'], note: 'late = after the expected time.' },
  { ref: '18.4', level: 'B1', text: 'Speak ___ — the baby is asleep.', cue: 'quiet', answer: ['quietly'], wrong: ['quiet', 'quieter than', 'quite'], note: 'Adverb of manner.' },
  { ref: '18.4', level: 'B1', text: 'The soup smells ___.', cue: 'delicious', answer: ['delicious'], wrong: ['deliciously', 'delicacy', 'more deliciously'], note: 'Linking verb + adjective.' },
  { ref: '18.4', level: 'B1', text: 'You look ___ in that dress.', cue: 'beautiful', answer: ['beautiful'], wrong: ['beautifully', 'beauty', 'beautify'], note: 'look + adjective.' },
  { ref: '18.4', level: 'B1', text: '___, nobody was hurt in the accident.', cue: 'fortunate', answer: ['Fortunately'], wrong: ['Fortunate', 'Fortune', 'Fortunateness'], note: 'Sentence adverb.' },
  { ref: '18.2', level: 'B2', text: 'The driver was ___ injured in the crash.', cue: 'serious', answer: ['seriously'], wrong: ['serious', 'seriousness', 'seriosly'], note: 'seriously injured.' },
  { ref: '18.2', level: 'B2', text: 'This method is ___ used in Brazilian hospitals.', cue: 'wide', answer: ['widely'], wrong: ['wide', 'width', 'widen'], note: 'widely used.' },
  { ref: '18.4', level: 'B1', text: '{f} speaks English ___.', cue: 'good', answer: ['well'], wrong: ['good', 'goodly', 'better than'], note: 'The adverb of good is well.' },
  { ref: '18.4', level: 'B2', text: 'The town is ___ fifty kilometres from the coast.', cue: 'near', answer: ['nearly'], wrong: ['near', 'nearby', 'nearer'], note: 'nearly = almost.' },
  { ref: '18.4', level: 'B2', text: 'The director will be with you ___.', cue: 'short', answer: ['shortly'], wrong: ['short', 'shorter', 'shortness'], note: 'shortly = soon.' },
  { ref: '18.4', level: 'B2', text: 'The audience was ___ made up of students.', cue: 'most', answer: ['mostly'], wrong: ['most', 'mostest', 'the most'], note: 'mostly = mainly.' },
  { ref: '18.2', level: 'B2', text: 'I ___ disagree with the new policy.', cue: 'strong', answer: ['strongly'], wrong: ['strong', 'strength', 'stronger'], note: 'strongly disagree.' },
  { ref: '18.2', level: 'B2', text: 'We were ___ disappointed with the hotel.', cue: 'bitter', answer: ['bitterly'], wrong: ['bitter', 'bitterness', 'bitterer'], note: 'bitterly disappointed.' },
  { ref: '18.2', level: 'B2', text: 'This restaurant is ___ recommended by the critics.', cue: 'high', answer: ['highly'], wrong: ['high', 'height', 'higher'], note: 'highly recommended.' },
  { ref: '18.2', level: 'B2', text: 'The flight was ___ delayed — only ten minutes.', cue: 'slight', answer: ['slightly'], wrong: ['slight', 'slighter', 'slightness'], note: 'slightly = a little.' },
  { ref: '18.2', level: 'B2', text: '{f} was ___ moved by the letter.', cue: 'deep', answer: ['deeply'], wrong: ['deep', 'depth', 'deeper'], note: 'deeply moved.' },
  { ref: '18.4', level: 'B1', text: 'The team played ___ in the final.', cue: 'brilliant', answer: ['brilliantly'], wrong: ['brilliant', 'brilliance', 'brilliantlly'], note: 'Adverb of manner.' },
  { ref: '18.4', level: 'B2', text: '___, the shop has closed down.', cue: 'apparent', answer: ['Apparently'], wrong: ['Apparent', 'Appearance', 'Apparence'], note: 'Sentence adverb: apparently = it seems.' },
  // Position
  { ref: '18.1', level: 'B1', text: 'I ___ late for work.', answer: ['am never', 'am rarely', 'am seldom', 'am often', 'am always', 'am sometimes', 'am usually'], wrong: ['never am', 'am late never', 'never'], note: 'Frequency adverbs go after be.' },
  { ref: '18.1', level: 'B1', text: '{f} ___ to the gym on {day}s.', answer: ['always goes', 'usually goes', 'often goes', 'never goes', 'sometimes goes'], wrong: ['goes always', 'always go', 'is always go'], note: 'Frequency adverb before the main verb.' },
  { ref: '18.1', level: 'B1', text: 'I like ___.', answer: ['football very much'], wrong: ['very much football', 'football much very', 'much very football'], note: 'Never put an adverb between a verb and its object.' },
  { ref: '18.1', level: 'B1', text: '{m} speaks ___.', answer: ['English very well'], wrong: ['very well English', 'English well very', 'well English very'], note: 'Object before the adverb.' },
  { ref: '18.1', level: 'B2', text: 'They ___ been abroad.', answer: ['have never'], wrong: ['have not never', 'have ever not', 'not have ever'], note: 'never after the first auxiliary.' },
  { ref: '18.1', level: 'B2', text: 'She ___ come to the party — she’s working that night.', answer: ['probably won’t'], wrong: ['won’t probably', 'probably will', 'will probably not to'], note: 'probably before won’t.' },
  { ref: '18.1', level: 'B2', text: 'The film ___ started — sit down quickly!', answer: ['has just'], wrong: ['just has', 'has yet', 'yet has'], note: 'just between have and the past participle.' },
  // Intensifiers, so / such / too / enough
  { ref: '18.2', level: 'B1', text: 'The coffee was ___ hot to drink.', answer: ['too'], wrong: ['so', 'very', 'enough'], gap: true, note: 'too + adjective + to-infinitive.' },
  { ref: '18.2', level: 'B1', text: 'Is the room warm ___?', answer: ['enough'], wrong: ['too', 'so', 'very'], gap: true, note: 'adjective + enough.' },
  { ref: '18.2', level: 'B2', text: 'It was ___ a long journey that we slept on the bus.', answer: ['such'], wrong: ['so', 'too', 'very'], gap: true, note: 'such a + adjective + noun.' },
  { ref: '18.2', level: 'B1', text: 'The concert was ___ good that we went again.', answer: ['so'], wrong: ['such', 'too', 'such a'], gap: true, note: 'so + adjective + that.' },
  { ref: '18.2', level: 'B2', text: 'I’m ___ aware of the risks, thank you.', answer: ['fully', 'perfectly', 'well'], wrong: ['full', 'fullness', 'fill'], note: 'fully aware.' },
  { ref: '18.2', level: 'B1', text: 'The exam was easy ___ for everyone to pass.', answer: ['enough'], wrong: ['too', 'so', 'such'], gap: true, note: 'adjective + enough + for + to-infinitive.' },
  // Hardly, barely, scarcely
  { ref: '18.3', level: 'B2', text: 'We ___ ever eat out these days.', answer: ['hardly', 'barely', 'scarcely'], wrong: ['hard', 'nearly', 'almost not'], gap: true, note: 'hardly ever = almost never.' },
  { ref: '18.3', level: 'B2', text: 'I ___ slept last night — the neighbours were having a party.', answer: ['hardly', 'barely', 'scarcely'], wrong: ['hard', 'nearly not', 'not hardly'], gap: true, note: 'hardly = almost not.' },
  { ref: '18.3', level: 'B2', text: 'I ___ believe it — it’s amazing!', answer: ['can hardly', 'can barely', 'can scarcely', 'can’t', 'cannot'], wrong: ['can’t hardly', 'can hard', 'hardly can not'], note: 'No double negative: can hardly.' },
  // Sentence adverbs and false friends
  { ref: '18.4', level: 'B2', text: '___ I live in Recife, but I’m moving to Natal next year.', answer: ['Currently', 'At the moment', 'At present', 'Right now', 'Now'], wrong: ['Actually', 'Actual', 'Eventually'], note: '“Atualmente” = currently (actually = in fact).' },
  { ref: '18.4', level: 'B2', text: 'He spoke to me in a very ___ way.', cue: 'friend', answer: ['friendly'], wrong: ['friend', 'friendship', 'friends'], note: 'friendly is an adjective: in a friendly way.' },
];
