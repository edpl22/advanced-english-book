/**
 * npm run bank:validate — checks every bank batch and reading text:
 *  1. Zod schema and structural rules (one gap, answer index in range…);
 *  2. every accepted answer is graded correct by the checking engine, and
 *     key word transformations respect the word limit and the key word;
 *  3. no MCQ distractor equals the answer (after normalisation);
 *  4. duplicates and near-duplicates across ALL authored items (units,
 *     bank, reading), by normalised text and word-trigram similarity
 *     (reading questions are compared per passage, not by trigrams).
 * Grammatical review item by item is recorded in each batch ("reviewed").
 * Exits with code 1 if anything fails.
 */
import { allAuthored, loadBatches, loadPassages } from './bank-lib';
import { structuralProblems, type Item } from '../src/lib/schema';
import { checkItem, countWordsCambridge, containsKeyword, normalize } from '../src/lib/checking';
import { itemFingerprint } from '../src/lib/generators/core';

let errors = 0;
let warnings = 0;
const err = (where: string, msg: string) => {
  errors++;
  console.log(`  ✗ ${where}: ${msg}`);
};
const warn = (where: string, msg: string) => {
  warnings++;
  console.log(`  ! ${where}: ${msg}`);
};

function checkAnswers(it: Item, where: string) {
  for (const p of structuralProblems(it)) err(where, p);
  switch (it.type) {
    case 'mcq':
    case 'reading': {
      const ans = normalize(it.options[it.answer] ?? '');
      it.options.forEach((o, i) => {
        if (i !== it.answer && normalize(o) === ans) err(where, `distractor ${i} equals the answer`);
      });
      if (checkItem(it, it.answer).verdict !== 'correct') err(where, 'key not graded correct');
      break;
    }
    case 'gap':
    case 'word-formation':
    case 'phrasal-choice':
      for (const a of it.acceptedAnswers) if (checkItem(it, a).verdict !== 'correct') err(where, `accepted answer “${a}” is not graded correct`);
      break;
    case 'kwt':
      for (const a of it.acceptedAnswers) {
        const n = countWordsCambridge(a);
        if (n < (it.minWords ?? 2) || n > (it.maxWords ?? 5)) err(where, `“${a}” has ${n} words`);
        if (!containsKeyword(a, it.keyword)) err(where, `“${a}” does not contain ${it.keyword}`);
        if (checkItem(it, a).verdict !== 'correct') err(where, `accepted answer “${a}” is not graded correct`);
      }
      break;
    case 'error-correction':
      for (const a of it.acceptedAnswers) if (checkItem(it, { index: it.errorIndex, correction: a }).verdict !== 'correct') err(where, `correction “${a}” not graded correct`);
      break;
    case 'word-order':
      if (checkItem(it, it.fragments).verdict !== 'correct') err(where, 'fragments do not rebuild an accepted answer');
      break;
    case 'matching':
      if (checkItem(it, it.answer).verdict !== 'correct') err(where, 'key not graded correct');
      break;
    case 'open-cloze':
      if (checkItem(it, it.gaps.map((g) => g.acceptedAnswers[0])).verdict !== 'correct') err(where, 'key not graded correct');
      break;
    case 'mc-cloze':
      if (checkItem(it, it.gaps.map((g) => g.answer)).verdict !== 'correct') err(where, 'key not graded correct');
      break;
  }
}

console.log('\nValidating bank batches');
for (const b of loadBatches()) {
  if (!b.parsed) {
    err(b.file, `schema: ${b.error}`);
    continue;
  }
  const ids = new Set<string>();
  for (const it of b.parsed.items) {
    if (ids.has(it.id)) err(b.file, `duplicate id ${it.id}`);
    ids.add(it.id);
    if (it.topics[0] !== b.parsed.topic) warn(`${b.file} ${it.id}`, `topic ${it.topics[0]} differs from batch topic ${b.parsed.topic}`);
    checkAnswers(it, `${b.file} ${it.id}`);
  }
  if (b.parsed.items.length !== 50) warn(b.file, `batch has ${b.parsed.items.length} items (batches are planned with 50)`);
  console.log(`  ${b.file}: ${b.parsed.items.length} items · reviewed: ${b.parsed.reviewed}`);
}

console.log('\nValidating reading texts');
for (const p of loadPassages()) {
  if (!p.parsed) {
    err(p.file, `schema: ${p.error}`);
    continue;
  }
  const words = p.parsed.text.split(/\s+/).length;
  if (words < 300 || words > 700) err(p.file, `text has ${words} words (300–700 required)`);
  if (p.parsed.questions.length < 8 || p.parsed.questions.length > 12) err(p.file, `${p.parsed.questions.length} questions (8–12 required)`);
  for (const q of p.parsed.questions) {
    if (q.passageId !== p.parsed.id) err(p.file, `${q.id} points to ${q.passageId}`);
    checkAnswers(q, `${p.file} ${q.id}`);
  }
  console.log(`  ${p.file}: ${words} words, ${p.parsed.questions.length} questions`);
}

console.log('\nChecking duplicates across all authored items');
const all = allAuthored();
const seenId = new Map<string, string>();
const seenFp = new Map<string, string>();
const trigrams = (s: string) => {
  const w = normalize(s).split(' ');
  const set = new Set<string>();
  for (let i = 0; i + 2 < w.length; i++) set.add(w.slice(i, i + 3).join(' '));
  return set;
};
const texts: Array<{ id: string; tri: Set<string> }> = [];
for (const { item, origin } of all) {
  if (seenId.has(item.id)) err(origin, `id ${item.id} also used in ${seenId.get(item.id)}`);
  seenId.set(item.id, origin);
  const fp = itemFingerprint(item);
  if (seenFp.has(fp)) err(origin, `${item.id} duplicates ${seenFp.get(fp)}`);
  seenFp.set(fp, item.id);
  const text = ('prompt' in item ? item.prompt : item.type === 'kwt' ? item.first : '') ?? '';
  if (item.type !== 'reading' && text.split(' ').length >= 8) texts.push({ id: item.id, tri: trigrams(text) });
}
for (let i = 0; i < texts.length; i++) {
  for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i].tri;
    const b = texts[j].tri;
    if (!a.size || !b.size) continue;
    let inter = 0;
    for (const x of a) if (b.has(x)) inter++;
    const sim = inter / (a.size + b.size - inter);
    if (sim >= 0.8) warn(texts[i].id, `very similar to ${texts[j].id} (${Math.round(sim * 100)}%)`);
  }
}

console.log(`\n${errors ? `✗ ${errors} error(s)` : '✓ no errors'} · ${warnings} warning(s) · ${all.length} authored items checked\n`);
process.exit(errors ? 1 : 0);
