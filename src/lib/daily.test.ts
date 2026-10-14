import { describe, expect, it } from 'vitest';
import { completeDay, dailyItems, dailyScore, dailyTopics, dateKey, DAILY_COUNT, DAILY_TYPES, doneToday, liveStreak, shiftDay } from './daily';
import { emptyState } from './storage';
import { loadPool } from '@/features/exams/pool';

const fresh = () => emptyState().daily;

describe('daily challenge dates', () => {
  it('formats local dates and shifts across months and years', () => {
    expect(dateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(shiftDay('2026-03-01', -1)).toBe('2026-02-28');
    expect(shiftDay('2024-03-01', -1)).toBe('2024-02-29');
    expect(shiftDay('2026-12-31', 1)).toBe('2027-01-01');
  });
});

describe('daily streak', () => {
  it('starts at 1, grows on consecutive days and resets after a gap', () => {
    let d = completeDay(fresh(), 8, 10, 'B2', '2026-10-10');
    expect(d.streak).toBe(1);
    d = completeDay(d, 6, 10, 'B2', '2026-10-11');
    d = completeDay(d, 9, 10, 'B2', '2026-10-12');
    expect(d.streak).toBe(3);
    expect(d.best).toBe(3);
    d = completeDay(d, 7, 10, 'B2', '2026-10-14');
    expect(d.streak).toBe(1);
    expect(d.best).toBe(3);
  });

  it('does not count the same day twice', () => {
    const d = completeDay(fresh(), 8, 10, 'B2', '2026-10-10');
    const again = completeDay(d, 10, 10, 'B2', '2026-10-10');
    expect(again.streak).toBe(1);
    expect(again.days['2026-10-10'].score).toBe(8);
  });

  it('a streak is alive until the end of the following day', () => {
    const d = completeDay(fresh(), 8, 10, 'B2', '2026-10-10');
    expect(liveStreak(d, '2026-10-10')).toBe(1);
    expect(liveStreak(d, '2026-10-11')).toBe(1);
    expect(liveStreak(d, '2026-10-12')).toBe(0);
    expect(doneToday(d, '2026-10-10')).toBe(true);
    expect(doneToday(d, '2026-10-11')).toBe(false);
  });

  it('scores almost as half a point', () => {
    expect(dailyScore(['correct', 'almost', 'incorrect', 'correct'])).toBe(2.5);
  });
});

describe('daily questions', () => {
  const pool = loadPool();

  it('gives ten short questions on different topics, the same for everyone on a date', () => {
    for (const day of ['2026-10-14', '2026-10-15', '2027-02-01']) {
      for (const level of ['B1', 'B2', 'C1', 'C2'] as const) {
        const a = dailyItems(pool, day, level);
        expect(a, `${day} ${level}`).toHaveLength(DAILY_COUNT);
        expect(new Set(a.map((i) => i.topics[0])).size, `${day} ${level}`).toBeGreaterThanOrEqual(8);
        for (const it of a) expect(DAILY_TYPES).toContain(it.type);
        expect(dailyItems(pool, day, level).map((i) => i.id)).toEqual(a.map((i) => i.id));
      }
    }
  });

  it('changes the topics from one day to the next', () => {
    expect(dailyTopics('2026-10-14')).not.toEqual(dailyTopics('2026-10-15'));
  });
});
