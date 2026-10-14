import { describe, expect, it } from 'vitest';
import { conjugate, malformed, passive, S, np, type Subject, type Tense } from './conjugate';
import { TENSE_TEMPLATES } from '@content/data/tense-templates';
import { VERBS, getVerb, IRREGULAR_VERBS } from '@content/data/verbs';
import { tenseItemParts, tensesGenerator, TENSE_GENERATORS, buildTenseItem } from './tenses';
import { assertNoCorrectDistractor, assertUniformAnswers, assertValidItem, sweep } from './testkit';
import { Rng } from '../rng';
import { generateMany } from './core';

const sister = np('my sister', false, 'she');
const parents = np('my parents', true);

describe('verb table', () => {
  it('has at least 400 verbs', () => {
    expect(VERBS.length).toBeGreaterThanOrEqual(400);
  });

  it('has at least 150 irregular verbs', () => {
    expect(IRREGULAR_VERBS.length).toBeGreaterThanOrEqual(150);
  });

  it.each([
    ['stop', 'stops', 'stopped', 'stopped', 'stopping'],
    ['travel', 'travels', 'travelled', 'travelled', 'travelling'],
    ['panic', 'panics', 'panicked', 'panicked', 'panicking'],
    ['study', 'studies', 'studied', 'studied', 'studying'],
    ['play', 'plays', 'played', 'played', 'playing'],
    ['die', 'dies', 'died', 'died', 'dying'],
    ['lie', 'lies', 'lay', 'lain', 'lying'],
    ['agree', 'agrees', 'agreed', 'agreed', 'agreeing'],
    ['argue', 'argues', 'argued', 'argued', 'arguing'],
    ['fix', 'fixes', 'fixed', 'fixed', 'fixing'],
    ['go', 'goes', 'went', 'gone', 'going'],
    ['write', 'writes', 'wrote', 'written', 'writing'],
    ['begin', 'begins', 'began', 'begun', 'beginning'],
    ['prefer', 'prefers', 'preferred', 'preferred', 'preferring'],
    ['visit', 'visits', 'visited', 'visited', 'visiting'],
    ['have', 'has', 'had', 'had', 'having'],
    ['undergo', 'undergoes', 'underwent', 'undergone', 'undergoing'],
    ['occur', 'occurs', 'occurred', 'occurred', 'occurring'],
  ])('%s → %s / %s / %s / %s', (base, s, past, pp, ing) => {
    const v = getVerb(base);
    expect(v.s).toBe(s);
    expect(v.past[0]).toBe(past);
    expect(v.pp[0]).toBe(pp);
    expect(v.ing[0]).toBe(ing);
  });

  it('keeps AmE alternatives', () => {
    expect(getVerb('travel').past).toContain('traveled');
    expect(getVerb('get').pp).toContain('gotten');
    expect(getVerb('learn').past).toEqual(['learnt', 'learned']);
  });
});

describe('conjugate', () => {
  it.each<[string, Tense, Subject, string]>([
    ['work', 'present-simple', S.she, 'works'],
    ['work', 'present-simple', S.they, 'work'],
    ['be', 'present-simple', S.I, 'am'],
    ['be', 'past-simple', S.we, 'were'],
    ['be', 'past-simple', S.he, 'was'],
    ['go', 'past-simple', S.I, 'went'],
    ['write', 'present-perfect', sister, 'has written'],
    ['write', 'present-perfect', parents, 'have written'],
    ['live', 'present-perfect-continuous', S.he, 'has been living'],
    ['finish', 'past-perfect', S.they, 'had finished'],
    ['wait', 'past-perfect-continuous', S.I, 'had been waiting'],
    ['leave', 'will', S.you, 'will leave'],
    ['rain', 'going-to', S.it, 'is going to rain'],
    ['fly', 'future-continuous', S.we, 'will be flying'],
    ['finish', 'future-perfect', S.she, 'will have finished'],
    ['work', 'future-perfect-continuous', S.I, 'will have been working'],
    ['present', 'past-going-to', S.I, 'was going to present'],
    ['call', 'would-have', S.they, 'would have called'],
    ['cook', 'past-continuous', S.you, 'were cooking'],
    ['sit', 'present-continuous', S.I, 'am sitting'],
  ])('%s · %s · %s → %s', (v, t, s, out) => {
    expect(conjugate(v, t, s)[0]).toBe(out);
  });

  it.each<[string, Tense, Subject, string]>([
    ['finish', 'present-perfect', S.she, 'has not finished'],
    ['like', 'present-simple', S.he, 'does not like'],
    ['go', 'past-simple', S.we, 'did not go'],
    ['be', 'present-simple', S.they, 'are not'],
    ['come', 'will', S.I, 'will not come'],
  ])('negative %s · %s → %s', (v, t, s, out) => {
    expect(conjugate(v, t, s, { negative: true })[0]).toBe(out);
  });

  it('lists every alternative form', () => {
    expect(conjugate('learn', 'present-perfect', S.I)).toEqual(['have learnt', 'have learned']);
    expect(conjugate('realise', 'past-simple', S.I)).toEqual(['realised', 'realized']);
  });

  it('subjunctive were accepts was too', () => {
    expect(conjugate('be', 'past-simple', S.I, { subjunctiveWere: true })).toEqual(['were', 'was']);
  });

  it.each<[string, Tense | 'modal', Subject, string]>([
    ['build', 'past-simple', np('the bridge', false), 'was built'],
    ['build', 'present-perfect', np('the bridges', true), 'have been built'],
    ['repair', 'present-continuous', np('the road', false), 'is being repaired'],
    ['sign', 'will', np('the deal', false), 'will be signed'],
    ['deliver', 'past-perfect', np('the parcels', true), 'had been delivered'],
    ['finish', 'modal', np('the report', false), 'must be finished'],
  ])('passive %s · %s → %s', (v, t, s, out) => {
    expect(passive(v, t, s)[0]).toBe(out);
  });

  it('malformed forms are never correct', () => {
    const tenses: Tense[] = ['present-simple', 'past-simple', 'present-perfect', 'past-perfect', 'will', 'future-perfect', 'would-have'];
    for (const v of ['go', 'write', 'work', 'be', 'stop', 'study']) {
      for (const t of tenses) {
        for (const s of [S.I, S.she, S.they]) {
          const ok = new Set(conjugate(v, t, s));
          for (const m of malformed(v, t, s)) expect(ok.has(m)).toBe(false);
        }
      }
    }
  });

  it('typical learner errors are produced', () => {
    expect(malformed('go', 'present-perfect', S.she)).toContain('has went');
    expect(malformed('go', 'present-perfect', S.she)).toContain('have gone');
    expect(malformed('write', 'past-simple', S.I)).toContain('writed');
  });
});

