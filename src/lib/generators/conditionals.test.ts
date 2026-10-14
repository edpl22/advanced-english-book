import { describe, expect, it } from 'vitest';
import {
  condParts,
  condSentence,
  conditionalsGenerator,
  inversion,
  inversionWordOrder,
  unrealPastGenerator,
  wishPastParts,
  wishPresentParts,
} from './conditionals';
import { COND_FRAMES, WISH_PAST, WISH_PRESENT, type CondType } from '@content/data/conditional-frames';
import { getVerb } from '@content/data/verbs';
import { assertUniformAnswers, assertValidItem, sweep } from './testkit';
import { normalize } from '../checking/normalize';
import { contract } from './conjugate';

const frame = (id: string) => COND_FRAMES.find((f) => f.id === id)!;

describe('conditional sentences (golden)', () => {
  it.each<[string, CondType, string]>([
    ['water', 'zero', 'If you heat water to 100°C, it boils.'],
    ['plants', 'zero', "If you don't water plants, they die."],
    ['train', 'first', 'If we leave right away, we will catch the last train.'],
    ['train', 'second', 'If we left right away, we would catch the last train.'],
    ['train', 'third', 'If we had left right away, we would have caught the last train.'],
    ['exam', 'third', 'If she had studied harder, she would have passed the exam.'],
    ['were-you', 'second', 'If I were you, I would accept the offer.'],
    ['driver', 'third', "If the driver hadn't been so tired, the accident wouldn't have happened."],
    ['flight', 'mixed-past-present', "If I hadn't missed the flight, I would be in Rome now."],
    ['medicine', 'mixed-past-present', 'If he had studied medicine, he would be a doctor today.'],
    ['organised', 'mixed-present-past', "If he were more organised, he wouldn't have forgotten the meeting yesterday."],
    ['german', 'mixed-present-past', 'If I spoke German, I would have applied for that job last year.'],
    ['act', 'first', "If we don't act quickly, the situation will get worse."],
    ['warned', 'third', 'If someone had warned us, we would have cancelled the trip.'],
    ['rain', 'first', 'If it rains on Saturday, we will hold the party indoors.'],
  ])('%s · %s', (id, type, out) => {
    expect(condSentence(frame(id), type, null)).toBe(out);
  });

  it('main clause first when allowed', () => {
    expect(condSentence(frame('exam'), 'second', null, true)).toBe('She would pass the exam if she studied harder.');
  });

  it('zero conditional also accepts will', () => {
    expect(condParts(frame('water'), 'zero').mainAccepted).toEqual(['boils', 'will boil']);
  });

  it('second conditional with be accepts were and was', () => {
    expect(condParts(frame('were-you'), 'second').ifAccepted).toEqual(['were', 'was']);
  });

  it('no wrong option is ever an accepted one', () => {
    for (const f of COND_FRAMES) {
      for (const t of f.types) {
        const p = condParts(f, t);
        const ifAcc = new Set(p.ifAccepted.map((x) => normalize(x)));
        const mainAcc = new Set(p.mainAccepted.map((x) => normalize(x)));
        for (const w of p.ifWrong) expect(ifAcc.has(normalize(w)), `${f.id} ${t} if: ${w}`).toBe(false);
        for (const w of p.mainWrong) expect(mainAcc.has(normalize(w)), `${f.id} ${t} main: ${w}`).toBe(false);
        expect(p.ifWrong.length).toBeGreaterThanOrEqual(3);
        expect(p.mainWrong.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('classic errors appear as distractors', () => {
    expect(condParts(frame('rain'), 'first').ifWrong).toContain('will rain');
    expect(condParts(frame('exam'), 'second').ifWrong).toContain('would study');
    expect(condParts(frame('train'), 'third').ifWrong).toContain('would have left');
  });

  it('every frame uses verbs in the table', () => {
    for (const f of COND_FRAMES) {
      expect(() => getVerb(f.ifc.v)).not.toThrow();
      expect(() => getVerb(f.main.v)).not.toThrow();
    }
  });
});

describe('inversion', () => {
  it.each<[string, CondType, string]>([
    ['train', 'third', 'Had we left'],
    ['driver', 'third', 'Had the driver not been'],
    ['were-you', 'second', 'Were I'],
    ['exam', 'second', 'Were she to study'],
    ['rain', 'first', 'Should it rain'],
    ['flight', 'mixed-past-present', 'Had I not missed'],
    ['organised', 'mixed-present-past', 'Were he'],
  ])('%s · %s → %s', (id, type, ans) => {
    expect(inversion(frame(id), type)?.answer).toBe(ans);
  });

  it('no "were … to" with states or past results', () => {
    expect(inversion(frame('piano'), 'second')).toBeNull();
    expect(inversion(frame('german'), 'mixed-present-past')).toBeNull();
    expect(inversion(frame('act'), 'first')).toBeNull();
  });

  it('inverted answers fit the KWT limit', () => {
    for (const f of COND_FRAMES)
      for (const t of f.types) {
        const inv = inversion(f, t);
        if (inv) expect(inv.answer.split(' ').length).toBeLessThanOrEqual(5);
      }
  });

  it('word-order items are valid', () => {
    const w = inversionWordOrder(frame('train'), 'third', 'wo-1')!;
    expect(w.acceptedAnswers[0]).toBe('Had we left right away, we would have caught the last train.');
    assertValidItem({ ...w });
  });
});

describe('unreal past', () => {
  it.each(WISH_PRESENT.map((f, i) => [i, f]))('wish (present) frame %i', (_i, f) => {
    const p = wishPresentParts(f);
    expect(p.accepted.length).toBeGreaterThan(0);
    for (const w of p.wrong) expect(p.accepted).not.toContain(w);
  });

  it('golden wish forms', () => {
    expect(wishPresentParts(WISH_PRESENT[0]).accepted).toEqual(['had']);
    expect(wishPresentParts(WISH_PRESENT[1]).accepted).toEqual(['did not live']);
    expect(wishPresentParts(WISH_PRESENT[4]).accepted).toEqual(['could drive']);
    expect(wishPresentParts(WISH_PRESENT[5]).accepted).toEqual(['were not', 'was not']);
    expect(wishPresentParts(WISH_PRESENT[0]).reality).toBe("I don't have a car.");
    expect(wishPastParts(WISH_PAST[0]).accepted).toEqual(['had gone']);
    expect(wishPastParts(WISH_PAST[1]).accepted).toEqual(['had not said']);
    expect(wishPastParts(WISH_PAST[0]).regret).toBe('I regret not going to the conference.');
    expect(wishPastParts(WISH_PAST[6]).regret).toBe('He regrets selling his shares so early.');
  });

  it('contract() shortens negatives for display only', () => {
    expect(contract('If I had not seen it, I would not have known')).toBe("If I hadn't seen it, I wouldn't have known");
  });

  it('sweeps 300 seeds', () => {
    const items = sweep(unrealPastGenerator, 300);
    assertUniformAnswers(items);
  });
});

describe('conditionals generator', () => {
  it('sweeps 400 seeds', () => {
    const items = sweep(conditionalsGenerator, 400);
    assertUniformAnswers(items);
  });

  it('produces gap, MCQ, KWT and error-correction items', () => {
    const types = new Set(Array.from({ length: 300 }, (_, i) => conditionalsGenerator.generate(i).type));
    expect(types).toEqual(new Set(['gap', 'mcq', 'kwt', 'error-correction']));
  });
});
