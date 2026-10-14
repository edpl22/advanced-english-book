import { describe, expect, it } from 'vitest';
import {
  articlesGenerator,
  collocationsGenerator,
  confusablesGenerator,
  falseFriendsGenerator,
  nounsGenerator,
  prepositionsGenerator,
  wordFormationGenerator,
} from './vocab';
import {
  adjCollocationRowItem,
  articleRowItem,
  collocationRowItem,
  confusableRowItem,
  falseFriendRowItem,
  pluralRowItem,
  prepositionRowItem,
  uncountableRowItem,
  wordFormationSentenceItem,
  wordFormationDrillItem,
} from './vocab';
import type { Item as AnyItem } from '../schema';
import { lexiconGenerator, gapExample, realOrFake, similarTo, lexiconItem } from './lexicon';
import { WORD_FAMILIES } from '@content/data/word-families';
import { ARTICLES, COLLOCATIONS, CONFUSABLES, FALSE_FRIENDS, PLURALS, PREPOSITIONS, UNCOUNTABLES, ADJ_COLLOCATIONS } from '@content/data/tables';
import { LEXICON } from '@content/lexicon';
import { assertUniformAnswers, assertValidItem, sweep } from './testkit';
import { checkItem } from '../checking';
import { Rng } from '../rng';
import { normalize } from '../checking/normalize';

describe('word families', () => {
  it('every sentence has exactly one gap', () => {
    for (const f of WORD_FAMILIES) for (const s of f.sentences) expect(s.text.split('___').length, s.text).toBe(2);
  });

  it('answers are derived forms listed in the family', () => {
    for (const f of WORD_FAMILIES) {
      const all = new Set([...Object.values(f.forms).flat(), ...(f.negative ?? [])].map((x) => x!.toLowerCase()));
      for (const s of f.sentences) for (const a of s.answer) {
        const base = a.toLowerCase().replace(/s$/, '');
        expect(all.has(a.toLowerCase()) || all.has(base), `${f.stem}: ${a}`).toBe(true);
      }
    }
  });

  it.each([
    ['decision', 'The board will announce its final ___ on Friday.'],
    ['unemployment', 'Rising ___ has pushed thousands of families into poverty.'],
    ['unreliable', 'The old bus service was so ___ that people stopped using it.'],
    ['pronunciation', 'Her ___ of Portuguese place names is excellent.'],
  ])('golden: %s', (answer, text) => {
    const fam = WORD_FAMILIES.find((f) => f.sentences.some((s) => s.text === text))!;
    expect(fam.sentences.find((s) => s.text === text)!.answer).toContain(answer);
  });

  it('a misspelt form is "almost"; a different form is wrong', () => {
    const items = Array.from({ length: 300 }, (_, i) => wordFormationGenerator.generate(i));
    const it = items.find((x) => x.type === 'word-formation' && x.acceptedAnswers[0] === 'pronunciation')!;
    expect(it).toBeDefined();
    expect(checkItem(it, 'pronunciaton').verdict).toBe('almost');
    expect(checkItem(it, 'pronounciation').verdict).toBe('almost');
    expect(checkItem(it, 'pronounce').verdict).toBe('incorrect');
  });

  it('sweeps 300 seeds', () => {
    sweep(wordFormationGenerator, 300);
  });
});

describe('tables', () => {
  it('plural distractors are never correct plurals', () => {
    for (const p of PLURALS) for (const w of p.wrong) expect(p.plurals, p.singular).not.toContain(w);
  });

  it('each uncountable row has an a/an that matches the adjective', () => {
    for (const u of UNCOUNTABLES) {
      const vowelSound = /^[aeio]/i.test(u.adj) || (/^u/i.test(u.adj) && !/^u(s|ni)/i.test(u.adj));
      expect(u.art, u.adj).toBe(vowelSound ? 'an' : 'a');
    }
  });

  it('article frames contain one gap', () => {
    for (const a of ARTICLES) expect(a.frame.split('___').length).toBe(2);
  });

  it('preposition rows never exclude an accepted answer', () => {
    for (const p of PREPOSITIONS) for (const x of p.exclude ?? []) expect(p.accepted).not.toContain(x);
  });

  it('collocation wrong options are never accepted ones', () => {
    for (const c of COLLOCATIONS) {
      const acc = [c.answer, ...(c.also ?? [])];
      for (const w of c.wrong) expect(acc, c.frame).not.toContain(w);
      expect(c.wrong.length).toBeGreaterThanOrEqual(3);
    }
    for (const c of ADJ_COLLOCATIONS) for (const w of c.options) expect([c.answer, ...(c.also ?? [])]).not.toContain(w);
  });

  it('false friends: wrong options differ from correct ones', () => {
    for (const f of FALSE_FRIENDS) for (const w of f.wrong) expect(f.correct.map((c) => normalize(c))).not.toContain(normalize(w));
  });

  it('confusables have four distinct options', () => {
    for (const c of CONFUSABLES) expect(new Set(c.options).size).toBe(4);
  });
});

