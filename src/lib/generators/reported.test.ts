import { describe, expect, it } from 'vitest';
import { BACKSHIFT, reportCommand, reportQuestion, reportStatement, reportedSpeechGenerator } from './reported';
import { COMMANDS, QUESTIONS, REPORTING_VERBS, SPEAKERS, STATEMENTS } from '@content/data/reported-frames';
import { assertUniformAnswers, sweep } from './testkit';
import { normalize } from '../checking/normalize';

const laura = SPEAKERS[0];
const marcos = SPEAKERS[1];

describe('reported statements (golden)', () => {
  it.each([
    [0, laura, 'Laura said, “I am working from home today.”', 'she was working from home that day'],
    [1, marcos, 'Marcos said, “I will send you the figures tomorrow.”', 'he would send me the figures the next day'],
    [2, laura, 'Laura said, “We have finished the first phase of the project.”', 'they had finished the first phase of the project'],
    [3, marcos, 'Marcos said, “I met the new investors yesterday.”', 'he had met the new investors the day before'],
    [4, laura, 'Laura said, “I can speak four languages.”', 'she could speak four languages'],
    [5, marcos, 'Marcos said, “We are going to open a new branch in Curitiba next month.”', 'they were going to open a new branch in Curitiba the following month'],
    [6, laura, 'Laura said, “I live near the airport.”', 'she lived near the airport'],
    [7, marcos, 'Marcos said, “I must leave early tonight.”', 'he had to leave early that night'],
    [8, laura, 'Laura said, “We have been waiting for an answer for weeks.”', 'they had been waiting for an answer for weeks'],
    [9, marcos, 'Marcos said, “I may be a little late.”', 'he might be a little late'],
    [10, laura, 'Laura said, “I lost my passport two days ago.”', 'she had lost her passport two days before'],
    [15, marcos, 'Marcos said, “I have never seen such a good presentation.”', 'he had never seen such a good presentation'],
  ] as const)('statement %i', (i, sp, direct, clause) => {
    const r = reportStatement(sp, STATEMENTS[i]);
    expect(r.direct).toBe(direct);
    expect(r.clauses).toContain(clause);
  });

  it('accepts alternative adverbs and optional "that"', () => {
    const r = reportStatement(marcos, STATEMENTS[1]);
    expect(r.full).toContain('Marcos said that he would send me the figures the following day.');
    expect(r.full).toContain('Marcos said he would send me the figures the next day.');
  });

  it('past simple may stay or move to past perfect', () => {
    expect(BACKSHIFT['past-simple']).toEqual(['past-perfect', 'past-simple']);
    expect(reportStatement(laura, STATEMENTS[3]).vps).toEqual(['had met', 'met']);
  });

  it('never offers an accepted form as a wrong option', () => {
    for (const sp of SPEAKERS)
      for (const f of STATEMENTS) {
        const r = reportStatement(sp, f);
        for (const w of r.wrongVps) expect(r.vps.map((x) => normalize(x))).not.toContain(normalize(w));
        expect(r.wrongVps.length).toBeGreaterThanOrEqual(3);
      }
  });

  it('keeps the original tense as a distractor only with a shifted time expression', () => {
    expect(reportStatement(laura, STATEMENTS[0]).wrongVps).toContain('is working');
    expect(reportStatement(laura, STATEMENTS[6]).wrongVps).not.toContain('lives');
  });
});

describe('reported questions', () => {
  it.each([
    [0, 'where I lived'],
    [1, 'what time I finished work'],
    [2, 'why I had left the company'],
    [3, 'how long I had worked there'],
    [4, 'if I spoke Spanish'],
    [5, 'if I could drive a lorry'],
    [6, 'what I was reading'],
    [7, 'if I had seen the match the day before'],
    [8, 'when I would know the results'],
    [9, 'if I had finished the report'],
    [11, 'who I worked for'],
  ] as const)('question %i → %s', (i, emb) => {
    expect(reportQuestion(laura, QUESTIONS[i]).embedded).toContain(emb);
  });

  it('accepts whether for yes/no questions', () => {
    expect(reportQuestion(laura, QUESTIONS[4]).embedded).toContain('whether I spoke Spanish');
  });

  it('wrong options keep question word order', () => {
    const r = reportQuestion(laura, QUESTIONS[0]);
    expect(r.wrongEmbedded).toContain('where did I live');
    expect(r.wrongEmbedded).toContain('where do you live');
    for (const w of r.wrongEmbedded) expect(r.embedded).not.toContain(w);
  });

  it('every question has at least three wrong options', () => {
    for (const q of QUESTIONS) expect(reportQuestion(laura, q).wrongEmbedded.length).toBeGreaterThanOrEqual(3);
  });
});

describe('reported commands', () => {
  it.each(COMMANDS.map((c, i) => [i, c]))('command %i', (_i, c) => {
    const r = reportCommand(laura, c);
    expect(r.accepted[0]).toBe(`${c.neg ? 'not ' : ''}to ${c.v}`);
    expect(r.wrong).not.toContain(r.accepted[0]);
  });
});

describe('reporting verbs table', () => {
  it.each(REPORTING_VERBS.map((r) => [r.verb, r]))('%s has one gap and disjoint answers', (_v, r) => {
    expect(r.reported.split('___').length).toBe(2);
    for (const w of r.wrong) expect(r.accepted).not.toContain(w);
    expect(r.wrong.length).toBeGreaterThanOrEqual(3);
  });
});

describe('reported speech generator', () => {
  it('sweeps 400 seeds', () => {
    assertUniformAnswers(sweep(reportedSpeechGenerator, 400));
  });
});
