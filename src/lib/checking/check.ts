import type { Contractions, Item } from '../schema';
import { normalize, tokens, type NormalizeOptions } from './normalize';
import { expandContractions } from './contractions';
import { levenshtein } from './levenshtein';
import { containsKeyword, countWordsCambridge } from './kwt';

export type Verdict = 'correct' | 'almost' | 'incorrect';

export interface CheckResult {
  verdict: Verdict;
  /** Points earned (cloze gaps and matching pairs score one each). */
  score: number;
  maxScore: number;
  /** Extra feedback: spelling notice, word limit, missing key word… */
  /** Feedback in English, with {placeholders} filled from messageVars (translated by the interface). */
  message?: string;
  messageVars?: Record<string, string | number>;
  /** Per-gap / per-pair verdicts for multi-part items. */
  parts?: Verdict[];
}

export interface ErrorResponse {
  index: number;
  correction: string;
}

export type ItemResponse = number | string | number[] | string[] | ErrorResponse | null | undefined;

export interface CheckOptions {
  /**
   * Real English word forms. A one-letter slip that produces another real
   * word ("lives" for "lived", "on" for "in") is a grammar error, not a
   * spelling slip, so it is never graded "almost".
   */
  knownWords?: ReadonlySet<string>;
}

/** Small closed-class list used when no larger word list is supplied. */
export const FUNCTION_WORDS: ReadonlySet<string> = new Set(
  (
    'a an the this that these those some any no every each either neither all both few little many much more most less least ' +
    'i you he she it we they me him her us them my your his its our their mine yours hers ours theirs myself yourself himself herself itself ourselves themselves ' +
    'in on at by for from of off out over under up down into onto upon with without within through throughout to toward towards about above across after against along among around before behind below beneath beside besides between beyond despite during except inside near outside since than till until unlike via ' +
    'and but or nor so yet if unless whether because although though while whereas when whenever where wherever which who whom whose what whatever how why ' +
    'be am is are was were been being have has had having do does did done doing will would shall should can could may might must ought need dare ' +
    'not never ever only just still already even too very quite rather well then there here now once'
  ).split(' '),
);

const ALMOST_MIN_LENGTH = 4;

function variantsOf(s: string, opts: NormalizeOptions, ctx?: Contractions): string[] {
  const n = normalize(s, opts);
  return n ? expandContractions(n, ctx) : [];
}

export interface TextMatch {
  match: boolean;
  /** Set when the answer is one spelling slip away from an accepted answer. */
  almost?: { typed: string; expected: string };
}

/**
 * Compare a typed answer with a list of accepted answers.
 */
