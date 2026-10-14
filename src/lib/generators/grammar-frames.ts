import { makeFrameGenerator } from './frames';
import { MODAL_FRAMES } from '@content/data/frames/modals';
import { DEDUCTION_FRAMES } from '@content/data/frames/deduction';
import { VERB_PATTERN_FRAMES } from '@content/data/frames/verb-patterns';
import { QUANTIFIER_FRAMES } from '@content/data/frames/quantifiers';
import { PRONOUN_FRAMES } from '@content/data/frames/pronouns';
import { ADJECTIVE_FRAMES } from '@content/data/frames/adjectives';
import { ADVERB_FRAMES } from '@content/data/frames/adverbs';
import { RELATIVE_FRAMES } from '@content/data/frames/relatives';
import { LINKER_FRAMES } from '@content/data/frames/linkers';
import { INVERSION_FRAMES } from '@content/data/frames/inversion';
import { CLEFT_FRAMES } from '@content/data/frames/cleft';
import { QUESTION_FRAMES } from '@content/data/frames/questions';
import { ACADEMIC_FRAMES } from '@content/data/frames/academic';

/** Frame generators for the grammar units that have no table-driven generator. */
export const modalsGenerator = makeFrameGenerator({
  key: 'modals',
  title: 'Obligation, permission and ability',
  topic: 'modals',
  ref: '5.1',
  frames: MODAL_FRAMES,
  examTags: ['EsPCEx', 'AFA', 'EFOMM', 'EN', 'ENEM', 'CAE'],
});

export const deductionGenerator = makeFrameGenerator({
  key: 'modals-deduction',
  title: 'Deduction, semi-modals and past modals',
  topic: 'modals-deduction',
  ref: '6.1',
  frames: DEDUCTION_FRAMES,
  examTags: ['CAE', 'CPE', 'ITA', 'IME', 'EsPCEx', 'TOEFL'],
});

export const verbPatternsGenerator = makeFrameGenerator({
  key: 'verb-patterns',
  title: 'Gerund or infinitive?',
  topic: 'verb-patterns',
  ref: '11.1',
  frames: VERB_PATTERN_FRAMES,
  examTags: ['CAE', 'TOEFL', 'ITA', 'IME', 'EsPCEx', 'AFA'],
  gapRate: 0.5,
});

export const quantifiersGenerator = makeFrameGenerator({
  key: 'quantifiers',
  title: 'Quantifiers',
  topic: 'quantifiers',
  ref: '15.1',
  frames: QUANTIFIER_FRAMES,
  examTags: ['CAE', 'IELTS', 'ITA', 'EsPCEx', 'ENEM'],
});

export const pronounsGenerator = makeFrameGenerator({
  key: 'pronouns',
  title: 'Pronouns, it and there',
  topic: 'pronouns',
  ref: '16.1',
  frames: PRONOUN_FRAMES,
  examTags: ['TOEFL', 'ITA', 'IME', 'EsPCEx', 'ENEM'],
});

export const adjectivesGenerator = makeFrameGenerator({
  key: 'adjectives',
  title: 'Adjectives and comparison',
  topic: 'adjectives',
  ref: '17.4',
  frames: ADJECTIVE_FRAMES,
  examTags: ['CAE', 'IELTS', 'ITA', 'EsPCEx', 'ENEM'],
  gapRate: 0.5,
});

export const adverbsGenerator = makeFrameGenerator({
  key: 'adverbs',
  title: 'Adverbs and intensifiers',
  topic: 'adverbs',
  ref: '18.4',
  frames: ADVERB_FRAMES,
  examTags: ['CAE', 'TOEFL', 'ITA', 'EsPCEx', 'ENEM'],
  gapRate: 0.5,
});

export const relativesGenerator = makeFrameGenerator({
  key: 'relative-clauses',
  title: 'Relative clauses',
  topic: 'relative-clauses',
  ref: '20.1',
  frames: RELATIVE_FRAMES,
  examTags: ['CAE', 'TOEFL', 'ITA', 'IME', 'EsPCEx', 'ENEM'],
});

export const linkersGenerator = makeFrameGenerator({
  key: 'linkers',
  title: 'Linking words',
  topic: 'linkers',
  ref: '21.4',
  frames: LINKER_FRAMES,
  examTags: ['CAE', 'IELTS', 'TOEFL', 'ITA', 'EsPCEx', 'ENEM'],
});

export const inversionGenerator = makeFrameGenerator({
  key: 'inversion',
  title: 'Inversion and emphasis',
  topic: 'inversion',
  ref: '23.1',
  frames: INVERSION_FRAMES,
  examTags: ['CAE', 'CPE', 'ITA', 'IME', 'EsPCEx', 'AFA'],
});

export const cleftGenerator = makeFrameGenerator({
  key: 'cleft-ellipsis',
  title: 'Clefts, fronting, ellipsis and substitution',
  topic: 'cleft-ellipsis',
  ref: '24.1',
  frames: CLEFT_FRAMES,
  examTags: ['CAE', 'CPE', 'ITA', 'IME', 'IELTS', 'EsPCEx'],
});

export const questionsGenerator = makeFrameGenerator({
  key: 'questions-agreement',
  title: 'Tags, questions and agreement',
  topic: 'questions-agreement',
  ref: '25.1',
  frames: QUESTION_FRAMES,
  examTags: ['EsPCEx', 'AFA', 'EFOMM', 'EN', 'ITA', 'IME', 'CAE'],
});

export const academicGenerator = makeFrameGenerator({
  key: 'academic-punctuation',
  title: 'Hedging, academic style and punctuation',
  topic: 'academic-punctuation',
  ref: '29.1',
  frames: ACADEMIC_FRAMES,
  examTags: ['IELTS', 'TOEFL', 'CAE', 'ITA', 'IME', 'ENEM'],
});

export const FRAME_SETS = {
  modals: MODAL_FRAMES,
  'modals-deduction': DEDUCTION_FRAMES,
  'verb-patterns': VERB_PATTERN_FRAMES,
  quantifiers: QUANTIFIER_FRAMES,
  pronouns: PRONOUN_FRAMES,
  adjectives: ADJECTIVE_FRAMES,
  adverbs: ADVERB_FRAMES,
  'relative-clauses': RELATIVE_FRAMES,
  linkers: LINKER_FRAMES,
  inversion: INVERSION_FRAMES,
  'cleft-ellipsis': CLEFT_FRAMES,
  'questions-agreement': QUESTION_FRAMES,
  'academic-punctuation': ACADEMIC_FRAMES,
} as const;

export const FRAME_GENERATORS = [
  modalsGenerator,
  deductionGenerator,
  verbPatternsGenerator,
  quantifiersGenerator,
  pronounsGenerator,
  adjectivesGenerator,
  adverbsGenerator,
  relativesGenerator,
  linkersGenerator,
  inversionGenerator,
  cleftGenerator,
  questionsGenerator,
  academicGenerator,
];
