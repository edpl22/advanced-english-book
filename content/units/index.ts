import { U01 } from './u01-present-past';
import { U02 } from './u02-perfect-tenses';
import { U07 } from './u07-conditionals';
import { U22 } from './u22-phrasal-verbs';
import { U03 } from './u03-narrative-tenses';
import { U04 } from './u04-future';
import { U05 } from './u05-modals';
import { U06 } from './u06-modals-deduction';
import { U08 } from './u08-unreal-past';
import { U09 } from './u09-passive';
import { U10 } from './u10-reported-speech';
import { U11 } from './u11-verb-patterns';
import { U12 } from './u12-nouns';
import { U13 } from './u13-noun-phrase';
import { U14 } from './u14-articles';
import { U15 } from './u15-quantifiers';
import { U16 } from './u16-pronouns';
import { U17 } from './u17-adjectives';
import { U18 } from './u18-adverbs';
import { U19 } from './u19-prepositions';
import { U20 } from './u20-relative-clauses';
import { U21 } from './u21-linkers';
import { U23 } from './u23-inversion';
import { U24 } from './u24-cleft-ellipsis';
import { U25 } from './u25-questions-agreement';
import { U26 } from './u26-word-formation';
import { U27 } from './u27-collocations';
import { U28 } from './u28-false-friends';
import { U29 } from './u29-academic';
import type { Unit } from './types';

export * from './types';
export { TOC, ALL_TOC_UNITS, tocUnit, unitIdForRef } from './toc';

/** Units with full content, in book order. */
export const UNITS: Unit[] = [U01, U02, U03, U04, U05, U06, U07, U08, U09, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U21, U22, U23, U24, U25, U26, U27, U28, U29];

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id);
}

/** All authored items from the units, keyed by id. */
export function unitItems() {
  return UNITS.flatMap((u) => u.exercises.flatMap((e) => e.items));
}
