import { LEX_SIMILAR, LEXICON, ORIGINS, type LexEntry } from '@content/lexicon';
import { Rng } from '../rng';
import type { Item } from '../schema';
import { buildMcq, genId, type Generator, type ItemMeta } from './core';
import { capitalize } from './conjugate';

/**
 * Words whose meanings are close enough that one could be defended for the
 * other. They are never offered against each other.
 */
const SIMILAR: string[][] = [
  ['kerfuffle', 'fracas', 'imbroglio', 'quagmire', 'maelstrom', 'palaver'],
  ['plethora', 'cornucopia', 'smorgasbord'],
  ['dearth', 'lacuna', 'vestige', 'modicum', 'hiatus'],
  ['panacea', 'elixir', 'alchemy'],
  ['zenith', 'apotheosis'],
  ['charlatan', 'sycophant'],
  ['malfeasance', 'chicanery', 'skulduggery', 'nepotism', 'gerrymander'],
  ['ennui', 'malaise', 'angst'],
  ['sangfroid', 'insouciance', 'gravitas'],
  ['hubris', 'bravado'],
  ['quandary', 'conundrum', 'impasse', 'dichotomy'],
  ['tycoon', 'mogul', 'juggernaut'],
  ['ostracism', 'pariah', 'boycott'],
  ['crepuscule', 'penumbra'],
  ['gobbledygook', 'lingo'],
  ['ephemera', 'paraphernalia'],
  ['effigy', 'doppelgänger'],
  ['harbinger', 'bellwether'],
  ['acumen', 'perspicacity'],
  ['foible', 'idiosyncrasy'],
  ['vicissitude', 'vagary'],
  ['wherewithal', 'gumption'],
  ['saga', 'odyssey'],
  ['bonhomie', 'verve'],
  ['limerence', 'tryst'],
  ['kudos', 'largesse'],
  ...LEX_SIMILAR,
];

export function similarTo(word: string): Set<string> {
  const out = new Set<string>([word]);
  for (const g of SIMILAR) if (g.includes(word)) g.forEach((w) => out.add(w));
  return out;
}

function others(e: LexEntry, pool: LexEntry[]): LexEntry[] {
  const sim = similarTo(e.word);
  return pool.filter((o) => !sim.has(o.word));
}

function meta(e: LexEntry, ref: string, explanation: string): ItemMeta {
  return {
    level: e.level,
    difficulty: e.level === 'C2' ? 5 : e.level === 'C1' ? 4 : 3,
    topic: 'lexicon',
    ref,
    skill: 'vocabulary',
    explanation,
    examTags: ['CPE', 'CAE', 'IELTS', 'TOEFL'],
  };
}

const card = (e: LexEntry) => `${e.word} ${e.ipa} (n.) — ${e.def}. ${e.etym}`;

/** Replace the headword in its example sentence with a gap. */
export function gapExample(e: LexEntry): string | null {
  const re = new RegExp(`\\b${e.word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
  if (!re.test(e.ex)) return null;
  return e.ex.replace(re, '___');
}

/** kind: 0 definition → word · 1 word → definition · 2 etymology · 3 fill the sentence. */
export function lexiconItem(rng: Rng, e: LexEntry, id: string, pool: LexEntry[] = LEXICON, forcedKind?: 0 | 1 | 2 | 3): Item {
  const kind = forcedKind ?? rng.int(4);
  const rest = others(e, pool);
  if (kind === 0) {
    return buildMcq(rng, id, `Which word means “${e.def}”?`, e.word, rest.map((o) => o.word), [e.word], {
      ...meta(e, 'Lexicon', card(e)),
      instruction: 'Definition → word.',
    });
  }
  if (kind === 1) {
    return buildMcq(rng, id, `What does “${e.word}” mean?`, capitalize(e.def), rest.map((o) => capitalize(o.def)), [capitalize(e.def)], {
      ...meta(e, 'Lexicon', card(e)),
      instruction: 'Word → definition.',
    });
  }
  if (kind === 2 && e.origin !== 'Unknown') {
    const mentioned = ORIGINS.filter((o) => o !== e.origin && e.etym.includes(o.split('/')[0]));
    const wrong = ORIGINS.filter((o) => o !== e.origin && o !== 'Unknown' && !mentioned.includes(o));
    return buildMcq(rng, id, `Etymology detective: where does “${e.word}” come from?`, e.origin, wrong, [e.origin], {
      ...meta(e, 'Lexicon', card(e)),
      instruction: 'Choose the source language.',
    });
  }
  const gapped = gapExample(e);
  if (gapped) {
    return buildMcq(rng, id, gapped, e.word, rest.map((o) => o.word), [e.word], {
      ...meta(e, 'Lexicon', card(e)),
      instruction: 'Fill the sentence with the right word.',
    });
  }
  return buildMcq(rng, id, `Which word means “${e.def}”?`, e.word, rest.map((o) => o.word), [e.word], meta(e, 'Lexicon', card(e)));
}

export const lexiconGenerator: Generator = {
  key: 'lexicon',
  title: 'Rare nouns',
  topic: 'lexicon',
  ref: 'Lexicon',
  generate(seed: number): Item {
    const rng = new Rng(seed);
    const e = rng.pick(LEXICON);
    return lexiconItem(rng, e, genId('lexicon', seed));
  },
};

/** "Real or Fake?": the real definition among invented ones (UI game helper). */
export function realOrFake(rng: Rng, e: LexEntry): { word: string; options: string[]; answer: number } {
  const options = rng.shuffle([e.def, ...e.fakes]);
  return { word: e.word, options, answer: options.indexOf(e.def) };
}
