import { describe, expect, it } from 'vitest';
import { applyAttempt, calibratedDifficulty, nextBox, LEITNER_INTERVALS } from './progress';
import { parseState, emptyState, StateSchema } from './storage';
import { regenerate, GENERATORS } from './generators';
import { Rng, hashSeed } from './rng';

describe('Leitner boxes', () => {
  it('moves up on success and back to 1 on failure', () => {
    expect(nextBox(1, 'correct')).toBe(2);
    expect(nextBox(4, 'correct')).toBe(5);
    expect(nextBox(5, 'correct')).toBe(5);
    expect(nextBox(3, 'incorrect')).toBe(1);
    expect(nextBox(3, 'almost')).toBe(1);
  });

  it('only wrong answers put an item into review', () => {
    const ok = applyAttempt(undefined, 'correct', 0, 't');
    expect(ok.box).toBe(0);
    const wrong = applyAttempt(undefined, 'incorrect', 0, 't');
    expect(wrong.box).toBe(1);
    expect(wrong.due).toBe(LEITNER_INTERVALS[1] * 86400000);
    const fixed = applyAttempt(wrong, 'correct', 1000, 't');
    expect(fixed.box).toBe(2);
    expect(fixed.n).toBe(2);
    expect(fixed.correct).toBe(1);
  });
});

describe('difficulty calibration', () => {
  const stat = (n: number, correct: number) => ({ n, correct, lastAt: 0, lastResult: 'correct' as const, box: 0, due: 0, topic: 't' });
  it('keeps the authored value before 10 attempts', () => {
    expect(calibratedDifficulty(4, stat(9, 9))).toBe(4);
  });
  it.each([
    [10, 10, 1],
    [10, 8, 2],
    [10, 6, 3],
    [10, 4, 4],
    [10, 1, 5],
  ])('%i attempts, %i correct → %i', (n, c, d) => {
    expect(calibratedDifficulty(3, stat(n, c))).toBe(d);
  });
});

describe('storage parsing', () => {
  it('invalid JSON gives an empty state', () => {
    expect(parseState('{nope')).toEqual(emptyState());
    expect(parseState(null)).toEqual(emptyState());
    expect(parseState('{"version":2}')).toEqual(emptyState());
  });
  it('a valid state round-trips', () => {
    const s = emptyState();
    s.bookmarks.push({ path: '/book/u07', label: '7 Conditionals', at: 1 });
    expect(parseState(JSON.stringify(s))).toEqual(StateSchema.parse(s));
  });
});

describe('seeds', () => {
  it('the same seed gives the same sequence', () => {
    const a = new Rng('ABC-1234');
    const b = new Rng('ABC-1234');
    expect(Array.from({ length: 5 }, () => a.int(1000))).toEqual(Array.from({ length: 5 }, () => b.int(1000)));
    expect(hashSeed('x')).toBe(hashSeed('x'));
  });

  it('generated items can be rebuilt from their id', () => {
    for (const g of GENERATORS) {
      const it = g.generate(42);
      expect(regenerate(it.id)).toEqual(it);
    }
  });
});
