/**
 * Table of contents of the whole book. Units marked `ready` have full
 * content; the others are announced with their planned sections and the
 * phase in which they will be delivered.
 */
export interface TocUnit {
  number: number;
  id: string;
  title: string;
  sections: string[];
  ready: boolean;
  phase: number;
}

export interface TocPart {
  part: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  title: string;
  units: TocUnit[];
}

const u = (number: number, title: string, sections: string[], ready = false, phase = 2): TocUnit => ({
  number,
  id: `u${String(number).padStart(2, '0')}`,
  title,
  sections,
  ready,
  phase,
});

export const TOC: TocPart[] = [
  {
    part: 'I',
    title: 'Verbs and Tenses',
    units: [
      u(1, 'Present and past: simple and continuous', ['Present simple and continuous', 'Past simple and continuous', 'Habits: used to, would, be used to', 'Stative verbs and verbs with two meanings'], true),
      u(2, 'The perfect tenses', ['Present perfect vs past simple', 'For, since, already, yet, still', 'Present perfect continuous', 'Finished and unfinished time'], true),
      u(3, 'Narrative tenses', ['Past simple, past continuous, past perfect', 'Past perfect continuous', 'Sequencing a story', 'Flashbacks and unfulfilled plans'], true),
      u(4, 'The future', ['Will, going to, present continuous', 'Prediction and evidence', 'Present simple for timetables', 'Future continuous, perfect and perfect continuous; be about to, be due to', 'Future in the past'], true),
      u(5, 'Modal verbs I: obligation, permission, ability', ['Must, have to, need to', 'Can, could, be able to', 'May, might, be allowed to', 'Obligation, permission and ability in the past'], true),
      u(6, 'Modal verbs II: deduction and semi-modals', ['Deduction in the present', 'Deduction in the past: must have, can’t have, might have', 'Need, dare, ought to, had better, be supposed to', 'Criticism and regret: should have, could have, might have'], true),
      u(7, 'Conditionals', ['Real conditionals: zero and first', 'Unreal conditionals: second and third', 'Mixed conditionals', 'Alternatives to if', 'Inversion in conditional sentences', 'Special uses of will, would, should and were to'], true, 1),
      u(8, 'Unreal past and the subjunctive', ['Wish and if only', 'It’s (high) time, would rather, as if', 'The mandative subjunctive', 'Fixed subjunctive expressions'], true),
      u(9, 'The passive and causative', ['The passive in all tenses', 'Verbs with two objects', 'Have / get something done', 'Reporting verbs in the passive'], true),
      u(10, 'Reported speech', ['Backshift, pronouns and time expressions', 'Reported questions', 'Reported orders, requests and advice', 'Reporting verbs and their patterns'], true),
      u(11, 'Verb patterns', ['Gerund or infinitive?', 'Verbs that change meaning: stop, remember, forget, try, regret, mean, go on', 'Perfect and continuous infinitives', 'Verb + object + infinitive; make, let, help; verbs of perception'], true),
    ],
  },
  {
    part: 'II',
    title: 'Nouns and the Noun Phrase',
    units: [
      u(12, 'Countable and uncountable nouns; plurals', ['Uncountable nouns', 'Nouns with both uses', 'Irregular plurals and Latin and Greek plurals', 'Making uncountable nouns countable'], true),
      u(13, 'The noun phrase', ['Collective nouns and agreement (BrE/AmE)', 'Compound nouns', 'Possessive ’s or of', 'Nominalisation in academic writing'], true),
      u(14, 'Articles and determiners', ['A/an, the and zero article', 'The with geographical names and institutions', 'Determiners', 'Generalisations and fixed phrases'], true),
      u(15, 'Quantifiers', ['Few, a few, little, a little', 'Each, every, either, neither', 'All, whole, both, none', 'Much, many, a lot of, plenty of; most; enough'], true),
      u(16, 'Pronouns', ['Reflexive and reciprocal pronouns', 'One and ones', 'It or there', 'Indefinite and generic pronouns'], true),
    ],
  },
  {
    part: 'III',
    title: 'Modifiers and Connections',
    units: [
      u(17, 'Adjectives and comparison', ['Order of adjectives', 'Gradable and non-gradable adjectives', '-ed and -ing adjectives', 'Advanced comparison: the more…, far/much + comparative'], true),
      u(18, 'Adverbs', ['Position of adverbs', 'Intensifiers', 'Hardly, barely, scarcely', 'Adjective or adverb?'], true),
      u(19, 'Prepositions', ['Time and place', 'Prepositions after adjectives and verbs', 'Dependent prepositions after nouns', 'Prepositional phrases and prepositions at the end'], true),
      u(20, 'Relative clauses', ['Defining and non-defining', 'Whose, whom, preposition + which', 'Reduced relative clauses', 'What as a relative'], true),
      u(21, 'Linking words and discourse markers', ['Contrast and concession', 'Cause and consequence', 'Addition', 'Despite, in spite of, although, even though, whereas, nevertheless'], true),
    ],
  },
  {
    part: 'IV',
    title: 'Phrasal Verbs',
    units: [u(22, 'Phrasal verbs', ['What is a phrasal verb?', 'Word order and pronouns', 'Particles and their core meanings', 'Phrasal verbs by theme', 'Register: phrasal verbs and formal equivalents', 'Three-part verbs'], true, 1)],
  },
  {
    part: 'V',
    title: 'Sentence-Level Grammar',
    units: [
      u(23, 'Inversion and emphasis', ['Negative and limiting adverbials', 'Not only…but also; no sooner…than; hardly…when', 'Only then, not until, little did…', 'Conditional inversion; so, such, neither and nor', 'Emphasis without inversion'], true, 3),
      u(24, 'Cleft sentences, fronting, ellipsis and substitution', ['It-clefts', 'Wh-clefts and other focusing structures', 'Fronting', 'Ellipsis and substitution (so, not, do so, one)'], true, 3),
      u(25, 'Questions, tags and agreement', ['Question tags', 'Subject and object questions; prepositions; negative questions', 'Indirect questions', 'Subject–verb agreement in difficult cases'], true, 3),
    ],
  },
  {
    part: 'VI',
    title: 'Vocabulary and Word Knowledge',
    units: [
      u(26, 'Word formation', ['Noun suffixes', 'Adjective and adverb suffixes', 'Prefixes', 'Changing word class'], true, 3),
      u(27, 'Collocations and idioms', ['Verb + noun: make, do, have, take and others', 'Adjective + noun and adverb + adjective', 'Idioms for exams', 'Fixed phrases and binomials'], true, 3),
      u(28, 'False friends and confusable words', ['Portuguese–English false friends', 'Confusable pairs', 'False friends in formal and academic English', 'Confusable spellings'], true, 3),
      u(29, 'Academic language, hedging and punctuation', ['Hedging', 'Academic style', 'Commas, semicolons and colons', 'Apostrophes and capital letters'], true, 3),
    ],
  },
];

export const ALL_TOC_UNITS = TOC.flatMap((p) => p.units.map((u) => ({ ...u, part: p.part, partTitle: p.title })));

export function tocUnit(id: string) {
  return ALL_TOC_UNITS.find((x) => x.id === id);
}

/** Section number → unit id ("7.2" → "u07"). */
export function unitIdForRef(ref: string): string | null {
  const m = /^(\d+)\./.exec(ref);
  return m ? `u${m[1].padStart(2, '0')}` : null;
}
