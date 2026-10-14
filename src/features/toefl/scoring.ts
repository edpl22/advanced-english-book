import { TOEFL_CONFIG } from '@content/toefl/toefl.config';

/**
 * Unofficial band estimates on the 1–6 scale. Reading and Listening use the
 * percentage of points across both modules, with a ceiling that depends on
 * the route: the easier Module 2 cannot lead to the top bands, as in an
 * adaptive test. Writing and Speaking combine automatic scores (Build a
 * Sentence) with the learner's rubric self-assessment.
 */

export function roundBand(x: number): number {
  const step = TOEFL_CONFIG.bandStep;
  const r = Math.round(x / step) * step;
  return Math.min(TOEFL_CONFIG.bandMax, Math.max(TOEFL_CONFIG.bandMin, r));
}

export function route(m1Correct: number, m1Total: number): 'easy' | 'hard' {
  return m1Total > 0 && m1Correct / m1Total >= TOEFL_CONFIG.routingThreshold ? 'hard' : 'easy';
}

/** Reading / Listening band from total points and the route taken. */
export function adaptiveBand(correct: number, total: number, routeTaken: 'easy' | 'hard'): number {
  const p = total > 0 ? correct / total : 0;
  return routeTaken === 'hard' ? roundBand(2.5 + 3.5 * p) : roundBand(Math.min(4.5, 1 + 3.5 * p));
}

/** Rubric: five criteria scored 0 (no), 1 (partly), 2 (yes) → 0..1. */
export function rubricScore(marks: number[]): number {
  if (!marks.length) return 0;
  return marks.reduce((a, b) => a + b, 0) / (marks.length * 2);
}

export function writingBand(buildSentencePct: number, emailRubric: number, discussionRubric: number): number {
  return roundBand(1 + 5 * (0.3 * buildSentencePct + 0.35 * emailRubric + 0.35 * discussionRubric));
}

export function speakingBand(repeatPct: number, interviewRubric: number): number {
  return roundBand(1 + 5 * (0.4 * repeatPct + 0.6 * interviewRubric));
}

export function overallBand(bands: number[]): number {
  if (!bands.length) return TOEFL_CONFIG.bandMin;
  return roundBand(bands.reduce((a, b) => a + b, 0) / bands.length);
}

export function cefr(band: number): string {
  for (const c of TOEFL_CONFIG.cefr) if (band >= c.min) return c.level;
  return 'A1';
}
