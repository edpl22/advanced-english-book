import { WORD_FAMILIES, type WordClass } from '@content/data/word-families';
import {
  ADJ_COLLOCATIONS,
  ARTICLES,
  COLLOCATIONS,
  CONFUSABLES,
  COUNTABLE_HOW,
  FALSE_FRIENDS,
  PLURALS,
  PREP_POOL,
  PREPOSITIONS,
  UNCOUNTABLES,
} from '@content/data/tables';
import { Rng } from '../rng';
import type { Item } from '../schema';
import { buildGap, buildMcq, genId, type Generator, type ItemMeta } from './core';
import { capitalize } from './conjugate';

const DIFF = { B1: 2, B2: 3, C1: 4, C2: 5 } as const;

// ── Word formation ──────────────────────────────────────────────────────

const CLASS_NAME: Record<WordClass, string> = {
  noun: 'noun',
  person: 'noun for a person',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
};

export function wordFormationItem(rng: Rng, id: string): Item {
  const fam = rng.pick(WORD_FAMILIES);
  const useSentence = rng.chance(0.7) || Object.keys(fam.forms).length < 2;
  if (useSentence) return wordFormationSentenceItem(fam, rng.pick(fam.sentences), id);
  return wordFormationDrillItem(rng, fam, id);
}

export function wordFormationSentenceItem(fam: (typeof WORD_FAMILIES)[number], s: (typeof WORD_FAMILIES)[number]['sentences'][number], id: string): Item {
  {
    return buildGap(
      id,
      s.text,
      s.answer,
      {
        level: s.level,
        difficulty: DIFF[s.level],
        topic: 'word-formation',
        ref: '26.1',
        skill: 'use-of-english',
        explanation: `${fam.stem} → ${s.answer[0]}: ${s.note}.`,
        examTags: ['CAE', 'CPE', 'IELTS', 'ITA', 'IME'],
        instruction: 'Use the word in capitals to form a word that fits the gap. You must change its form.',
      },
      { cue: fam.stem, type: 'word-formation' },
    );
  }
}

export function wordFormationDrillItem(rng: Rng, fam: (typeof WORD_FAMILIES)[number], id: string): Item {
  const classes = (Object.keys(fam.forms) as WordClass[]).filter((c) => (fam.forms[c] ?? []).length > 0 && fam.forms[c]![0] !== fam.stem.toLowerCase());
  const cls = rng.pick(classes.length ? classes : (Object.keys(fam.forms) as WordClass[]));
  const answers = fam.forms[cls]!;
  return buildGap(
    id,
    `The ${CLASS_NAME[cls]} formed from “${fam.stem.toLowerCase()}” is ___.`,
    answers,
    {
      level: 'B2',
      difficulty: 2,
      topic: 'word-formation',
      ref: '26.1',
      skill: 'vocabulary',
      explanation: `${fam.stem}: ${(Object.keys(fam.forms) as WordClass[]).map((c) => `${CLASS_NAME[c]} ${fam.forms[c]!.join(' / ')}`).join('; ')}${fam.negative ? `; opposites: ${fam.negative.join(', ')}` : ''}.`,
      examTags: ['CAE', 'IELTS'],
      instruction: 'Write the word of the class indicated. Any correct form is accepted.',
    },
    { cue: CLASS_NAME[cls], type: 'word-formation' },
  );
}

export const wordFormationGenerator: Generator = {
  key: 'word-formation',
  title: 'Word formation',
  topic: 'word-formation',
  ref: '26.1',
  generate: (seed) => wordFormationItem(new Rng(seed), genId('word-formation', seed)),
};

// ── Nouns: plurals and countability ─────────────────────────────────────

function nounsItem(rng: Rng, id: string): Item {
  const kind = rng.int(4);
  if (kind === 0) return pluralRowItem(rng, rng.pick(PLURALS), id);
  return uncountableRowItem(rng, rng.pick(UNCOUNTABLES), id, kind);
}

export function pluralRowItem(rng: Rng, row: (typeof PLURALS)[number], id: string): Item {
  {
    const meta: ItemMeta = {
      level: row.level,
      difficulty: DIFF[row.level],
      topic: 'nouns',
      ref: '12.3',
      skill: 'vocabulary',
      explanation: `${row.singular} → ${row.plurals.join(' / ')} (${row.note}).`,
      examTags: ['TOEFL', 'IELTS', 'ITA'],
    };
    if (rng.chance(0.5)) {
      return buildGap(id, `One ${row.singular}, two ___.`, row.plurals, { ...meta, instruction: 'Write the plural.' }, { cue: 'plural' });
    }
    return buildMcq(rng, id, `What is the plural of “${row.singular}”?`, row.plurals[0], row.wrong, row.plurals, { ...meta, instruction: 'Choose the correct plural.' });
  }
}

