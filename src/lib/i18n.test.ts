import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { translate } from './i18n';
import { PT } from './i18n-pt';
import { ITEM_TYPE_LABELS } from './schema';
import { PART_TITLES, TOPIC_INFO } from './topics';
import { TOEFL_CONFIG } from '@content/toefl/toefl.config';

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return sources(p);
    return /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) ? [p] : [];
  });
}

/** Every string literal passed to t(), tr() or N_() in the source. */
function keys(): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const re = /\b(?:t|N_)\(\s*(['"])((?:\\.|(?!\1).)*)\1|\btr\(\s*\w+\s*,\s*(['"])((?:\\.|(?!\3).)*)\3/g;
  // Only modules that use the translation helpers.
  for (const file of [...sources('src'), ...sources('content')]) {
    const text = readFileSync(file, 'utf8');
    if (!/from '(@\/lib|\.)\/i18n'/.test(text)) continue;
    for (const m of text.matchAll(re)) out.push([(m[2] ?? m[4]).replace(/\\(['"\\])/g, '$1'), file]);
  }
  return out;
}

describe('interface translation', () => {
  it('every interface string has a Portuguese version', () => {
    const missing = keys()
      .filter(([k]) => !(k in PT))
      .map(([k, f]) => `${f}: ${k}`);
    expect(missing).toEqual([]);
  });

  it('every feedback message of the checker has a Portuguese version', () => {
    const text = readFileSync('src/lib/checking/check.ts', 'utf8');
    const msgs = [...text.matchAll(/single\(\s*'\w+',\s*'([^']+)'/g)].map((m) => m[1]);
    msgs.push(/const SPELLING = '([^']+)'/.exec(text)![1]);
    expect(msgs.length).toBeGreaterThan(8);
    expect(msgs.filter((m) => !(m in PT))).toEqual([]);
  });

  it('item types, topics, parts and TOEFL rubric have Portuguese labels', () => {
    const labels = [
      ...Object.values(ITEM_TYPE_LABELS),
      ...Object.values(TOPIC_INFO).map((x) => x.label),
      ...Object.values(PART_TITLES),
      ...TOEFL_CONFIG.rubric,
      TOEFL_CONFIG.formatLabel,
    ];
    expect(labels.filter((l) => !(l in PT))).toEqual([]);
  });

  it('placeholders match between English and Portuguese', () => {
    const ph = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    for (const [en, pt] of Object.entries(PT)) expect(ph(pt), en).toEqual(ph(en));
  });

  it('translates, fills placeholders and falls back to English', () => {
    expect(translate('pt', '{n}-day streak', { n: 3 })).toBe('sequência de 3 dias');
    expect(translate('en', '{n}-day streak', { n: 3 })).toBe('3-day streak');
    expect(translate('pt', 'No such string')).toBe('No such string');
  });
});
