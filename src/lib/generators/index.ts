import type { Item } from '../schema';
import type { Topic } from '../topics';
import type { Generator } from './core';
import { TENSE_GENERATORS, tensesGenerator } from './tenses';
import { passiveGenerator } from './passive';
import { conditionalsGenerator, unrealPastGenerator } from './conditionals';
import { reportedSpeechGenerator } from './reported';
import { makePhrasalGenerator, phrasalGenerator } from './phrasal';
import {
  articlesGenerator,
  collocationsGenerator,
  confusablesGenerator,
  falseFriendsGenerator,
  nounsGenerator,
  prepositionsGenerator,
  wordFormationGenerator,
} from './vocab';
import { lexiconGenerator } from './lexicon';
import { FRAME_GENERATORS } from './grammar-frames';

export type { Generator } from './core';
export { generateMany, itemFingerprint } from './core';

const PARTICLE_GENERATORS: Generator[] = ['up', 'down', 'out', 'off', 'on', 'over', 'back'].map((p) =>
  makePhrasalGenerator((pv) => pv.particle === p, `phrasal-${p}`, `Phrasal verbs with “${p}”`),
);

/** Every generator, by key. */
export const GENERATORS: Generator[] = [
  tensesGenerator,
  ...TENSE_GENERATORS,
  passiveGenerator,
  conditionalsGenerator,
  unrealPastGenerator,
  reportedSpeechGenerator,
  phrasalGenerator,
  ...PARTICLE_GENERATORS,
  wordFormationGenerator,
  nounsGenerator,
  articlesGenerator,
  prepositionsGenerator,
  collocationsGenerator,
  falseFriendsGenerator,
  confusablesGenerator,
  lexiconGenerator,
  ...FRAME_GENERATORS,
];

const BY_KEY = new Map(GENERATORS.map((g) => [g.key, g]));

export function getGenerator(key: string): Generator | undefined {
  return BY_KEY.get(key);
}

/** Generators that produce items for a topic (used by Practice Tests). */
export function generatorsForTopic(topic: Topic): Generator[] {
  const main = GENERATORS.filter((g) => g.topic === topic && !g.key.startsWith('phrasal-') && g.key !== 'tenses');
  return main;
}

/** Topics for which at least one generator exists. */
export function generatedTopics(): Topic[] {
  return [...new Set(GENERATORS.map((g) => g.topic))];
}

/** Rebuild a generated item from its id ("g:<key>:<seed>"). */
export function regenerate(id: string): Item | null {
  const m = /^g:(.+):(\d+)$/.exec(id);
  if (!m) return null;
  const g = BY_KEY.get(m[1]);
  if (!g) return null;
  try {
    return g.generate(Number(m[2]));
  } catch {
    return null;
  }
}
