import { Rng, hashSeed } from './rng';
import { TOPICS, type Topic } from './topics';
import type { Daily } from './storage';
import type { Item, ItemType, LevelT } from './schema';
import { buildTest, type Pool } from '@/features/exams/sampler';

/**
 * Daily Challenge: ten questions on ten random topics, the same for every
 * learner on a given date and level. Completing it on consecutive days
 * builds a streak; missing a day resets it.
 */

export const DAILY_COUNT = 10;

/** Short item types only: one screen, one answer. */
export const DAILY_TYPES: ItemType[] = ['mcq', 'gap', 'kwt', 'error-correction', 'word-order', 'word-formation', 'phrasal-choice'];

const DAILY_TOPICS: Topic[] = TOPICS.filter((t) => t !== 'reading' && t !== 'medieval');

/** Local calendar date as YYYY-MM-DD. */
export function dateKey(d: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** The date key n days before (negative) or after (positive) a key. */
export function shiftDay(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return dateKey(new Date(y, m - 1, d + n));
}

/** The streak as it stands today: it survives until the end of the day after the last completion. */
export function liveStreak(daily: Daily, today: string = dateKey()): number {
  if (!daily.last) return 0;
  return daily.last === today || daily.last === shiftDay(today, -1) ? daily.streak : 0;
}

export function doneToday(daily: Daily, today: string = dateKey()): boolean {
  return Boolean(daily.days[today]);
}

/** Record a completed challenge. Completing the same day twice changes nothing. */
export function completeDay(daily: Daily, score: number, total: number, level: string, today: string = dateKey(), now = Date.now()): Daily {
  if (daily.days[today]) return { ...daily, current: null };
  const streak = daily.last === shiftDay(today, -1) ? daily.streak + 1 : 1;
  return {
    ...daily,
    streak,
    best: Math.max(daily.best, streak),
    last: today,
    days: { ...daily.days, [today]: { score, total, at: now, level } },
    current: null,
  };
}

/** The ten topics of a day, drawn from the whole syllabus. */
export function dailyTopics(today: string): Topic[] {
  return new Rng(hashSeed(`daily-topics:${today}`)).shuffle([...DAILY_TOPICS]).slice(0, DAILY_COUNT + 4);
}

/** The questions of a day: one per topic, authored or generated. */
export function dailyItems(pool: Pool, today: string, level: LevelT): Item[] {
  const topics = dailyTopics(today);
  const paper = buildTest(
    { level, topics, count: DAILY_COUNT, types: DAILY_TYPES, source: 'both', timerMin: null, seed: `daily:${today}:${level}`, avoidRecent: false },
    pool,
  );
  return paper.items.slice(0, DAILY_COUNT);
}

/** Points for the score: correct = 1, almost = ½. */
export function dailyScore(results: Array<'correct' | 'almost' | 'incorrect'>): number {
  return results.reduce((n, r) => n + (r === 'correct' ? 1 : r === 'almost' ? 0.5 : 0), 0);
}
