import { allVerbForms } from '@content/data/verbs';
import { LEXICON } from '@content/lexicon';
import { FUNCTION_WORDS } from './checking';

let cache: Set<string> | null = null;

/**
 * Real word forms used by the checker to tell a spelling slip ("recieved")
 * from a different word ("lives" for "lived").
 */
export function knownWords(): ReadonlySet<string> {
  if (cache) return cache;
  const s = new Set<string>(FUNCTION_WORDS);
  for (const f of allVerbForms()) s.add(f);
  for (const e of LEXICON) s.add(e.word.toLowerCase());
  cache = s;
  return s;
}
