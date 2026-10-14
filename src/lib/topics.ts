/**
 * Topic taxonomy shared by the book, the question bank, the generators and
 * the statistics. A topic key is stable: never rename one, add a new one.
 */
export const TOPICS = [
  'present-past',
  'perfect-tenses',
  'narrative-tenses',
  'future',
  'modals',
  'modals-deduction',
  'conditionals',
  'unreal-past',
  'passive',
  'reported-speech',
  'verb-patterns',
  'nouns',
  'noun-phrase',
  'articles',
  'quantifiers',
  'pronouns',
  'adjectives',
  'adverbs',
  'prepositions',
  'relative-clauses',
  'linkers',
  'phrasal-verbs',
  'inversion',
  'cleft-ellipsis',
  'questions-agreement',
  'word-formation',
  'collocations',
  'false-friends',
  'confusables',
  'academic-punctuation',
  'reading',
  'lexicon',
  'medieval',
] as const;

export type Topic = (typeof TOPICS)[number];

export interface TopicInfo {
  label: string;
  part: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'X';
  /** Unit number in the book (see content/units/toc.ts). */
  unit?: number;
}

export const TOPIC_INFO: Record<Topic, TopicInfo> = {
  'present-past': { label: 'Present and past tenses', part: 'I', unit: 1 },
  'perfect-tenses': { label: 'Perfect tenses', part: 'I', unit: 2 },
  'narrative-tenses': { label: 'Narrative tenses', part: 'I', unit: 3 },
  future: { label: 'The future', part: 'I', unit: 4 },
  modals: { label: 'Modal verbs', part: 'I', unit: 5 },
  'modals-deduction': { label: 'Deduction and semi-modals', part: 'I', unit: 6 },
  conditionals: { label: 'Conditionals', part: 'I', unit: 7 },
  'unreal-past': { label: 'Unreal past and subjunctive', part: 'I', unit: 8 },
  passive: { label: 'The passive and causative', part: 'I', unit: 9 },
  'reported-speech': { label: 'Reported speech', part: 'I', unit: 10 },
  'verb-patterns': { label: 'Verb patterns', part: 'I', unit: 11 },
  nouns: { label: 'Countable and uncountable nouns; plurals', part: 'II', unit: 12 },
  'noun-phrase': { label: 'The noun phrase', part: 'II', unit: 13 },
  articles: { label: 'Articles and determiners', part: 'II', unit: 14 },
  quantifiers: { label: 'Quantifiers', part: 'II', unit: 15 },
  pronouns: { label: 'Pronouns', part: 'II', unit: 16 },
  adjectives: { label: 'Adjectives and comparison', part: 'III', unit: 17 },
  adverbs: { label: 'Adverbs', part: 'III', unit: 18 },
  prepositions: { label: 'Prepositions', part: 'III', unit: 19 },
  'relative-clauses': { label: 'Relative clauses', part: 'III', unit: 20 },
  linkers: { label: 'Linking words and discourse markers', part: 'III', unit: 21 },
  'phrasal-verbs': { label: 'Phrasal verbs', part: 'IV', unit: 22 },
  inversion: { label: 'Inversion and emphasis', part: 'V', unit: 23 },
  'cleft-ellipsis': { label: 'Cleft sentences, ellipsis, substitution', part: 'V', unit: 24 },
  'questions-agreement': { label: 'Questions, tags and agreement', part: 'V', unit: 25 },
  'word-formation': { label: 'Word formation', part: 'VI', unit: 26 },
  collocations: { label: 'Collocations and idioms', part: 'VI', unit: 27 },
  'false-friends': { label: 'False friends', part: 'VI', unit: 28 },
  confusables: { label: 'Confusable words', part: 'VI', unit: 28 },
  'academic-punctuation': { label: 'Academic style and punctuation', part: 'VI', unit: 29 },
  reading: { label: 'Reading comprehension', part: 'X' },
  lexicon: { label: 'Rare nouns (Lexicon)', part: 'X' },
  medieval: { label: 'Old and Middle English', part: 'X' },
};

export const PART_TITLES: Record<TopicInfo['part'], string> = {
  I: 'Verbs and Tenses',
  II: 'Nouns and the Noun Phrase',
  III: 'Modifiers and Connections',
  IV: 'Phrasal Verbs',
  V: 'Sentence-Level Grammar',
  VI: 'Vocabulary and Word Knowledge',
  X: 'Beyond the Book',
};

export function topicLabel(t: string): string {
  return (TOPIC_INFO as Record<string, TopicInfo>)[t]?.label ?? t;
}
