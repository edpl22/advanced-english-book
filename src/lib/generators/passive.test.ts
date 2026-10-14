import { describe, expect, it } from 'vitest';
import {
  activeSentence,
  causativeAnswers,
  ditransitiveForms,
  passiveAnswers,
  passiveGenerator,
  passiveMalformed,
  reportingForms,
  reportingInfinitive,
} from './passive';
import { CAUSATIVE_FRAMES, DITRANSITIVE_FRAMES, PASSIVE_FRAMES, REPORTING_FRAMES } from '@content/data/passive-frames';
import { S, np, passive } from './conjugate';
import { getVerb } from '@content/data/verbs';
import { assertUniformAnswers, sweep } from './testkit';
import { checkItem } from '../checking';

const frame = (v: string) => PASSIVE_FRAMES.find((f) => f.v === v)!;

describe('passive transformations (golden)', () => {
  it.each([
    ['approve', 'past-simple', 'last month', 'The city council approved the new budget last month.', 'was approved by the city council'],
    ['clean', 'present-simple', 'every Sunday morning', 'A team of volunteers cleans the beaches every Sunday morning.', 'are cleaned by a team of volunteers'],
    ['inspect', 'present-continuous', 'at the moment', 'Engineers are inspecting the bridge at the moment.', 'is being inspected by engineers'],
    ['steal', 'past-simple', 'from the library yesterday', 'Someone stole my laptop from the library yesterday.', 'was stolen'],
    ['translate', 'present-perfect', 'into twelve languages', 'The publisher has translated her novels into twelve languages.', 'have been translated by the publisher'],
    ['appoint', 'going-to', 'next month', 'The board is going to appoint a new chief executive next month.', 'is going to be appointed by the board'],
    ['question', 'past-continuous', 'when the lawyer arrived', 'The police were questioning three suspects when the lawyer arrived.', 'were being questioned by the police'],
    ['cancel', 'past-perfect', 'before we reached the stadium', 'The organisers had cancelled the concert before we reached the stadium.', 'had been cancelled by the organisers'],
    ['speak', 'present-simple', 'in nine countries', 'People speak Portuguese in nine countries.', 'is spoken'],
    ['review', 'modal', 'before the deadline', 'The committee must review all applications before the deadline.', 'must be reviewed by the committee'],
    ['launch', 'will', 'in September', 'The company will launch the new model in September.', 'will be launched by the company'],
  ] as const)('%s / %s', (v, tense, tail, active, passiveAnswer) => {
    const f = frame(v);
    expect(activeSentence(f, tense, tail)).toBe(active);
    expect(passiveAnswers(f, tense)).toContain(passiveAnswer);
  });

  it('accepts the passive with and without the agent', () => {
    const ans = passiveAnswers(frame('approve'), 'past-simple');
    expect(ans).toContain('was approved');
    expect(ans).toContain('was approved by the city council');
  });

  it('keeps AmE spellings', () => {
    expect(passiveAnswers(frame('cancel'), 'past-simple')).toContain('was canceled by the organisers');
  });

  it('every frame and use produces at least three wrong forms', () => {
    for (const f of PASSIVE_FRAMES) {
      for (const [t] of f.uses) {
        const wrong = passiveMalformed(f.v, t, f.obj, f.modal);
        expect(wrong.length, `${f.v} ${t}`).toBeGreaterThanOrEqual(3);
        for (const w of wrong) expect(passive(f.v, t, f.obj, f.modal)).not.toContain(w);
      }
    }
  });

  it('typical wrong forms', () => {
    expect(passiveMalformed('write', 'past-simple', np('the report', false))).toEqual(expect.arrayContaining(['was write', 'wrote', 'were written', 'was wrote']));
    expect(passiveMalformed('build', 'will', np('the bridge', false))).toContain('will been built');
  });
});

describe('two-object passives', () => {
  it.each(DITRANSITIVE_FRAMES.map((f) => [f.v, f]))('%s has both passive forms', (_v, f) => {
    const forms = ditransitiveForms(f);
    expect(forms.personFirst.startsWith(f.person.text[0].toUpperCase())).toBe(true);
    expect(forms.thingFirst).toContain(` to ${f.person.text}`);
    expect(forms.personFirst).toContain(getVerb(f.v).pp[0]);
  });

  it('golden', () => {
    const f = DITRANSITIVE_FRAMES[0];
    expect(ditransitiveForms(f)).toEqual({
      active: 'The company gave each employee a bonus in December.',
      personFirst: 'Each employee was given a bonus in December.',
      thingFirst: 'A bonus was given to each employee in December.',
    });
  });
});

describe('causative', () => {
  it.each([
    [S.I, 0, 'had my car serviced'],
    [S.she, 1, 'had her hair cut'],
    [S.we, 2, 'are having our kitchen redecorated'],
    [S.he, 3, 'is going to have his eyes tested'],
    [S.they, 4, 'have had their passport photos taken'],
    [S.I, 5, 'will have my roof repaired'],
    [np('the Oliveiras', true), 9, 'have their groceries delivered'],
  ] as const)('%o frame %i → %s', (s, i, out) => {
    expect(causativeAnswers(s, CAUSATIVE_FRAMES[i], 'have')[0]).toBe(out);
  });

  it('get is accepted as well as have', () => {
    expect(causativeAnswers(S.I, CAUSATIVE_FRAMES[0], 'get')[0]).toBe('got my car serviced');
  });
});

describe('reporting passive', () => {
  it.each(REPORTING_FRAMES.map((f) => [`${f.subject.text} ${f.v}`, f]))('%s', (_n, f) => {
    const r = reportingForms(f);
    expect(r.personal.toLowerCase()).toContain(`${r.be} ${r.pp} ${reportingInfinitive(f)}`);
    expect(r.impersonal.startsWith('It is ')).toBe(true);
    // KWT answers must fit in five words.
    expect(r.personalGap.split(' ').length).toBeLessThanOrEqual(5);
  });

  it('golden forms', () => {
    const f = REPORTING_FRAMES[0];
    expect(reportingForms(f).active).toBe('People say that the minister has resigned.');
    expect(reportingForms(f).personal).toBe('The minister is said to have resigned.');
    expect(reportingForms(REPORTING_FRAMES[1]).personal).toBe('The minister is said to be planning to resign.');
    expect(reportingForms(REPORTING_FRAMES[2]).personal).toBe('The singer is said to own three hotels in Lisbon.');
    expect(reportingForms(REPORTING_FRAMES[4]).personal).toBe('The thieves are thought to have escaped through a tunnel.');
  });
});

describe('passive generator', () => {
  it('sweeps 400 seeds', () => {
    const items = sweep(passiveGenerator, 400);
    assertUniformAnswers(items);
  });

  it('produces MCQ, gap and KWT items', () => {
    const types = new Set(Array.from({ length: 200 }, (_, i) => passiveGenerator.generate(i).type));
    expect(types).toEqual(new Set(['mcq', 'gap', 'kwt']));
  });

  it('KWT answers respect the word limit and key word', () => {
    for (let i = 0; i < 400; i++) {
      const it = passiveGenerator.generate(i);
      if (it.type !== 'kwt') continue;
      for (const a of it.acceptedAnswers) expect(checkItem(it, a).verdict).toBe('correct');
    }
  });
});