export function uncountableRowItem(rng: Rng, row: (typeof UNCOUNTABLES)[number], id: string, kind: number): Item {
  const meta: ItemMeta = {
    level: 'B2',
    difficulty: 3,
    topic: 'nouns',
    ref: '12.1',
    explanation: `“${row.noun}” is uncountable in English: no a/an, no plural, use some / much / a piece of. Para falantes de português: ${row.pt}.`,
    examTags: ['TOEFL', 'ENEM', 'EsPCEx', 'EFOMM'],
  };
  if (kind === 1) {
    const correct = `some ${row.adj} ${row.noun}`;
    const plural = /s$/.test(row.noun) ? `${row.noun}es` : `${row.noun}s`;
    const wrong = [`${row.art} ${row.adj} ${row.noun}`, `${row.adj} ${plural}`, `many ${row.adj} ${plural}`, `a few ${row.adj} ${row.noun}`];
    return buildMcq(rng, id, row.frame, correct, wrong, [correct, `${row.adj} ${row.noun}`], { ...meta, instruction: 'Choose the correct option.' });
  }
  if (kind === 2 && row.units.length && row.unitFrame) {
    return buildGap(id, row.unitFrame, row.units, { ...meta, ref: '12.4', instruction: 'Complete with a word that makes the uncountable noun countable.' }, { noAlmost: true });
  }
  if (row.howFrame && rng.chance(0.6)) {
    return buildMcq(rng, id, row.howFrame, 'much', ['many', 'a lot', 'few'], ['much'], { ...meta, instruction: 'Choose the correct quantifier.' });
  }
  const c = rng.pick(COUNTABLE_HOW);
  return buildMcq(rng, id, c.frame, 'many', ['much', 'a lot', 'lot'], ['many'], {
    ...meta,
    explanation: `How many + plural countable noun (${c.note}); how much + uncountable noun.`,
    instruction: 'Choose the correct quantifier.',
  });
}

export const nounsGenerator: Generator = {
  key: 'nouns',
  title: 'Plurals, countable and uncountable nouns',
  topic: 'nouns',
  ref: '12.1',
  generate: (seed) => nounsItem(new Rng(seed), genId('nouns', seed)),
};

// ── Articles ────────────────────────────────────────────────────────────

const NO_ARTICLE = '– (no article)';

function articlesItem(rng: Rng, id: string): Item {
  return articleRowItem(rng, rng.pick(ARTICLES), id);
}

export function articleRowItem(rng: Rng, row: (typeof ARTICLES)[number], id: string): Item {
  const correct = row.answer === 'the' ? 'the' : NO_ARTICLE;
  const options = ['the', 'a', 'an', NO_ARTICLE];
  return buildMcq(rng, id, row.frame, correct, options.filter((o) => o !== correct), [correct], {
    level: row.level,
    difficulty: DIFF[row.level],
    topic: 'articles',
    ref: '14.2',
    explanation: `Rule: ${row.rule}.`,
    examTags: ['TOEFL', 'ENEM', 'EsPCEx', 'AFA', 'EFOMM'],
    instruction: 'Choose the article (or no article).',
  });
}

export const articlesGenerator: Generator = {
  key: 'articles',
  title: 'Articles with names and general nouns',
  topic: 'articles',
  ref: '14.2',
  generate: (seed) => articlesItem(new Rng(seed), genId('articles', seed)),
};

// ── Dependent prepositions ──────────────────────────────────────────────

function prepositionsItem(rng: Rng, id: string): Item {
  return prepositionRowItem(rng, rng.pick(PREPOSITIONS), id);
}

export function prepositionRowItem(rng: Rng, row: (typeof PREPOSITIONS)[number], id: string): Item {
  const meta: ItemMeta = {
    level: row.level,
    difficulty: DIFF[row.level],
    topic: 'prepositions',
    ref: '19.3',
    explanation: `${row.head} + ${row.accepted.join(' / ')}.`,
    examTags: ['TOEFL', 'IELTS', 'ENEM', 'EsPCEx', 'EN'],
  };
  if (rng.chance(0.5)) {
    return buildGap(id, row.frame, row.accepted, { ...meta, instruction: 'Complete with the correct preposition.' }, { noAlmost: true });
  }
  const wrong = PREP_POOL.filter((p) => !row.accepted.includes(p) && !(row.exclude ?? []).includes(p));
  return buildMcq(rng, id, row.frame, row.accepted[0], wrong, row.accepted, { ...meta, instruction: 'Choose the correct preposition.' });
}

