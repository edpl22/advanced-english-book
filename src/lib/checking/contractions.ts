import type { Contractions } from '../schema';

/**
 * Contraction handling. An answer is expanded into every full form it can
 * stand for ("I'd known" → "i had known" | "i would known"); two answers
 * match when their expansion sets intersect. An item may pin the reading of
 * the ambiguous contractions 'd and 's (e.g. { d: 'had' }).
 */

const IRREGULAR_NEGATIVES: Record<string, string> = {
  "won't": 'will not',
  "shan't": 'shall not',
  "can't": 'can not',
  "ain't": 'is not',
};

/** Pronouns/words after which 's is a verb (is/has), not a possessive. */
export const S_VERB_HOSTS = new Set([
  'it', 'he', 'she', 'that', 'there', 'here', 'what', 'who', 'where', 'when', 'how', 'why', 'this', 'everyone', 'everything', 'nobody', 'nothing', 'someone', 'something', 'one',
]);

const MAX_VARIANTS = 64;

/** Alternatives for a single token (always includes the token itself). */
function tokenAlternatives(tok: string, ctx: Contractions | undefined): string[] {
  const lower = tok.toLowerCase();
  const keepCase = (full: string) => (tok[0] && tok[0] !== tok[0].toLowerCase() ? full[0].toUpperCase() + full.slice(1) : full);

  if (IRREGULAR_NEGATIVES[lower]) return [tok, keepCase(IRREGULAR_NEGATIVES[lower])];

  let m = /^([a-z]+)n't$/i.exec(tok);
  if (m) return [tok, `${m[1]} not`];

  m = /^([a-z]*)'(m|re|ve|ll)$/i.exec(tok);
  if (m) {
    const full = { m: 'am', re: 'are', ve: 'have', ll: 'will' }[m[2].toLowerCase() as 'm' | 're' | 've' | 'll'];
    return [tok, `${m[1]} ${full}`.trim()];
  }

  m = /^([a-z]*)'d$/i.exec(tok);
  if (m) {
    const reads = ctx?.d ? [ctx.d] : ['would', 'had'];
    return [tok, ...reads.map((r) => `${m![1]} ${r}`.trim())];
  }

  m = /^([a-z]*)'s$/i.exec(tok);
  if (m) {
    const host = m[1].toLowerCase();
    if (host === 'let') return [tok, `${m[1]} us`];
    // The token itself covers the possessive reading; verb readings are
    // added for any host, since nouns contract too ("the train's left").
    const reads = ctx?.s ? [ctx.s] : ['is', 'has'];
    return [tok, ...reads.map((r) => `${m![1]} ${r}`.trim())];
  }

  return [tok];
}

/**
 * All full-form readings of a (normalised) answer, including the answer as
 * typed. Variants are capped to keep checking fast.
 */
export function expandContractions(s: string, ctx?: Contractions): string[] {
  const toks = s.split(' ').filter(Boolean);
  let variants: string[][] = [[]];
  for (const tok of toks) {
    const alts = tokenAlternatives(tok, ctx);
    const next: string[][] = [];
    for (const v of variants) {
      for (const a of alts) {
        next.push([...v, a]);
        if (next.length >= MAX_VARIANTS) break;
      }
      if (next.length >= MAX_VARIANTS) break;
    }
    variants = next;
  }
  const out = new Set<string>();
  for (const v of variants) out.add(v.join(' '));
  return [...out];
}

/** The answer with every contraction written out (first reading). */
export function fullForm(s: string, ctx?: Contractions): string {
  const toks = s.split(' ').filter(Boolean);
  return toks
    .map((t) => {
      const alts = tokenAlternatives(t, ctx);
      return alts.length > 1 ? alts[1] : t;
    })
    .join(' ');
}

/** True if any token of the answer is a contraction. */
export function hasContraction(s: string): boolean {
  return s.split(' ').some((t) => tokenAlternatives(t, undefined).length > 1);
}
