import { describe, expect, it } from 'vitest';
import { UNITS } from './index';
import { ItemSchema, itemPoints, structuralProblems, type Item } from '../../src/lib/schema';
import { checkItem, countWordsCambridge, containsKeyword } from '../../src/lib/checking';
import { itemFingerprint } from '../../src/lib/generators/core';
import { getGenerator } from '../../src/lib/generators';

/** Responses that should be graded correct for an authored item. */
function correctResponse(item: Item) {
  switch (item.type) {
    case 'mcq':
    case 'reading':
      return item.answer;
    case 'matching':
      return item.answer;
    case 'mc-cloze':
      return item.gaps.map((g) => g.answer);
    case 'open-cloze':
      return item.gaps.map((g) => g.acceptedAnswers[0]);
    case 'word-order':
      return item.fragments;
    case 'error-correction':
      return { index: item.errorIndex, correction: item.acceptedAnswers[0] };
    default:
      return item.acceptedAnswers[0];
  }
}

for (const unit of UNITS) {
  describe(`Unit ${unit.number} · ${unit.title}`, () => {
    const items = unit.exercises.flatMap((e) => e.items);
    const sectionIds = new Set(unit.sections.map((s) => s.id));

    it('has at least 80 scorable items in at least 6 exercise types', () => {
      const points = items.reduce((n, it) => n + itemPoints(it), 0);
      expect(points).toBeGreaterThanOrEqual(80);
      expect(new Set(items.map((i) => i.type)).size).toBeGreaterThanOrEqual(6);
    });

    it('every item is valid against the schema and structural rules', () => {
      for (const it of items) {
        const r = ItemSchema.safeParse(it);
        expect(r.success, `${it.id}: ${r.success ? '' : r.error.message}`).toBe(true);
        expect(structuralProblems(it), it.id).toEqual([]);
      }
    });

    it('every item refers to an existing section', () => {
      for (const it of items) expect(sectionIds.has(it.ref), `${it.id} → ${it.ref}`).toBe(true);
    });

    it('the key answer of every item is graded correct', () => {
      for (const it of items) expect(checkItem(it, correctResponse(it)).verdict, it.id).toBe('correct');
    });

    it('every accepted answer is graded correct', () => {
      for (const it of items) {
        if (it.type === 'gap' || it.type === 'phrasal-choice' || it.type === 'word-formation' || it.type === 'kwt') {
          for (const a of it.acceptedAnswers) expect(checkItem(it, a).verdict, `${it.id}: ${a}`).toBe('correct');
        }
        if (it.type === 'word-order') {
          for (const a of it.acceptedAnswers) expect(checkItem(it, a).verdict, `${it.id}: ${a}`).toBe('correct');
        }
        if (it.type === 'error-correction') {
          for (const a of it.acceptedAnswers) expect(checkItem(it, { index: it.errorIndex, correction: a }).verdict, `${it.id}: ${a}`).toBe('correct');
        }
      }
    });

    it('key word transformations respect the word limit and contain the key word', () => {
      for (const it of items) {
        if (it.type !== 'kwt') continue;
        for (const a of it.acceptedAnswers) {
          const n = countWordsCambridge(a);
          expect(n, `${it.id}: "${a}"`).toBeGreaterThanOrEqual(it.minWords ?? 2);
          expect(n, `${it.id}: "${a}"`).toBeLessThanOrEqual(it.maxWords ?? 5);
          expect(containsKeyword(a, it.keyword), `${it.id}: "${a}"`).toBe(true);
        }
      }
    });

    it('word-order fragments rebuild the canonical answer', () => {
      for (const it of items) if (it.type === 'word-order') expect(checkItem(it, it.fragments).verdict, it.id).toBe('correct');
    });

    it('MCQ answers are spread across A–D', () => {
      const counts = [0, 0, 0, 0];
      for (const it of items) {
        if (it.type === 'mcq' && it.options.length === 4) counts[it.answer]++;
        if (it.type === 'mc-cloze') for (const g of it.gaps) counts[g.answer]++;
      }
      const total = counts.reduce((a, b) => a + b, 0);
      for (const c of counts) expect(c / total).toBeGreaterThan(0.15);
    });

    it('no duplicate items', () => {
      const fps = items.map((i) => itemFingerprint(i));
      expect(new Set(fps).size).toBe(fps.length);
    });

    it('ids are unique and stable', () => {
      expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
      expect(items[0].id).toMatch(new RegExp(`^${unit.id}-`));
    });

    it('More practice generators exist', () => {
      for (const g of unit.generators) expect(getGenerator(g), g).toBeDefined();
    });

    it('has the fixed unit structure', () => {
      expect(unit.intro.length).toBeGreaterThan(100);
      expect(unit.sections.length).toBeGreaterThanOrEqual(4);
      expect(unit.mistakes.length).toBeGreaterThanOrEqual(5);
      expect(unit.examFocus.length).toBeGreaterThanOrEqual(4);
      expect(unit.quickReview.points.length).toBeGreaterThanOrEqual(4);
    });
  });
}
