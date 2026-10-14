import raw from '@content/toefl/build-a-sentence.json';
import type { BuildSentenceItem, ToeflTest } from '@content/toefl/types';
import { TEST_01 } from '@content/toefl/test-01';
import { TEST_02 } from '@content/toefl/test-02';
import { TEST_03 } from '@content/toefl/test-03';
import { TEST_04 } from '@content/toefl/test-04';
import { TEST_05 } from '@content/toefl/test-05';
import { TEST_06 } from '@content/toefl/test-06';
import { PRACTICE_CHOOSE, PRACTICE_DISCUSSION, PRACTICE_EMAIL, PRACTICE_INTERVIEW } from '@content/toefl/practice-bank';

/** Build a Sentence bank (shared with the stand-alone Build a Sentence trainer). */
export const BUILD_SENTENCE: BuildSentenceItem[] = raw as BuildSentenceItem[];
const BY_ID = new Map(BUILD_SENTENCE.map((b) => [b.id, b]));

export function buildSentenceById(id: string): BuildSentenceItem | undefined {
  return BY_ID.get(id);
}

/** All complete practice tests. */
export const TOEFL_TESTS: ToeflTest[] = [TEST_01, TEST_02, TEST_03, TEST_04, TEST_05, TEST_06];

/** Fragments joined as a sentence, with the item's final punctuation. */
export function bsSentence(b: BuildSentenceItem, order: string[] = b.chunks): string {
  const s = order.join(' ').replace(/\s+([,.?!])/g, '$1');
  return s.charAt(0).toUpperCase() + s.slice(1) + (b.punctuation ?? '.');
}

/** Is this order of chunks correct (canonical order or a listed alternative)? */
export function bsCorrect(b: BuildSentenceItem, order: string[]): boolean {
  const norm = (xs: string[]) => xs.map((x) => x.toLowerCase()).join('|');
  const target = norm(order);
  return target === norm(b.chunks) || b.acceptedAnswers.some((alt) => norm(alt) === target);
}

/** Every task of every test plus the extra practice bank, for "practise one task" mode. */
export function taskPools() {
  const r = TOEFL_TESTS.flatMap((t) => [t.reading.m1, t.reading.easy, t.reading.hard]);
  const l = TOEFL_TESTS.flatMap((t) => [t.listening.m1, t.listening.easy, t.listening.hard]);
  return {
    ctw: r.flatMap((m) => m.ctw),
    daily: r.flatMap((m) => m.daily),
    academic: r.flatMap((m) => m.academic),
    choose: [...l.flatMap((m) => m.choose), ...PRACTICE_CHOOSE],
    conversation: l.flatMap((m) => m.audio.filter((a) => a.kind === 'conversation')),
    announcement: l.flatMap((m) => m.audio.filter((a) => a.kind === 'announcement')),
    talk: l.flatMap((m) => m.audio.filter((a) => a.kind === 'talk')),
    buildSentence: BUILD_SENTENCE,
    email: [...TOEFL_TESTS.map((t) => t.writing.email), ...PRACTICE_EMAIL],
    discussion: [...TOEFL_TESTS.map((t) => t.writing.discussion), ...PRACTICE_DISCUSSION],
    repeat: TOEFL_TESTS.map((t) => ({ context: t.speaking.repeatContext, sentences: t.speaking.repeat })),
    interview: [...TOEFL_TESTS.map((t) => ({ context: t.speaking.interviewContext, questions: t.speaking.interview })), ...PRACTICE_INTERVIEW],
  };
}