export function matchText(
  typed: string,
  accepted: readonly string[],
  o: { caseSensitive?: boolean; contractions?: Contractions; noAlmost?: boolean; keepCommas?: boolean } & CheckOptions = {},
): TextMatch {
  const opts: NormalizeOptions = { caseSensitive: o.caseSensitive, keepCommas: o.keepCommas };
  const userVariants = variantsOf(typed, opts, o.contractions);
  if (userVariants.length === 0) return { match: false };
  const userSet = new Set(userVariants);
  for (const acc of accepted) {
    for (const v of variantsOf(acc, opts, o.contractions)) if (userSet.has(v)) return { match: true };
  }
  if (o.noAlmost) return { match: false };

  // "Almost": whole answer within edit distance 1 of an accepted answer, and
  // the slip is inside a word of 4+ letters that is not itself a real form.
  const known = o.knownWords ?? FUNCTION_WORDS;
  const userNorm = normalize(typed, { ...opts, caseSensitive: false });
  for (const acc of accepted) {
    const accNorm = normalize(acc, { ...opts, caseSensitive: false });
    if (levenshtein(userNorm, accNorm, 1, true) > 1) continue;
    const ut = tokens(userNorm);
    const at = tokens(accNorm);
    if (ut.length === at.length) {
      const diff = ut.findIndex((t, i) => t !== at[i]);
      if (diff < 0) continue; // differs only in case, handled above
      const u = ut[diff];
      const a = at[diff];
      if (Math.min(u.length, a.length) >= ALMOST_MIN_LENGTH && !known.has(u.replace(/[^a-z'-]/g, ''))) {
        return { match: false, almost: { typed: u, expected: a } };
      }
    } else if (userNorm.replace(/ /g, '') === accNorm.replace(/ /g, '') && accNorm.length >= ALMOST_MIN_LENGTH) {
      // "alot" / "a lot", "every day" / "everyday" are spacing slips.
      return { match: false, almost: { typed: userNorm, expected: accNorm } };
    }
  }
  return { match: false };
}

const SPELLING = 'Almost — check your spelling: “{typed}” → “{expected}”.';

function verdictFromMatch(m: TextMatch): Verdict {
  return m.match ? 'correct' : m.almost ? 'almost' : 'incorrect';
}

function single(verdict: Verdict, message?: string, messageVars?: Record<string, string | number>): CheckResult {
  return { verdict, score: verdict === 'correct' ? 1 : 0, maxScore: 1, message, messageVars };
}

function spelling(verdict: Verdict, a: { typed: string; expected: string }): CheckResult {
  return single(verdict, SPELLING, { typed: a.typed, expected: a.expected });
}

/**
 * Learners sometimes retype the whole second sentence. Return the typed text
 * with and without the frame (whole words only: before "We" must not eat the
 * start of "were"); the caller grades every reading and keeps the best, so an
 * answer that happens to end with the same word as the frame is not damaged.
 */
function frameReadings(typed: string, before: string, after: string): string[] {
  const out = [typed.trim()];
  const b = before.trim().toLowerCase();
  const a = after.trim().replace(/[.!?]$/, '').toLowerCase();
  for (const t of [...out]) {
    if (b && t.toLowerCase().startsWith(b) && /^(\s|$)/.test(t.slice(b.length))) out.push(t.slice(b.length).trim());
  }
  for (const t of [...out]) {
    const tl = t.toLowerCase().replace(/[.!?]$/, '');
    if (a && tl.endsWith(a) && /(^|\s)$/.test(tl.slice(0, tl.length - a.length))) out.push(t.slice(0, tl.length - a.length).trim());
  }
  return [...new Set(out)].filter(Boolean);
}

const RANK: Record<Verdict, number> = { correct: 2, almost: 1, incorrect: 0 };

/** Check a learner's response against an item. */
export function checkItem(item: Item, response: ItemResponse, options: CheckOptions = {}): CheckResult {
  switch (item.type) {
    case 'mcq':
    case 'reading': {
      if (typeof response !== 'number' || response < 0) return single('incorrect', 'No option selected.');
      return single(response === item.answer ? 'correct' : 'incorrect');
    }

    case 'gap':
    case 'word-formation':
    case 'phrasal-choice': {
      const typed = typeof response === 'string' ? response : '';
      if (!typed.trim()) return single('incorrect', 'No answer given.');
      const m = matchText(typed, item.acceptedAnswers, {
        caseSensitive: item.caseSensitive,
        contractions: item.contractions,
        noAlmost: item.noAlmost,
        knownWords: options.knownWords,
      });
      return m.almost ? spelling(verdictFromMatch(m), m.almost) : single(verdictFromMatch(m));
    }

    case 'kwt': {
      const readings = typeof response === 'string' ? frameReadings(response, item.before, item.after) : [];
      if (!readings.length) return single('incorrect', 'No answer given.');
      const min = item.minWords ?? 2;
      const max = item.maxWords ?? 5;
      let best: CheckResult | null = null;
      for (const raw of readings) {
        let r: CheckResult;
        if (!containsKeyword(raw, item.keyword)) {
          r = single('incorrect', 'You must use the key word {keyword}, without changing it.', { keyword: item.keyword });
        } else {
          const n = countWordsCambridge(raw);
          if (n < min || n > max) {
            r = single('incorrect', 'Use between {min} and {max} words, including the key word (you used {n}; contractions count as two words).', { min, max, n });
          } else {
            const m = matchText(raw, item.acceptedAnswers, { contractions: item.contractions, knownWords: options.knownWords });
            r = m.almost ? spelling(verdictFromMatch(m), m.almost) : single(verdictFromMatch(m));
          }
        }
        // Prefer the better verdict; among wrong readings keep the most specific message (the stripped one).
        if (!best || RANK[r.verdict] > RANK[best.verdict] || (r.verdict === best.verdict && r.verdict === 'incorrect')) best = r;
        if (best.verdict === 'correct') break;
      }
      return best!;
    }

    case 'error-correction': {
      const r = response as ErrorResponse | null | undefined;
      if (!r || typeof r !== 'object' || Array.isArray(r) || r.index < 0) return single('incorrect', 'Select the underlined part that contains the error.');
      if (r.index !== item.errorIndex) return single('incorrect', 'The error is in a different underlined part.');
      if (!r.correction?.trim()) return single('incorrect', 'You found the error — now write the correction.');
      const m = matchText(r.correction, item.acceptedAnswers, {
        contractions: item.contractions,
        knownWords: options.knownWords,
      });
      if (m.match) return single('correct');
      if (m.almost) return spelling('almost', m.almost);
      return single('incorrect', 'You found the error, but the correction is not right.');
    }

    case 'matching': {
      const r = Array.isArray(response) ? (response as number[]) : [];
      const parts: Verdict[] = item.answer.map((a, i) => (r[i] === a ? 'correct' : 'incorrect'));
      const score = parts.filter((p) => p === 'correct').length;
      return { verdict: score === parts.length ? 'correct' : 'incorrect', score, maxScore: parts.length, parts };
    }

    case 'word-order': {
      const typed = Array.isArray(response) ? (response as string[]).join(' ') : typeof response === 'string' ? response : '';
      if (!typed.trim()) return single('incorrect', 'Put the fragments in order.');
      // Word order is about order, not punctuation: fragments carry their own
      // commas and full stops, which end up mid-sentence in other valid orders.
      const strip = (x: string) => x.replace(/[.,;:!?"“”]/g, ' ');
      const m = matchText(strip(typed), item.acceptedAnswers.map(strip), { noAlmost: true });
      return single(m.match ? 'correct' : 'incorrect');
    }

    case 'open-cloze': {
      const r = Array.isArray(response) ? (response as string[]) : [];
      const parts: Verdict[] = item.gaps.map((g, i) => {
        const typed = typeof r[i] === 'string' ? r[i] : '';
        if (!typed.trim()) return 'incorrect';
        // Open cloze answers are single function words: no "almost".
        return verdictFromMatch(matchText(typed, g.acceptedAnswers, { noAlmost: true }));
      });
      const score = parts.filter((p) => p === 'correct').length;
      return { verdict: score === parts.length ? 'correct' : 'incorrect', score, maxScore: parts.length, parts };
    }

    case 'mc-cloze': {
      const r = Array.isArray(response) ? (response as number[]) : [];
      const parts: Verdict[] = item.gaps.map((g, i) => (r[i] === g.answer ? 'correct' : 'incorrect'));
      const score = parts.filter((p) => p === 'correct').length;
      return { verdict: score === parts.length ? 'correct' : 'incorrect', score, maxScore: parts.length, parts };
    }
  }
}

/** The answer to display for "Show answer" and in the Answer Key. */
export function answerText(item: Item): string {
  switch (item.type) {
    case 'mcq':
    case 'reading':
      return `${String.fromCharCode(97 + item.answer)}) ${item.options[item.answer]}`;
    case 'gap':
    case 'word-formation':
    case 'phrasal-choice':
    case 'kwt':
      return item.acceptedAnswers.join(' / ');
    case 'error-correction': {
      const underlined = item.parts.filter((p): p is { u: string } => typeof p !== 'string');
      return `“${underlined[item.errorIndex].u}” → ${item.acceptedAnswers.join(' / ')}`;
    }
    case 'matching':
      return item.answer.map((a, i) => `${i + 1}–${String.fromCharCode(97 + a)}`).join(', ');
    case 'word-order':
      return item.acceptedAnswers[0];
    case 'open-cloze':
      return item.gaps.map((g, i) => `${i + 1} ${g.acceptedAnswers.join('/')}`).join('; ');
    case 'mc-cloze':
      return item.gaps.map((g, i) => `${i + 1} ${String.fromCharCode(65 + g.answer)} (${g.options[g.answer]})`).join('; ');
  }
}

/** All strings that count as a correct answer (MCQ: the right option). */
export function acceptedAnswersOf(item: Item): string[] {
  switch (item.type) {
    case 'mcq':
    case 'reading':
      return [item.options[item.answer]];
    case 'matching':
      return item.answer.map((a, i) => `${item.left[i]} = ${item.right[a]}`);
    case 'open-cloze':
      return item.gaps.flatMap((g) => g.acceptedAnswers);
    case 'mc-cloze':
      return item.gaps.map((g) => g.options[g.answer]);
    default:
      return item.acceptedAnswers;
  }
}
