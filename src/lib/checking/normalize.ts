/**
 * Text normalisation applied to both the learner's answer and every accepted
 * answer before they are compared.
 *
 * Rules (documented in "How to Use This Book"):
 *  - Unicode NFC; curly quotes and apostrophes become straight ones;
 *  - leading/trailing spaces removed, runs of spaces collapsed;
 *  - case ignored unless the item says case matters;
 *  - final punctuation (. ! ? ; : ,) is optional;
 *  - commas inside the answer are ignored (comma and capital-letter points
 *    are tested with multiple choice; typed punctuation items test marks such
 *    as ; : and the apostrophe, which are kept);
 *  - "cannot" and "can not" are treated as the same word.
 */

export interface NormalizeOptions {
  caseSensitive?: boolean;
  /** Keep internal commas (punctuation exercises). */
  keepCommas?: boolean;
}

const APOSTROPHES = /[‘’‛ʼ`´′]/g;
const DOUBLE_QUOTES = /[“”„‟«»″]/g;
const DASHES = /[‐‑‒–—―−]/g;
const SPACES = /[\s  -​ 　]+/g;

export function normalize(input: string, opts: NormalizeOptions = {}): string {
  let s = (input ?? '').normalize('NFC');
  s = s.replace(APOSTROPHES, "'").replace(DOUBLE_QUOTES, '"').replace(DASHES, '-');
  s = s.replace(SPACES, ' ').trim();
  // Strip wrapping quotes the learner may have typed around the answer.
  s = s.replace(/^["']+(.*?)["']+$/, '$1').trim();
  // Final punctuation is optional.
  s = s.replace(/[\s.!?;:,]+$/, '');
  if (!opts.keepCommas) s = s.replace(/\s*,\s*/g, ' ');
  // No space before punctuation, one after.
  s = s.replace(/\s+([.!?;:,])/g, '$1');
  s = s.replace(SPACES, ' ').trim();
  if (!opts.caseSensitive) s = s.toLowerCase();
  // cannot = can not (both are standard spellings).
  s = s.replace(/\bcannot\b/gi, (m) => (m[0] === 'C' ? 'Can not' : 'can not'));
  return s;
}

/** Split a normalised string into word tokens. */
export function tokens(s: string): string[] {
  return s.split(' ').filter(Boolean);
}