export const prepositionsGenerator: Generator = {
  key: 'prepositions',
  title: 'Dependent prepositions',
  topic: 'prepositions',
  ref: '19.3',
  generate: (seed) => prepositionsItem(new Rng(seed), genId('prepositions', seed)),
};

// ── Collocations ────────────────────────────────────────────────────────

function collocationsItem(rng: Rng, id: string): Item {
  if (rng.chance(0.65)) return collocationRowItem(rng, rng.pick(COLLOCATIONS), id);
  return adjCollocationRowItem(rng, rng.pick(ADJ_COLLOCATIONS), id);
}

export function collocationRowItem(rng: Rng, row: (typeof COLLOCATIONS)[number], id: string): Item {
  {
    const accepted = [row.answer, ...(row.also ?? [])];
    const meta: ItemMeta = {
      level: row.level,
      difficulty: DIFF[row.level],
      topic: 'collocations',
      ref: '27.1',
      skill: 'vocabulary',
      explanation: `Collocation: ${row.note}.`,
      examTags: ['CAE', 'IELTS', 'TOEFL', 'ENEM'],
    };
    return buildMcq(rng, id, row.frame, row.answer, row.wrong, accepted, { ...meta, instruction: 'Choose the verb that collocates with the noun.' });
  }
}

export function adjCollocationRowItem(rng: Rng, row: (typeof ADJ_COLLOCATIONS)[number], id: string): Item {
  return buildMcq(rng, id, row.frame, row.answer, row.options, [row.answer, ...(row.also ?? [])], {
    level: row.level,
    difficulty: DIFF[row.level],
    topic: 'collocations',
    ref: '27.2',
    skill: 'vocabulary',
    explanation: `Collocation: ${row.note}.`,
    examTags: ['CAE', 'CPE', 'IELTS'],
    instruction: 'Choose the word that collocates naturally.',
  });
}

export const collocationsGenerator: Generator = {
  key: 'collocations',
  title: 'Collocations',
  topic: 'collocations',
  ref: '27.1',
  generate: (seed) => collocationsItem(new Rng(seed), genId('collocations', seed)),
};

// ── False friends and confusables ───────────────────────────────────────

function falseFriendsItem(rng: Rng, id: string): Item {
  return falseFriendRowItem(rng, rng.pick(FALSE_FRIENDS), id);
}

export function falseFriendRowItem(rng: Rng, row: (typeof FALSE_FRIENDS)[number], id: string): Item {
  const startsSentence = row.frame.startsWith('___');
  const fix = (w: string) => (startsSentence ? capitalize(w) : w);
  return buildMcq(rng, id, row.frame, fix(row.correct[0]), row.wrong.map(fix), row.correct.map(fix), {
    level: row.level,
    difficulty: DIFF[row.level],
    topic: 'false-friends',
    ref: '28.1',
    skill: 'vocabulary',
    explanation: `${row.pt} → ${row.correct.join(' / ')}.${row.falseMeaning ? ` Cuidado: “${row.falseFriend}” = ${row.falseMeaning}.` : ''}`,
    examTags: ['ENEM', 'FUVEST', 'EsPCEx', 'AFA', 'EFOMM'],
    instruction: 'Choose the correct English word for the Portuguese word in brackets.',
  });
}

export const falseFriendsGenerator: Generator = {
  key: 'false-friends',
  title: 'False friends (Portuguese–English)',
  topic: 'false-friends',
  ref: '28.1',
  generate: (seed) => falseFriendsItem(new Rng(seed), genId('false-friends', seed)),
};

function confusablesItem(rng: Rng, id: string): Item {
  return confusableRowItem(rng, rng.pick(CONFUSABLES), id);
}

export function confusableRowItem(rng: Rng, row: (typeof CONFUSABLES)[number], id: string): Item {
  const correct = row.options[row.answer];
  return buildMcq(rng, id, row.frame, correct, row.options.filter((_, i) => i !== row.answer), [correct], {
    level: row.level,
    difficulty: DIFF[row.level],
    topic: 'confusables',
    ref: '28.2',
    skill: 'vocabulary',
    explanation: row.note + '.',
    examTags: ['TOEFL', 'IELTS', 'ENEM', 'EsPCEx'],
    instruction: 'Choose the correct word.',
  });
}

export const confusablesGenerator: Generator = {
  key: 'confusables',
  title: 'Confusable words',
  topic: 'confusables',
  ref: '28.2',
  generate: (seed) => confusablesItem(new Rng(seed), genId('confusables', seed)),
};
