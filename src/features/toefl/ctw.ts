/**
 * "Complete the Words" (C-test): the first sentence is left intact; from the
 * second sentence on, every second word loses its second half (for odd
 * lengths, the larger half), until the required number of blanks is reached.
 * One-letter words, numbers and capitalised names are skipped.
 */

export interface CtwToken {
  /** Text shown before the blank, or the whole token if not clipped. */
  shown: string;
  /** Missing letters (empty if the token is not a blank). */
  missing: string;
  /** Punctuation and spaces after the word. */
  tail: string;
  blank: boolean;
  /** Index of the blank (0-based) when blank. */
  n: number;
}

export function clipPassage(text: string, blanks = 10): CtwToken[] {
  const firstEnd = text.search(/[.!?](\s|$)/);
  const head = firstEnd >= 0 ? text.slice(0, firstEnd + 1) : text;
  const rest = firstEnd >= 0 ? text.slice(firstEnd + 1) : '';
  const out: CtwToken[] = [{ shown: head, missing: '', tail: '', blank: false, n: -1 }];
  const re = /([A-Za-z’']+)([^A-Za-z’']*)/g;
  let m: RegExpExecArray | null;
  let wordIndex = 0;
  let count = 0;
  const lead = rest.match(/^[^A-Za-z’']*/)?.[0] ?? '';
  if (lead) out.push({ shown: lead, missing: '', tail: '', blank: false, n: -1 });
  while ((m = re.exec(rest))) {
    const word = m[1];
    const tail = m[2];
    wordIndex++;
    const eligible = count < blanks && wordIndex % 2 === 0 && word.length >= 2 && !/^[A-Z]/.test(word) && !/[’']/.test(word);
    if (eligible) {
      const keep = Math.floor(word.length / 2);
      out.push({ shown: word.slice(0, keep), missing: word.slice(keep), tail, blank: true, n: count });
      count++;
    } else {
      out.push({ shown: word, missing: '', tail, blank: false, n: -1 });
    }
  }
  return out;
}

/** A blank is right if the learner typed the missing letters or the whole word. */
export function ctwCorrect(tok: CtwToken, typed: string): boolean {
  const t = typed.trim().toLowerCase();
  if (!t) return false;
  return t === tok.missing.toLowerCase() || t === (tok.shown + tok.missing).toLowerCase();
}