describe('tense templates', () => {
  it('every frame uses a verb in the table and has subjects', () => {
    for (const t of TENSE_TEMPLATES) {
      for (const f of t.frames) {
        expect(() => getVerb(f.v), `${t.id}: ${f.v}`).not.toThrow();
        expect(Boolean(f.s) || (t.subjects?.length ?? 0) > 0, t.id).toBe(true);
      }
      expect(t.accept.some((x) => t.reject.includes(x)), `${t.id} accept ∩ reject`).toBe(false);
    }
  });

  it('every template × frame × subject yields a valid MCQ and gap', () => {
    const rng = new Rng(1);
    let n = 0;
    for (const t of TENSE_TEMPLATES) {
      for (const f of t.frames) {
        const subjects = f.s ? [f.s] : t.subjects!;
        for (const s of subjects) {
          const parts = tenseItemParts(t, f, s);
          const mcq = buildTenseItem(t, f, s, 'mcq', rng, `t-${n++}`);
          assertValidItem(mcq);
          assertNoCorrectDistractor(mcq, parts.accepted);
          assertValidItem(buildTenseItem(t, f, s, 'gap', rng, `t-${n++}`));
        }
      }
    }
    expect(n).toBeGreaterThan(400);
  });

  it('since + stative verb accepts only the simple present perfect', () => {
    const t = TENSE_TEMPLATES.find((x) => x.id === 'pp-since')!;
    const f = t.frames.find((x) => x.v === 'know')!;
    const p = tenseItemParts(t, f, S.she);
    expect(p.accepted).toEqual(['has known']);
    expect(p.distractors).toContain('has been knowing');
  });

  it('since + dynamic verb accepts simple and continuous', () => {
    const t = TENSE_TEMPLATES.find((x) => x.id === 'pp-since')!;
    const f = t.frames.find((x) => x.v === 'live')!;
    const p = tenseItemParts(t, f, S.he);
    expect(p.accepted).toEqual(['has lived', 'has been living']);
    expect(p.distractors).toContain('lives');
    expect(p.distractors).toContain('is living');
  });

  it('renders agreement slots', () => {
    const t = TENSE_TEMPLATES.find((x) => x.id === 'ppc-result')!;
    expect(tenseItemParts(t, t.frames[0], sister).prompt).toBe('My sister looks exhausted — she ___ boxes all morning.');
    expect(tenseItemParts(t, t.frames[0], parents).prompt).toBe('My parents look exhausted — they ___ boxes all morning.');
  });

  it('negative template gives a "not / verb" cue', () => {
    const t = TENSE_TEMPLATES.find((x) => x.id === 'pp-yet')!;
    const p = tenseItemParts(t, t.frames[0], S.I);
    expect(p.cue).toBe('not / finish');
    expect(p.correct).toBe('have not finished');
  });
});

describe('tenses generator', () => {
  it('sweeps 300 seeds with valid, deterministic items', () => {
    const items = sweep(tensesGenerator, 300);
    assertUniformAnswers(items);
  });

  it('each topic generator works', () => {
    for (const g of TENSE_GENERATORS) sweep(g, 60);
  });

  it('generateMany never repeats an item', () => {
    const items = generateMany(tensesGenerator, 'abc', 80);
    const prompts = items.map((i) => ('prompt' in i ? i.prompt + i.type : ''));
    expect(new Set(prompts).size).toBe(items.length);
  });

  it('produces both MCQ and gap items', () => {
    const types = new Set(Array.from({ length: 40 }, (_, i) => tensesGenerator.generate(i).type));
    expect(types).toEqual(new Set(['mcq', 'gap']));
  });
});
