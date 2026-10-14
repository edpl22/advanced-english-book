import { describe, expect, it } from 'vitest';
import {
  checkItem,
  containsKeyword,
  countWordsCambridge,
  expandContractions,
  levenshtein,
  matchText,
  normalize,
  answerText,
} from './index';
import type { Item } from '../schema';

const meta = {
  level: 'B2' as const,
  difficulty: 3,
  topics: ['conditionals' as const],
  skill: 'grammar' as const,
  examTags: [],
  source: 'authored' as const,
  ref: '7.1',
  explanation: 'x',
};

describe('normalize', () => {
  it.each([
    ['  had   known ', 'had known'],
    ['Had Known', 'had known'],
    ['had known.', 'had known'],
    ['had known!', 'had known'],
    ['had known ?', 'had known'],
    ['“had known”', '"had known"'.replace(/"/g, '')],
    ['didn’t go', "didn't go"],
    ['didn‘t go', "didn't go"],
    ['didnʼt go', "didn't go"],
    ['well–known', 'well-known'],
    ['If I had known, I would', 'if i had known i would'],
    ['cannot', 'can not'],
    ['Cannot', 'can not'],
    ['tab\tand\nnewline', 'tab and newline'],
    ['non breaking', 'non breaking'],
  ])('normalize(%j) = %j', (input, out) => {
    expect(normalize(input)).toBe(out);
  });

  it('keeps case when asked', () => {
    expect(normalize('The Hague', { caseSensitive: true })).toBe('The Hague');
  });

  it('keeps commas when asked', () => {
    expect(normalize('However, it failed.', { keepCommas: true })).toBe('however, it failed');
  });
});

describe('contractions', () => {
  it.each([
    ["don't", 'do not'],
    ["doesn't", 'does not'],
    ["didn't", 'did not'],
    ["isn't", 'is not'],
    ["aren't", 'are not'],
    ["wasn't", 'was not'],
    ["weren't", 'were not'],
    ["haven't", 'have not'],
    ["hasn't", 'has not'],
    ["hadn't", 'had not'],
    ["won't", 'will not'],
    ["shan't", 'shall not'],
    ["can't", 'can not'],
    ["couldn't", 'could not'],
    ["shouldn't", 'should not'],
    ["wouldn't", 'would not'],
    ["mustn't", 'must not'],
    ["needn't", 'need not'],
    ["i'm", 'i am'],
    ["you're", 'you are'],
    ["we've", 'we have'],
    ["they'll", 'they will'],
  ])('%s expands to %s', (c, full) => {
    expect(expandContractions(c)).toContain(full);
  });

  it("'d is ambiguous without context", () => {
    const v = expandContractions("i'd known");
    expect(v).toContain('i had known');
    expect(v).toContain('i would known');
  });

  it("'d respects the item context", () => {
    const v = expandContractions("i'd known", { d: 'had' });
    expect(v).toContain('i had known');
    expect(v).not.toContain('i would known');
  });

  it("'s can be is or has", () => {
    const v = expandContractions("she's left");
    expect(v).toContain('she has left');
    expect(v).toContain('she is left');
  });

  it("'s respects the item context", () => {
    expect(expandContractions("it's been", { s: 'has' })).not.toContain('it is been');
  });

  it('keeps the original form (possessive)', () => {
    expect(expandContractions("the manager's car")).toContain("the manager's car");
  });
});

describe('matchText', () => {
  it('accepts contractions both ways', () => {
    expect(matchText("wouldn't have gone", ['would not have gone']).match).toBe(true);
    expect(matchText('would not have gone', ["wouldn't have gone"]).match).toBe(true);
    expect(matchText("I'd have told", ['I would have told']).match).toBe(true);
  });

  it('accepts any of several answers', () => {
    expect(matchText('unless', ['if not', 'unless']).match).toBe(true);
    expect(matchText('provided', ['providing', 'provided', 'as long as']).match).toBe(true);
  });

  it('rejects a different tense', () => {
    expect(matchText('would go', ['would have gone']).match).toBe(false);
  });

  it('pins had via context', () => {
    expect(matchText("I'd known", ['I had known'], { contractions: { d: 'had' } }).match).toBe(true);
    expect(matchText("I'd known", ['I would known'], { contractions: { d: 'had' } }).match).toBe(false);
  });

  it('flags a spelling slip as almost', () => {
    const m = matchText('recieved', ['received']);
    expect(m.match).toBe(false);
    expect(m.almost).toEqual({ typed: 'recieved', expected: 'received' });
  });

  it('flags a slip inside a longer answer', () => {
    expect(matchText('had writen', ['had written']).almost).toBeTruthy();
  });

  it('never calls a different short word "almost"', () => {
    expect(matchText('on', ['in']).almost).toBeUndefined();
    expect(matchText('a', ['an']).almost).toBeUndefined();
  });

  it('never calls a real word form "almost" when it is known', () => {
    const known = new Set(['lives', 'lived']);
    expect(matchText('lives', ['lived'], { knownWords: known }).almost).toBeUndefined();
  });

  it('does not grade distance 2 as almost', () => {
    expect(matchText('recievd', ['received']).almost).toBeUndefined();
  });

  it('treats spacing slips as almost', () => {
    expect(matchText('alot', ['a lot']).almost).toBeTruthy();
  });

  it('respects noAlmost', () => {
    expect(matchText('recieved', ['received'], { noAlmost: true }).almost).toBeUndefined();
  });

  it('is case-insensitive by default and case-sensitive on request', () => {
    expect(matchText('the hague', ['The Hague']).match).toBe(true);
    expect(matchText('the hague', ['The Hague'], { caseSensitive: true }).match).toBe(false);
  });

  it('empty answers never match', () => {
    expect(matchText('   ', ['x']).match).toBe(false);
  });
});

describe('levenshtein', () => {
  it.each([
    ['', '', 0],
    ['a', '', 1],
    ['kitten', 'sitting', 3],
    ['received', 'recieved', 2],
    ['written', 'writen', 1],
    ['flaw', 'lawn', 2],
  ])('d(%s,%s)=%i', (a, b, d) => {
    expect(levenshtein(a, b)).toBe(d);
  });

  it('counts an adjacent swap as one edit when asked', () => {
    expect(levenshtein('received', 'recieved', Infinity, true)).toBe(1);
    expect(levenshtein('known', 'knwon', Infinity, true)).toBe(1);
    expect(levenshtein('abc', 'cab', Infinity, true)).toBe(2);
  });

  it('exits early beyond max', () => {
    expect(levenshtein('abcdef', 'uvwxyz', 1)).toBe(2);
  });
});

describe('Cambridge word count', () => {
  it.each([
    ['had known', 2],
    ["didn't know", 3],
    ["can't have been", 4],
    ['cannot have been', 3],
    ["I'd have", 3],
    ["it's been", 3],
    ["the manager's decision", 3],
    ['a well-known fact', 3],
    ['  spaced   out  ', 2],
    ["won't be able", 4],
    ['', 0],
  ])('%j counts as %i', (s, n) => {
    expect(countWordsCambridge(s)).toBe(n);
  });

  it('finds the key word unchanged', () => {
    expect(containsKeyword('unless you leave now', 'UNLESS')).toBe(true);
    expect(containsKeyword('Unless you leave', 'UNLESS')).toBe(true);
    expect(containsKeyword('unlessly', 'UNLESS')).toBe(false);
    expect(containsKeyword('longer than', 'LONG')).toBe(false);
    expect(containsKeyword('as long as you', 'AS LONG AS')).toBe(true);
    expect(containsKeyword("didn't", 'NOT')).toBe(false);
    expect(containsKeyword("if it hadn't been", 'HAD')).toBe(true);
    expect(containsKeyword("she'd be here", 'WOULD')).toBe(false);
  });
});

describe('checkItem', () => {
  const gap: Item = {
    ...meta,
    id: 't1',
    type: 'gap',
    prompt: 'If I ___ about the strike, I would have taken the train.',
    cue: 'know',
    acceptedAnswers: ['had known'],
  };

  it('gap: correct, almost, incorrect', () => {
    expect(checkItem(gap, 'had known').verdict).toBe('correct');
    expect(checkItem(gap, "'d known").verdict).toBe('correct');
    expect(checkItem(gap, 'had knwon').verdict).toBe('almost');
    expect(checkItem(gap, 'knew').verdict).toBe('incorrect');
    expect(checkItem(gap, '').verdict).toBe('incorrect');
  });

  const kwt: Item = {
    ...meta,
    id: 't2',
    type: 'kwt',
    first: 'You will miss the bus if you do not leave now.',
    keyword: 'UNLESS',
    before: 'You will miss the bus',
    after: 'now.',
    acceptedAnswers: ['unless you leave'],
  };

  it('kwt: correct answer', () => {
    expect(checkItem(kwt, 'unless you leave').verdict).toBe('correct');
  });

  it('kwt: retyping the frame is tolerated', () => {
    expect(checkItem(kwt, 'You will miss the bus unless you leave now.').verdict).toBe('correct');
  });

  it('kwt: only whole words of the frame are stripped', () => {
    const plan: Item = { ...kwt, id: 't2b', keyword: 'GOING', before: 'We', after: 'the museum.', acceptedAnswers: ['were going to visit'] };
    expect(checkItem(plan, 'were going to visit').verdict).toBe('correct');
    expect(checkItem(plan, 'We were going to visit the museum.').verdict).toBe('correct');
    const tail: Item = { ...kwt, id: 't2c', keyword: 'ON', before: 'The match', after: 'on.', acceptedAnswers: ['has been going on'] };
    expect(checkItem(tail, 'has been going on').verdict).toBe('correct');
  });

  it('kwt: a key word with an apostrophe matches straight or curly quotes', () => {
    const poss: Item = { ...kwt, id: 't2d', keyword: 'LAURA’S', before: 'This', after: '.', acceptedAnswers: ['bike is Laura’s'] };
    expect(checkItem(poss, "bike is Laura's").verdict).toBe('correct');
    expect(checkItem(poss, 'bike is Laura’s').verdict).toBe('correct');
  });

  it('kwt: key word missing', () => {
    const r = checkItem(kwt, 'if you do not leave');
    expect(r.verdict).toBe('incorrect');
    expect(r.message).toMatch(/UNLESS/);
  });

  it('kwt: too many words', () => {
    const r = checkItem(kwt, 'unless you decide to leave right');
    expect(r.verdict).toBe('incorrect');
    expect(r.message).toMatch(/between 2 and 5/);
  });

  it('kwt: contractions count as two words', () => {
    const k: Item = { ...kwt, id: 't3', keyword: 'HAVE', acceptedAnswers: ["wouldn't have been able"], maxWords: 5 };
    // wouldn't(2) have been able = 5 → allowed
    expect(checkItem(k, "wouldn't have been able").verdict).toBe('correct');
    const k2: Item = { ...k, id: 't4', maxWords: 4 };
    expect(checkItem(k2, "wouldn't have been able").verdict).toBe('incorrect');
  });

  it('mcq', () => {
    const m: Item = { ...meta, id: 'm', type: 'mcq', prompt: 'p', options: ['a', 'b', 'c', 'd'], answer: 2 };
    expect(checkItem(m, 2).verdict).toBe('correct');
    expect(checkItem(m, 1).verdict).toBe('incorrect');
    expect(checkItem(m, null).verdict).toBe('incorrect');
    expect(answerText(m)).toBe('c) c');
  });

  const err: Item = {
    ...meta,
    id: 'e',
    type: 'error-correction',
    parts: ['If I ', { u: 'would have known' }, ' about the delay, I ', { u: 'would have called' }, ' you.'],
    errorIndex: 0,
    acceptedAnswers: ['had known'],
  };

  it('error correction', () => {
    expect(checkItem(err, { index: 0, correction: 'had known' }).verdict).toBe('correct');
    expect(checkItem(err, { index: 0, correction: "'d known" }).verdict).toBe('correct');
    expect(checkItem(err, { index: 1, correction: 'had known' }).verdict).toBe('incorrect');
    expect(checkItem(err, { index: 0, correction: 'knew' }).message).toMatch(/found the error/);
    expect(checkItem(err, { index: 0, correction: '' }).message).toMatch(/now write/);
  });

  it('matching scores each pair', () => {
    const m: Item = { ...meta, id: 'x', type: 'matching', left: ['a', 'b', 'c'], right: ['1', '2', '3'], answer: [2, 0, 1] };
    const r = checkItem(m, [2, 1, 1]);
    expect(r.score).toBe(2);
    expect(r.maxScore).toBe(3);
    expect(r.verdict).toBe('incorrect');
    expect(checkItem(m, [2, 0, 1]).verdict).toBe('correct');
  });

  it('word order with punctuation fragments', () => {
    const w: Item = {
      ...meta,
      id: 'w',
      type: 'word-order',
      fragments: ['Had', 'I', 'known', ',', 'I would have stayed'],
      acceptedAnswers: ['Had I known, I would have stayed.'],
    };
    expect(checkItem(w, ['Had', 'I', 'known', ',', 'I would have stayed']).verdict).toBe('correct');
    expect(checkItem(w, ['I', 'had', 'known', ',', 'I would have stayed']).verdict).toBe('incorrect');
  });

  it('open cloze scores each gap and never says almost', () => {
    const c: Item = {
      ...meta,
      id: 'c',
      type: 'open-cloze',
      text: 'Had it [1] been for you, we [2] have lost.',
      gaps: [{ acceptedAnswers: ['not'] }, { acceptedAnswers: ['would', 'might', 'could'] }],
    };
    const r = checkItem(c, ['not', 'might']);
    expect(r.verdict).toBe('correct');
    expect(checkItem(c, ['nt', 'would']).parts).toEqual(['incorrect', 'correct']);
  });

  it('mc cloze', () => {
    const c: Item = {
      ...meta,
      id: 'c2',
      type: 'mc-cloze',
      text: '[1] and [2]',
      gaps: [
        { options: ['a', 'b', 'c', 'd'], answer: 0 },
        { options: ['a', 'b', 'c', 'd'], answer: 3 },
      ],
    };
    expect(checkItem(c, [0, 3]).score).toBe(2);
    expect(checkItem(c, [0, 2]).score).toBe(1);
  });
});
