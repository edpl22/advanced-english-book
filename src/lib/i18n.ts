import { useCallback } from 'react';
import { useStore } from './useStore';
import { PT } from './i18n-pt';

/**
 * Interface language. The study material (rules, examples, exercises,
 * texts) is English by design; everything around it — navigation,
 * instructions, buttons, feedback — is shown in Brazilian Portuguese by
 * default, with English as an option.
 *
 * Strings are keyed by their English text: t('Check') returns 'Corrigir'
 * in Portuguese and 'Check' in English. {name} placeholders are filled from
 * the second argument. A missing translation falls back to English, and a
 * test checks that every t('…') literal in the source has an entry.
 */

export type Lang = 'pt' | 'en';
export type Vars = Record<string, string | number>;

export function translate(lang: Lang, en: string, vars?: Vars): string {
  const s = lang === 'pt' ? (PT[en] ?? en) : en;
  return vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : s;
}

export function useLang(): Lang {
  return useStore().settings.lang;
}

export type T = (en: string, vars?: Vars) => string;

export function useT(): T {
  const lang = useLang();
  return useCallback((en: string, vars?: Vars) => translate(lang, en, vars), [lang]);
}

/** Numbers in the interface language's style (1.300 or 1,300). */
export function fmtNum(lang: Lang, n: number): string {
  return n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-GB');
}

/** A date in the interface language. */
export function fmtDate(lang: Lang, d: Date, opts: Intl.DateTimeFormatOptions): string {
  return d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB', opts);
}

/** Marks a string for translation where it is defined; t() translates it where it is shown. */
export const N_ = (en: string): string => en;

/** The BCP 47 tag of the interface language, for lang attributes on interface text inside English content. */
export function useLangTag(): string {
  return useLang() === 'pt' ? 'pt-BR' : 'en';
}