describe('vocabulary generators', () => {
  it.each([
    ['nouns', nounsGenerator],
    ['articles', articlesGenerator],
    ['prepositions', prepositionsGenerator],
    ['collocations', collocationsGenerator],
    ['false friends', falseFriendsGenerator],
    ['confusables', confusablesGenerator],
  ] as const)('%s sweeps 300 seeds', (_n, g) => {
    assertUniformAnswers(sweep(g, 300));
  });

  it('prepositions: "on" is not accepted for "interested ___"', () => {
    const items = Array.from({ length: 400 }, (_, i) => prepositionsGenerator.generate(i));
    const gap = items.find((x) => x.type === 'gap' && x.prompt.startsWith('She has always been interested'))!;
    expect(checkItem(gap, 'in').verdict).toBe('correct');
    expect(checkItem(gap, 'on').verdict).toBe('incorrect');
  });

  it('articles: the "no article" option is offered', () => {
    const it = articlesGenerator.generate(3);
    if (it.type === 'mcq') expect(it.options).toContain('– (no article)');
  });
});

describe('lexicon', () => {
  it('has at least 100 entries in batch 001', () => {
    expect(LEXICON.length).toBeGreaterThanOrEqual(100);
  });

  it('words are unique', () => {
    expect(new Set(LEXICON.map((e) => e.word)).size).toBe(LEXICON.length);
  });

  it('every example contains its headword', () => {
    for (const e of LEXICON) expect(gapExample(e), e.word).not.toBeNull();
  });

  it('IPA is written between slashes', () => {
    for (const e of LEXICON) expect(e.ipa, e.word).toMatch(/^\/.+\/$/);
  });

  it('fake definitions differ from the real one', () => {
    for (const e of LEXICON) for (const f of e.fakes) expect(f).not.toBe(e.def);
  });

  it('similar words are grouped both ways', () => {
    expect(similarTo('fracas').has('kerfuffle')).toBe(true);
    expect(similarTo('kerfuffle').has('fracas')).toBe(true);
  });

  it('Real or Fake keeps the answer index right', () => {
    const r = realOrFake(new Rng(7), LEXICON[0]);
    expect(r.options[r.answer]).toBe(LEXICON[0].def);
    expect(r.options).toHaveLength(3);
  });

  it('every entry yields valid items of every kind', () => {
    for (const e of LEXICON) for (let s = 0; s < 8; s++) assertValidItem(lexiconItem(new Rng(s), e, `x-${e.word}-${s}`));
  });

  it('never offers a similar word as a distractor', () => {
    for (let i = 0; i < 400; i++) {
      const it = lexiconGenerator.generate(i);
      if (it.type !== 'mcq') continue;
      const correct = it.options[it.answer];
      if (!LEXICON.some((e) => e.word === correct)) continue;
      const sim = similarTo(correct);
      it.options.forEach((o, k) => {
        if (k !== it.answer) expect(sim.has(o), `${correct} vs ${o}`).toBe(false);
      });
    }
  });

  it('sweeps 400 seeds', () => {
    assertUniformAnswers(sweep(lexiconGenerator, 400));
  });
});

// ── Per-row golden tests (every table row is a test case) ───────────────

function correctText(it: AnyItem): string {
  if (it.type === 'mcq') return it.options[it.answer];
  if ('acceptedAnswers' in it) return it.acceptedAnswers[0];
  return '';
}

