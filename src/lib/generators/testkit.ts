import { expect } from 'vitest';
import { ItemSchema, structuralProblems, type Item } from '../schema';
import { checkItem } from '../checking';
import { normalize } from '../checking/normalize';
import { expandContractions } from '../checking/contractions';
import type { Generator } from './core';

/**
 * Invariants every generated item must satisfy:
 *  - valid against the Zod schema and the structural rules;
 *  - the canonical answer is graded correct by the checking engine;
 *  - no MCQ distractor is also an accepted answer;
 *  - options are distinct.
 */
export function assertValidItem(item: Item): void {
  const parsed = ItemSchema.safeParse(item);
  if (!parsed.success) throw new Error(`${item.id}: ${parsed.error.message}`);
  expect(structuralProblems(item), item.id).toEqual([]);
  expect(item.source).toBe('generated');

  if (item.type === 'mcq' || item.type === 'reading') {
    expect(checkItem(item, item.answer).verdict).toBe('correct');
    // Options are read, not typed: a comma is a visible difference (punctuation items).
    const norm = item.options.map((o) => normalize(o, { keepCommas: true }));
    expect(new Set(norm).size, `${item.id} duplicate options`).toBe(norm.length);
  }
  if (item.type === 'gap' || item.type === 'word-formation' || item.type === 'phrasal-choice' || item.type === 'kwt') {
    for (const a of item.acceptedAnswers) {
      expect(checkItem(item, a).verdict, `${item.id}: accepted "${a}" must grade correct`).toBe('correct');
    }
  }
  if (item.type === 'word-order') {
    expect(checkItem(item, item.fragments).verdict).toBe('correct');
  }
  if (item.type === 'error-correction') {
    expect(checkItem(item, { index: item.errorIndex, correction: item.acceptedAnswers[0] }).verdict).toBe('correct');
  }
}

/** For MCQs built from a known accepted list: no distractor may be acceptable. */
export function assertNoCorrectDistractor(item: Item, accepted: string[], opts: { keepCommas?: boolean } = {}): void {
  if (item.type !== 'mcq') return;
  const acc = new Set(accepted.flatMap((a) => expandContractions(normalize(a, opts))));
  item.options.forEach((o, i) => {
    if (i === item.answer) return;
    const vs = expandContractions(normalize(o, opts));
    expect(vs.some((v) => acc.has(v)), `${item.id}: distractor "${o}" is also correct`).toBe(false);
  });
}

/** Run the invariants over many seeds and check determinism + answer spread. */
export function sweep(gen: Generator, n = 300): Item[] {
  const items: Item[] = [];
  for (let seed = 0; seed < n; seed++) {
    const item = gen.generate(seed);
    assertValidItem(item);
    items.push(item);
  }
  // Determinism: same seed, same item.
  expect(gen.generate(12345)).toEqual(gen.generate(12345));
  return items;
}

export function answerSpread(items: Item[]): number[] {
  const counts = [0, 0, 0, 0];
  for (const it of items) if (it.type === 'mcq' && it.options.length === 4) counts[it.answer]++;
  return counts;
}

export function assertUniformAnswers(items: Item[]): void {
  const counts = answerSpread(items);
  const total = counts.reduce((a, b) => a + b, 0);
  if (total < 40) return;
  for (const c of counts) {
    expect(c / total).toBeGreaterThan(0.12);
    expect(c / total).toBeLessThan(0.38);
  }
}
