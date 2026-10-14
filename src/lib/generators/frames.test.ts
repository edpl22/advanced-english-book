import { describe, expect, it } from 'vitest';
import { FRAME_GENERATORS, FRAME_SETS } from './grammar-frames';
import { GENERATORS } from './index';
import { canGap, fillSlots, frameItem, slotsOf, SLOTS, type Frame } from './frames';
import { assertNoCorrectDistractor, assertUniformAnswers, assertValidItem, sweep } from './testkit';
import { Rng } from '../rng';
import { normalize } from '../checking/normalize';
import { expandContractions } from '../checking/contractions';
import { checkItem } from '../checking';
import { getUnit, unitIdForRef } from '@content/units';

const variants = (s: string, keepCommas = false) => expandContractions(normalize(s, { keepCommas }));

function sectionExists(ref: string): boolean {
  const unit = getUnit(unitIdForRef(ref) ?? '');
  return Boolean(unit && unit.sections.some((s) => s.id === ref));
}

describe('frame machinery', () => {
  it('fills every slot consistently', () => {
    const rng = new Rng(7);
    const out = fillSlots(rng, '{f} met {m} in {city}; {f} was happy.');
    expect(out).not.toMatch(/[{}]/);
    const name = out.split(' ')[0];
    expect(out.endsWith(`${name} was happy.`)).toBe(true);
  });

  it('rejects unknown slots', () => {
    expect(() => fillSlots(new Rng(1), 'Hello {nobody}.')).toThrow();
  });

  it('every slot list has at least five fillers', () => {
    for (const [k, v] of Object.entries(SLOTS)) expect(v.length, k).toBeGreaterThanOrEqual(5);
  });
});

for (const gen of FRAME_GENERATORS) {
  const frames: readonly Frame[] = FRAME_SETS[gen.key as keyof typeof FRAME_SETS];

  describe(`frame generator: ${gen.key}`, () => {
    it('has at least 40 frames', () => {
      expect(frames.length).toBeGreaterThanOrEqual(40);
    });

    it('sweeps 400 seeds: valid, deterministic, answers spread A–D', () => {
      const items = sweep(gen, 400);
      assertUniformAnswers(items);
      expect(items.every((i) => i.topics[0] === gen.topic)).toBe(true);
    });

    it('produces both multiple-choice and gap items', () => {
      const types = new Set(Array.from({ length: 200 }, (_, s) => gen.generate(s).type));
      expect(types.has('mcq')).toBe(true);
      expect(types.has('gap')).toBe(true);
    });

    it('every frame refers to an existing section of its unit', () => {
      for (const f of frames) expect(sectionExists(f.ref), `${f.ref}: ${f.text}`).toBe(true);
    });

    it.each(frames.map((f, i) => [i + 1, f] as const))('frame %i is well formed and safe', (_, f) => {
      expect(f.text.split('___').length, f.text).toBe(2);
      for (const s of slotsOf(f.text)) expect(SLOTS[s], `{${s}}`).toBeDefined();
      expect(f.answer.length).toBeGreaterThanOrEqual(1);
      expect(f.wrong.length).toBeGreaterThanOrEqual(3);
      // No distractor may be an accepted answer (contractions included).
      // Punctuation frames are multiple choice only, so their commas count.
      const keep = Boolean(f.punctuation);
      const acc = new Set(f.answer.flatMap((a) => variants(a, keep)));
      for (const w of f.wrong) expect(variants(w, keep).some((v) => acc.has(v)), `"${w}" is accepted in: ${f.text}`).toBe(false);
      if (f.punctuation) expect(f.gap, 'punctuation frames are multiple choice only').toBeFalsy();
      // Several slot fillings, both item types.
      for (let seed = 0; seed < 6; seed++) {
        const mcq = frameItem(new Rng(seed), f, `t:${seed}`, 'mcq', { topic: gen.topic, examTags: [] });
        expect(mcq.type).toBe('mcq');
        assertValidItem({ ...mcq, source: 'generated' });
        assertNoCorrectDistractor(mcq, f.answer, { keepCommas: keep });
        if (mcq.type === 'mcq') expect(mcq.prompt).not.toMatch(/[{}]/);
        if (canGap(f)) {
          const gap = frameItem(new Rng(seed), f, `t:${seed}`, 'gap', { topic: gen.topic, examTags: [] });
          expect(gap.type).toBe('gap');
          assertValidItem({ ...gap, source: 'generated' });
          for (const w of f.wrong) expect(checkItem(gap, w).verdict, `gap accepts wrong "${w}"`).not.toBe('correct');
        }
      }
    });
  });
}

describe('every generator points to sections that exist in written units', () => {
  it.each(GENERATORS.map((g) => [g.key, g] as const))('%s', (_, g) => {
    for (let seed = 0; seed < 150; seed++) {
      const item = g.generate(seed);
      const unit = getUnit(unitIdForRef(item.ref) ?? '');
      if (!unit) continue; // unit not written yet (later phase)
      expect(unit.sections.some((s) => s.id === item.ref), `${g.key} → ${item.ref}`).toBe(true);
    }
  });
});