describe('golden rows: plurals (nouns generator)', () => {
  it.each(PLURALS.map((r) => [r.singular, r] as const))('%s', (_s, row) => {
    for (const seed of [1, 2, 3, 4]) {
      const it = pluralRowItem(new Rng(seed), row, `p-${row.singular}-${seed}`);
      assertValidItem({ ...it });
      expect(row.plurals).toContain(correctText(it));
    }
  });
});

describe('golden rows: uncountables (nouns generator)', () => {
  it.each(UNCOUNTABLES.map((r) => [r.noun, r] as const))('%s', (_n, row) => {
    for (const kind of [1, 2, 3]) {
      const it = uncountableRowItem(new Rng(kind), row, `u-${row.noun}-${kind}`, kind);
      assertValidItem(it);
      if (kind === 1 && it.type === 'mcq') expect(it.options[it.answer]).toBe(`some ${row.adj} ${row.noun}`);
    }
  });
});

describe('golden rows: articles', () => {
  it.each(ARTICLES.map((r) => [r.frame, r] as const))('%s', (_f, row) => {
    const it = articleRowItem(new Rng(9), row, 'a');
    assertValidItem(it);
    expect(correctText(it)).toBe(row.answer === 'the' ? 'the' : '– (no article)');
  });
});

describe('golden rows: dependent prepositions', () => {
  it.each(PREPOSITIONS.map((r) => [r.frame, r] as const))('%s', (_f, row) => {
    for (const seed of [1, 2, 3, 4, 5, 6]) {
      const it = prepositionRowItem(new Rng(seed), row, 'x');
      assertValidItem(it);
      expect(row.accepted).toContain(correctText(it));
      if (it.type === 'gap') for (const a of row.accepted) expect(checkItem(it, a).verdict).toBe('correct');
    }
  });
});

describe('golden rows: collocations', () => {
  it.each(COLLOCATIONS.map((r) => [r.frame, r] as const))('%s', (_f, row) => {
    const it = collocationRowItem(new Rng(3), row, 'c');
    assertValidItem(it);
    expect(correctText(it)).toBe(row.answer);
  });
  it.each(ADJ_COLLOCATIONS.map((r) => [r.frame, r] as const))('%s', (_f, row) => {
    const it = adjCollocationRowItem(new Rng(3), row, 'c');
    assertValidItem(it);
    expect(correctText(it)).toBe(row.answer);
  });
});

describe('golden rows: false friends', () => {
  it.each(FALSE_FRIENDS.map((r) => [r.pt, r] as const))('%s', (_p, row) => {
    const it = falseFriendRowItem(new Rng(5), row, 'f');
    assertValidItem(it);
    expect(normalize(correctText(it))).toBe(normalize(row.correct[0]));
  });
});

describe('golden rows: confusables', () => {
  it.each(CONFUSABLES.map((r) => [r.frame, r] as const))('%s', (_f, row) => {
    const it = confusableRowItem(new Rng(5), row, 'k');
    assertValidItem(it);
    expect(correctText(it)).toBe(row.options[row.answer]);
  });
});

describe('golden rows: word formation', () => {
  const rows = WORD_FAMILIES.flatMap((f) => f.sentences.map((s) => [`${f.stem}: ${s.text}`, f, s] as const));
  it.each(rows)('%s', (_n, fam, s) => {
    const it = wordFormationSentenceItem(fam, s, 'w');
    assertValidItem(it);
    if (it.type === 'word-formation') {
      expect(it.cue).toBe(fam.stem);
      expect(checkItem(it, s.answer[0]).verdict).toBe('correct');
      expect(checkItem(it, fam.stem.toLowerCase()).verdict).not.toBe('correct');
    }
  });
  it.each(WORD_FAMILIES.map((f) => [f.stem, f] as const))('drill %s', (_s, fam) => {
    assertValidItem(wordFormationDrillItem(new Rng(2), fam, 'd'));
  });
});

describe('golden rows: lexicon', () => {
  it.each(LEXICON.map((e) => [e.word, e] as const))('%s', (_w, e) => {
    const g = gapExample(e)!;
    expect(g).toContain('___');
    const r = realOrFake(new Rng(1), e);
    expect(r.options[r.answer]).toBe(e.def);
  });
});
