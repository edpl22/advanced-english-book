import { describe, expect, it } from 'vitest';
import { buildTest, levelsFor, type TestConfig } from './sampler';
import { unitItems } from '@content/units';

const pool = { items: unitItems(), passages: [] };

const base: TestConfig = {
  level: 'C1',
  topics: ['conditionals', 'phrasal-verbs', 'passive', 'reported-speech'],
  count: 20,
  types: [],
  source: 'both',
  timerMin: null,
  seed: 'ABC-1234',
  avoidRecent: false,
};

describe('test sampler', () => {
  it('the same seed gives the same paper', () => {
    const a = buildTest(base, pool);
    const b = buildTest(base, pool);
    expect(a.items.map((i) => i.id)).toEqual(b.items.map((i) => i.id));
    expect(a.items).toHaveLength(20);
  });

  it('a different seed gives a different paper', () => {
    const a = buildTest(base, pool);
    const b = buildTest({ ...base, seed: 'XYZ-9999' }, pool);
    expect(a.items.map((i) => i.id)).not.toEqual(b.items.map((i) => i.id));
  });

  it('balances topics', () => {
    const t = buildTest({ ...base, count: 40 }, pool);
    const counts: Record<string, number> = {};
    for (const i of t.items) counts[i.topics[0]] = (counts[i.topics[0]] ?? 0) + 1;
    for (const topic of base.topics) expect(counts[topic] ?? 0).toBeGreaterThanOrEqual(6);
  });

  it('respects the source filter', () => {
    expect(buildTest({ ...base, source: 'generated' }, pool).items.every((i) => i.source === 'generated')).toBe(true);
    expect(buildTest({ ...base, source: 'authored', topics: ['conditionals'] }, pool).items.every((i) => i.source === 'authored')).toBe(true);
  });

  it('respects the type filter', () => {
    const t = buildTest({ ...base, types: ['mcq'] }, pool);
    expect(t.items.every((i) => i.type === 'mcq')).toBe(true);
  });

  it('respects the level filter', () => {
    expect(levelsFor('C1')).toEqual(['B2', 'C1']);
    const t = buildTest({ ...base, level: 'B1' }, pool);
    expect(t.items.every((i) => i.level === 'B1')).toBe(true);
  });

  it('skips recently correct items when asked', () => {
    const first = buildTest({ ...base, source: 'authored', topics: ['conditionals'], count: 10 }, pool);
    const exclude = new Set(first.items.map((i) => i.id));
    const second = buildTest({ ...base, source: 'authored', topics: ['conditionals'], count: 10, avoidRecent: true }, pool, exclude);
    expect(second.items.some((i) => exclude.has(i.id))).toBe(false);
  });

  it('never repeats an item in one paper', () => {
    const t = buildTest({ ...base, count: 60 }, pool);
    expect(new Set(t.items.map((i) => i.id)).size).toBe(t.items.length);
  });
});
