import { S_VERB_HOSTS } from './contractions';

/**
 * Word-count rule for key word transformations (declared in the book, in
 * line with Cambridge practice):
 *  - contracted forms count as the words they stand for: didn't = 2,
 *    can't = 2, I'd = 2, it's = 2, won't = 2;
 *  - "cannot" is one word;
 *  - a possessive 's does not add a word (the manager's = 1);
 *  - a hyphenated word counts as one word (well-known = 1);
 *  - the key word itself is counted.
 */
export function countWordsCambridge(raw: string): number {
  const cleaned = raw
    .normalize('NFC')
    .replace(/[‘’‛ʼ`]/g, "'")
    .replace(/[.,!?;:"()]/g, ' ')
    .trim();
  if (!cleaned) return 0;
  let n = 0;
  for (const tok of cleaned.split(/\s+/)) {
    const t = tok.toLowerCase();
    if (/n't$/.test(t)) n += 2;
    else if (/'(m|re|ve|ll|d)$/.test(t)) n += 2;
    else if (/'s$/.test(t)) n += S_VERB_HOSTS.has(t.slice(0, -2)) ? 2 : 1;
    else n += 1;
  }
  return n;
}

/**
 * The key word must appear unchanged, as a whole word (or phrase). A
 * negative contraction that keeps the word intact is accepted (HAD →
 * hadn't, COULD → couldn't); other contractions are not (WOULD → ’d).
 */
export function containsKeyword(raw: string, keyword: string): boolean {
  const words = raw
    .toLowerCase()
    .replace(/[‘’‛ʼ`]/g, "'")
    .replace(/[.,!?;:"()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const key = keyword.toLowerCase().replace(/[‘’‛ʼ`]/g, "'").trim().split(/\s+/);
  for (let i = 0; i + key.length <= words.length; i++) {
    if (key.every((k, j) => words[i + j] === k || (j === key.length - 1 && words[i + j] === `${k}n't`))) return true;
  }
  return false;
}
