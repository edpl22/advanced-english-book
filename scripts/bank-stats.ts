/**
 * npm run bank:stats — how many items exist by topic, level, type, exam and
 * source, and where coverage is still missing against the project targets.
 *   --json   machine-readable output
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { allAuthored, loadPassages, ROOT } from './bank-lib';
import { itemPoints, MILITARY_TAGS, ITEM_TYPE_LABELS, LEVELS, type Item } from '../src/lib/schema';
import { TOPICS, TOPIC_INFO, topicLabel } from '../src/lib/topics';
import { UNITS } from '../content/units';
import { ALL_TOC_UNITS, tocUnit } from '../content/units/toc';
import { PHRASAL_VERBS } from '../content/phrasal/dictionary';
import { LEXICON } from '../content/lexicon';
import { MEDIEVAL_QUIZ } from '../content/medieval';
import { TOEFL_TESTS, taskPools } from '../src/features/toefl/bank';
import { GENERATORS } from '../src/lib/generators';
import { VERBS } from '../content/data/verbs';

const json = process.argv.includes('--json');
const authored = allAuthored();
const items = authored.map((a) => a.item);
const points = (xs: Item[]) => xs.reduce((n, i) => n + itemPoints(i), 0);

const fromUnits = authored.filter((a) => a.origin.startsWith('unit')).map((a) => a.item);
const fromBank = authored.filter((a) => a.origin.includes('bank')).map((a) => a.item);
const fromReading = authored.filter((a) => a.origin.includes('reading')).map((a) => a.item);
const passages = loadPassages().filter((p) => p.parsed).map((p) => p.parsed!);
const military = items.filter((i) => i.examTags.some((t) => (MILITARY_TAGS as readonly string[]).includes(t)));

const by = <K extends string>(xs: Item[], key: (i: Item) => K | K[]) => {
  const m = new Map<K, number>();
  for (const i of xs) for (const k of ([] as K[]).concat(key(i))) m.set(k, (m.get(k) ?? 0) + itemPoints(i));
  return m;
};

const byTopic = by(items, (i) => i.topics[0]);
const byLevel = by(items, (i) => i.level);
const byType = by(items, (i) => i.type);
const byExam = by(items, (i) => i.examTags);

const answerDist = [0, 0, 0, 0];
for (const i of items) {
  if ((i.type === 'mcq' || i.type === 'reading') && i.options.length === 4) answerDist[i.answer]++;
  if (i.type === 'mc-cloze') for (const g of i.gaps) answerDist[g.answer]++;
}

const pools = taskPools();
const pvAuthored = points(items.filter((i) => i.topics[0] === 'phrasal-verbs'));

interface Target {
  phase: number;
  what: string;
  have: number;
  need: number;
}
const targets: Target[] = [
  ...UNITS.map((u) => ({ phase: tocUnit(u.id)?.phase ?? 1, what: `Unit ${u.number} (${u.title}): items`, have: points(u.exercises.flatMap((e) => e.items)), need: 80 })),
  ...UNITS.map((u) => ({ phase: tocUnit(u.id)?.phase ?? 1, what: `Unit ${u.number}: exercise types`, have: new Set(u.exercises.flatMap((e) => e.items.map((i) => i.type))).size, need: 6 })),
  { phase: 1, what: 'Generators (with tests)', have: GENERATORS.length, need: 10 },
  { phase: 1, what: 'Verb table for generators', have: VERBS.length, need: 400 },
  { phase: 2, what: 'Units of Parts I–III written', have: UNITS.filter((u) => ['I', 'II', 'III'].includes(u.part)).length, need: ALL_TOC_UNITS.filter((u) => ['I', 'II', 'III'].includes(u.part)).length },
  { phase: 3, what: 'Units of Parts IV–VI written', have: UNITS.filter((u) => ['IV', 'V', 'VI'].includes(u.part)).length, need: ALL_TOC_UNITS.filter((u) => ['IV', 'V', 'VI'].includes(u.part)).length },
  { phase: 3, what: 'Phrasal verb dictionary entries', have: PHRASAL_VERBS.length, need: 150 },
  { phase: 3, what: 'Authored phrasal verb items', have: pvAuthored, need: 750 },
  { phase: 4, what: 'Practice-test bank (batches)', have: points(fromBank), need: 3000 },
  { phase: 4, what: 'Military-style items (ITA/IME/EN/AFA/EFOMM/EsPCEx)', have: points(military), need: 500 },
  { phase: 4, what: 'Original reading texts (300–700 words)', have: passages.length, need: 60 },
  { phase: 5, what: 'Complete TOEFL tests', have: TOEFL_TESTS.length, need: 6 },
  { phase: 5, what: 'TOEFL Build a Sentence items', have: pools.buildSentence.length, need: 100 },
  { phase: 5, what: 'TOEFL Complete the Words passages (×10 blanks)', have: pools.ctw.length * 10, need: 100 },
  { phase: 5, what: 'TOEFL Listen and Choose a Response items', have: pools.choose.length, need: 100 },
  { phase: 5, what: 'TOEFL Email prompts', have: pools.email.length, need: 40 },
  { phase: 5, what: 'TOEFL Academic Discussion prompts', have: pools.discussion.length, need: 40 },
  { phase: 5, what: 'TOEFL Interview prompts', have: pools.interview.reduce((n, x) => n + x.questions.length, 0), need: 40 },
  { phase: 6, what: 'Lexicon entries', have: LEXICON.length, need: 1000 },
  { phase: 6, what: 'Old & Middle English quiz items', have: MEDIEVAL_QUIZ.length, need: 150 },
];

const LEVEL_TARGET: Record<string, number> = { B1: 0.2, B2: 0.35, C1: 0.3, C2: 0.15 };
const total = points(items);

if (json) {
  console.log(
    JSON.stringify(
      {
        total,
        sources: { units: points(fromUnits), bank: points(fromBank), reading: points(fromReading) },
        byTopic: Object.fromEntries(byTopic),
        byLevel: Object.fromEntries(byLevel),
        byType: Object.fromEntries(byType),
        byExam: Object.fromEntries(byExam),
        answerDistribution: answerDist,
        targets,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const pad = (s: string | number, n: number) => String(s).padEnd(n);
const lpad = (s: string | number, n: number) => String(s).padStart(n);
const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : '—');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));

console.log(`\nThorn · question bank statistics (v${pkg.version})\n${'═'.repeat(64)}`);
console.log(`Authored items (scorable points): ${total}`);
console.log(`  units ${points(fromUnits)} · bank batches ${points(fromBank)} · reading questions ${points(fromReading)} (${passages.length} texts)`);
console.log(`Generators: ${GENERATORS.length} (unlimited items) · Lexicon ${LEXICON.length} entries · Medieval quiz ${MEDIEVAL_QUIZ.length} · TOEFL tests ${TOEFL_TESTS.length}\n`);

console.log('By topic');
for (const t of TOPICS) {
  const n = byTopic.get(t) ?? 0;
  const gen = GENERATORS.some((g) => g.topic === t);
  if (n || gen) console.log(`  ${pad(topicLabel(t), 44)} ${lpad(n, 5)}  ${gen ? '+ generator' : ''}${TOPIC_INFO[t].unit ? `  (unit ${TOPIC_INFO[t].unit})` : ''}`);
}
const empty = TOPICS.filter((t) => !byTopic.get(t) && !GENERATORS.some((g) => g.topic === t));
if (empty.length) console.log(`  no items yet: ${empty.map(topicLabel).join(', ')}`);

console.log('\nBy level (target 20 / 35 / 30 / 15 %)');
for (const l of LEVELS) {
  const n = byLevel.get(l) ?? 0;
  const p = total ? n / total : 0;
  const off = Math.abs(p - LEVEL_TARGET[l]) > 0.07;
  console.log(`  ${l}  ${lpad(n, 5)}  ${lpad(pct(n, total), 4)}  target ${Math.round(LEVEL_TARGET[l] * 100)}%${off ? '  ← adjust in the next batches' : ''}`);
}

console.log('\nBy exercise type');
for (const [t, n] of [...byType.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${pad(ITEM_TYPE_LABELS[t], 28)} ${lpad(n, 5)}`);

console.log('\nBy exam tag');
for (const [t, n] of [...byExam.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${pad(t, 8)} ${lpad(n, 5)}`);

const ad = answerDist.reduce((a, b) => a + b, 0);
console.log(`\nMCQ answer letters  A ${pct(answerDist[0], ad)} · B ${pct(answerDist[1], ad)} · C ${pct(answerDist[2], ad)} · D ${pct(answerDist[3], ad)}  (${ad} answers)`);

console.log(`\nTargets and coverage gaps\n${'─'.repeat(64)}`);
let phase = 0;
for (const t of [...targets].sort((a, b) => a.phase - b.phase)) {
  if (t.phase !== phase) {
    phase = t.phase;
    console.log(`Phase ${phase}`);
  }
  const ok = t.have >= t.need;
  console.log(`  ${ok ? '✓' : '✗'} ${pad(t.what, 50)} ${lpad(t.have, 5)} / ${t.need}${ok ? '' : `  (missing ${t.need - t.have})`}`);
}
console.log('');
