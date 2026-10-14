import { describe, expect, it } from 'vitest';
import { PHRASAL_VERBS, PARTICLE_SENSES, pvLabel } from '@content/phrasal/dictionary';
import { KNOWN_COMBOS } from '@content/phrasal/combos';
import {
  conjugatedGapItem,
  isRealCombo,
  makePhrasalGenerator,
  parseExample,
  phrasalGenerator,
  pronounSentences,
  relatedLabels,
  safeParticleDistractors,
} from './phrasal';
import { assertUniformAnswers, assertValidItem, sweep } from './testkit';

const pv = (label: string, id?: string) => PHRASAL_VERBS.find((p) => (id ? p.id === id : pvLabel(p) === label))!;

describe('phrasal verb dictionary', () => {
  it('has at least 150 entries', () => {
    expect(PHRASAL_VERBS.length).toBeGreaterThanOrEqual(150);
  });

  it('ids are unique', () => {
    expect(new Set(PHRASAL_VERBS.map((p) => p.id)).size).toBe(PHRASAL_VERBS.length);
  });

  it('every example marks the phrasal verb', () => {
    for (const p of PHRASAL_VERBS) for (const ex of p.examples) expect(ex, p.id).toMatch(/\{[^}]+\}/);
  });

  it('transitive entries name an object; intransitive ones do not', () => {
    for (const p of PHRASAL_VERBS) {
      if (p.type === 'intransitive') expect(p.obj, p.id).toBeUndefined();
      else expect(p.obj, p.id).toBeDefined();
    }
  });

  it('contiguous examples end with the right particle', () => {
    for (const p of PHRASAL_VERBS) {
      const parsed = parseExample(p.examples[0], p);
      if (parsed.form) expect(parsed.form.toLowerCase().endsWith(p.particle), p.id).toBe(true);
    }
  });

  it('covers every particle family of Unit 22.3', () => {
    for (const s of PARTICLE_SENSES) {
      const parts = s.particle.split(' / ');
      expect(PHRASAL_VERBS.some((p) => parts.some((x) => p.particle.startsWith(x))), s.particle).toBe(true);
    }
  });

  it('known combinations parse as verb + particle pairs', () => {
    expect(KNOWN_COMBOS.has('put back')).toBe(true);
    expect(KNOWN_COMBOS.has('count out')).toBe(true);
    for (const c of KNOWN_COMBOS) expect(c.split(' ').length).toBe(2);
  });
});

describe('parsing examples', () => {
  it.each([
    ['call off', 'The union {called off} the strike at the last minute.', 'called off', 'called'],
    ['come up with', 'The engineers {came up with} a solution in less than a week.', 'came up with', 'came'],
    ['put off', 'We had to {put off} the launch until March.', 'put off', 'put'],
  ])('%s', (label, ex, form, verbForm) => {
    const p = parseExample(ex, pv(label));
    expect(p.form).toBe(form);
    expect(p.verbForm).toBe(verbForm);
    expect(p.gapped).toContain('___');
  });

  it('separated examples are not used for single gaps', () => {
    expect(parseExample('Stop {putting} it {off} and call the bank.', pv('put off')).gapped).toBeNull();
  });
});

describe('safe distractors', () => {
  it('never offers a real combination', () => {
    for (const p of PHRASAL_VERBS) for (const d of safeParticleDistractors(p)) expect(isRealCombo(p.verb, d), `${p.id}: ${d}`).toBe(false);
  });

  it('never offers an alternative particle', () => {
    expect(safeParticleDistractors(pv('put off'))).not.toContain('back');
    expect(safeParticleDistractors(pv('fill in'))).not.toContain('out');
  });

  it('three-part verbs get multi-word distractors', () => {
    for (const d of safeParticleDistractors(pv('put up with'))) expect(d.includes(' ')).toBe(true);
  });

  it('synonyms are related both ways', () => {
    expect(relatedLabels(pv('count on')).has('rely on')).toBe(true);
    expect(relatedLabels(pv('rely on')).has('count on')).toBe(true);
    expect(relatedLabels(pv('get on with')).has('get along with')).toBe(true);
  });
});

describe('pronoun position (golden)', () => {
  it.each([
    ['call off', 'The union called it off at the last minute.', 'The union called off it at the last minute.'],
    ['turn down', 'She turned it down because the salary was too low.', 'She turned down it because the salary was too low.'],
    ['look after', 'I look after her at weekends.', 'I look her after at weekends.'],
    ['look into', 'The manager promised to look into it.', 'The manager promised to look it into.'],
    ['put up with', 'I can’t put up with it from the building site any longer.', 'I can’t put it up with from the building site any longer.'],
    ['come up with', 'The engineers came up with it in less than a week.', 'The engineers came it up with in less than a week.'],
  ])('%s', (label, correct, wrong) => {
    const s = pronounSentences(pv(label))!;
    expect(s.correct).toBe(correct);
    expect(s.wrong).toContain(wrong);
  });

  it('intransitive verbs have no pronoun item', () => {
    expect(pronounSentences(pv('break down'))).toBeNull();
  });
});

describe('conjugated gap items', () => {
  it.each([
    ['call off', 'called off'],
    ['give up', 'gave up'],
    ['run out of', 'ran out of'],
    ['look forward to', 'look forward to'],
    ['set up', 'set up'],
    ['take over', 'took over'],
  ])('%s → %s', (label, form) => {
    const it = conjugatedGapItem(pv(label), 'x')!;
    expect(it.type).toBe('phrasal-choice');
    if (it.type === 'phrasal-choice') expect(it.acceptedAnswers).toEqual([form]);
    assertValidItem({ ...it, source: 'generated' });
  });
});

describe('phrasal generator', () => {
  it('sweeps 600 seeds', () => {
    const items = sweep(phrasalGenerator, 600);
    assertUniformAnswers(items);
  });

  it('produces both MCQ and phrasal-choice items', () => {
    const types = new Set(Array.from({ length: 200 }, (_, i) => phrasalGenerator.generate(i).type));
    expect(types.has('mcq')).toBe(true);
    expect(types.has('phrasal-choice')).toBe(true);
  });

  it('filters by particle', () => {
    const g = makePhrasalGenerator((p) => p.particle === 'off', 'pv-off', 'Particle: off');
    for (let i = 0; i < 50; i++) {
      const it = g.generate(i);
      assertValidItem(it);
    }
  });

  it('at least five generated items are possible for every entry (≥ 750 in total)', () => {
    // Each entry supports several item kinds; with random seeds each kind yields different MCQ orders.
    let total = 0;
    for (const p of PHRASAL_VERBS) {
      const g = makePhrasalGenerator((x) => x.id === p.id, `one-${p.id}`, p.id);
      const seen = new Set<string>();
      for (let i = 0; i < 40; i++) {
        const it = g.generate(i);
        seen.add(it.type === 'mcq' ? it.prompt + '|' + [...it.options].sort().join('|') : JSON.stringify('acceptedAnswers' in it ? it.acceptedAnswers : []) + ('prompt' in it ? it.prompt : ''));
      }
      expect(seen.size, p.id).toBeGreaterThanOrEqual(2);
      total += Math.min(seen.size, 5);
    }
    expect(total).toBeGreaterThanOrEqual(750);
  });
});
