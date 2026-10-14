import { describe, expect, it } from 'vitest';
import { clipPassage, ctwCorrect } from './ctw';
import { adaptiveBand, cefr, overallBand, roundBand, route, rubricScore, speakingBand, writingBand } from './scoring';
import { BUILD_SENTENCE, TOEFL_TESTS, bsCorrect, bsSentence, buildSentenceById, taskPools } from './bank';
import { TOEFL_CONFIG } from '@content/toefl/toefl.config';

describe('Complete the Words', () => {
  const text = 'Bees are not the only pollinators. In many tropical regions, bats visit flowers at night and carry pollen from one plant to another.';

  it('keeps the first sentence and clips every second word', () => {
    const t = clipPassage(text, 10);
    expect(t[0].shown).toBe('Bees are not the only pollinators.');
    const blanks = t.filter((x) => x.blank);
    expect(blanks[0].shown + blanks[0].missing).toBe('many');
    expect(blanks[0].shown).toBe('ma');
    expect(blanks[1].shown + blanks[1].missing).toBe('regions');
    expect(blanks[1].shown).toBe('reg');
  });

  it('stops at the requested number of blanks', () => {
    expect(clipPassage(text, 3).filter((x) => x.blank)).toHaveLength(3);
  });

  it('every test passage yields exactly the configured number of blanks', () => {
    for (const p of taskPools().ctw) {
      expect(clipPassage(p.text, TOEFL_CONFIG.sections.reading.tasks.completeTheWords.blanksPerPassage).filter((x) => x.blank), p.id).toHaveLength(10);
    }
  });

  it('has at least 40 passages with unique ids', () => {
    const ids = taskPools().ctw.map((p) => p.id);
    expect(ids.length).toBeGreaterThanOrEqual(40);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('the text is unchanged when blanks are filled', () => {
    for (const p of taskPools().ctw) {
      const rebuilt = clipPassage(p.text).map((x) => x.shown + x.missing + x.tail).join('');
      expect(rebuilt).toBe(p.text);
    }
  });

  it('accepts the missing letters or the whole word', () => {
    const tok = clipPassage(text).find((x) => x.blank)!;
    expect(ctwCorrect(tok, 'ny')).toBe(true);
    expect(ctwCorrect(tok, 'MANY')).toBe(true);
    expect(ctwCorrect(tok, 'n')).toBe(false);
    expect(ctwCorrect(tok, '')).toBe(false);
  });
});

describe('TOEFL scoring', () => {
  it.each([
    [1, 1],
    [3.3, 3.5],
    [4.74, 4.5],
    [4.76, 5],
    [7, 6],
    [0, 1],
  ])('roundBand(%f) = %f', (x, b) => expect(roundBand(x)).toBe(b));

  it('routes by module 1 accuracy', () => {
    expect(route(6, 10)).toBe('hard');
    expect(route(5, 10)).toBe('easy');
  });

  it('the easy route cannot reach the top bands', () => {
    expect(adaptiveBand(20, 20, 'easy')).toBe(4.5);
    expect(adaptiveBand(20, 20, 'hard')).toBe(6);
    expect(adaptiveBand(0, 20, 'easy')).toBe(1);
  });

  it('rubric and writing/speaking bands', () => {
    expect(rubricScore([2, 2, 2, 2, 2])).toBe(1);
    expect(rubricScore([1, 1, 1, 1, 1])).toBe(0.5);
    expect(writingBand(1, 1, 1)).toBe(6);
    expect(writingBand(0, 0, 0)).toBe(1);
    expect(speakingBand(0.5, 0.5)).toBe(3.5);
  });

  it('overall band and CEFR', () => {
    expect(overallBand([5, 4.5, 4, 5])).toBe(4.5);
    expect(cefr(6)).toBe('C2');
    expect(cefr(5.5)).toBe('C1');
    expect(cefr(4)).toBe('B2');
    expect(cefr(3.5)).toBe('B1');
    expect(cefr(1)).toBe('A1');
  });
});

describe('TOEFL content', () => {
  it('has at least one complete test with all modules', () => {
    for (const t of TOEFL_TESTS) {
      for (const m of [t.reading.m1, t.reading.easy, t.reading.hard]) {
        expect(m.ctw.length + m.daily.length + m.academic.length).toBeGreaterThan(0);
        for (const d of [...m.daily, ...m.academic]) for (const q of d.questions) expect(q.answer).toBeLessThan(q.options.length);
      }
      for (const m of [t.listening.m1, t.listening.easy, t.listening.hard]) {
        expect(m.choose.length).toBeGreaterThan(0);
        for (const c of m.choose) expect(c.answer).toBeLessThan(c.options.length);
        for (const a of m.audio) for (const q of a.questions) expect(q.answer).toBeLessThan(q.options.length);
      }
      expect(t.writing.buildSentenceIds).toHaveLength(TOEFL_CONFIG.sections.writing.tasks.buildSentence.count);
      for (const id of t.writing.buildSentenceIds) expect(buildSentenceById(id), id).toBeDefined();
      expect(t.speaking.repeat).toHaveLength(TOEFL_CONFIG.sections.speaking.tasks.listenRepeat.count);
      expect(t.speaking.interview).toHaveLength(TOEFL_CONFIG.sections.speaking.tasks.interview.count);
    }
  });

  it('the Build a Sentence bank has at least 100 items, each solvable', () => {
    expect(BUILD_SENTENCE.length).toBeGreaterThanOrEqual(100);
    for (const b of BUILD_SENTENCE) {
      expect(bsCorrect(b, b.chunks)).toBe(true);
      expect(bsSentence(b).length).toBeGreaterThan(5);
      if (b.distractor) expect(b.chunks).not.toContain(b.distractor);
    }
  });

  it('six complete tests with unique ids and no Build a Sentence item reused between tests', () => {
    expect(TOEFL_TESTS.length).toBeGreaterThanOrEqual(6);
    const p = taskPools();
    const ids = [...p.ctw, ...p.daily, ...p.academic, ...p.choose, ...p.conversation, ...p.announcement, ...p.talk, ...p.email, ...p.discussion].map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    const bs = TOEFL_TESTS.flatMap((t) => t.writing.buildSentenceIds);
    expect(new Set(bs).size).toBe(bs.length);
  });

  it('multiple-choice items have four distinct options and balanced keys', () => {
    const p = taskPools();
    const items = [
      ...p.choose,
      ...[...p.daily, ...p.academic, ...p.conversation, ...p.announcement, ...p.talk].flatMap((x) => x.questions),
    ];
    const keys = [0, 0, 0, 0];
    for (const it of items) {
      expect(it.options).toHaveLength(4);
      expect(new Set(it.options.map((o) => o.toLowerCase())).size).toBe(4);
      keys[it.answer]++;
    }
    for (const k of keys) expect(k / items.length).toBeGreaterThan(0.15);
  });

  it('task pools reach the Phase 5 targets', () => {
    const p = taskPools();
    expect(p.ctw.length * TOEFL_CONFIG.sections.reading.tasks.completeTheWords.blanksPerPassage).toBeGreaterThanOrEqual(100);
    expect(p.choose.length).toBeGreaterThanOrEqual(100);
    expect(p.email.length).toBeGreaterThanOrEqual(40);
    expect(p.discussion.length).toBeGreaterThanOrEqual(40);
    expect(p.interview.reduce((n, x) => n + x.questions.length, 0)).toBeGreaterThanOrEqual(40);
    for (const e of p.email) expect(e.bullets.length).toBeGreaterThanOrEqual(3);
    for (const d of p.discussion) expect(d.posts).toHaveLength(2);
    for (const r of p.interview) expect(r.questions).toHaveLength(TOEFL_CONFIG.sections.speaking.tasks.interview.count);
  });

  it('a wrong order is rejected', () => {
    const b = BUILD_SENTENCE[0];
    expect(bsCorrect(b, [...b.chunks].reverse())).toBe(false);
  });
});
