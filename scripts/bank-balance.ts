/**
 * npm run bank:balance — answer letters (A–D) and level distribution per
 * batch. With --fix, MCQ options in bank batches are reordered so that the
 * correct answer cycles A, B, C, D through the batch (distractors keep their
 * relative order). Unit files are reported but never rewritten.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadBatches, loadPassages, ROOT } from './bank-lib';
import { LEVELS } from '../src/lib/schema';

const fix = process.argv.includes('--fix');
const TARGET: Record<string, number> = { B1: 20, B2: 35, C1: 30, C2: 15 };

function moveAnswer<T extends { options: string[]; answer: number }>(q: T, to: number): T {
  if (q.options.length !== 4 || q.answer === to) return q;
  const correct = q.options[q.answer];
  const rest = q.options.filter((_, i) => i !== q.answer);
  rest.splice(to, 0, correct);
  return { ...q, options: rest, answer: to };
}

for (const b of loadBatches()) {
  if (!b.parsed) {
    console.log(`${b.file}: invalid (run bank:validate)`);
    continue;
  }
  const items = b.parsed.items;
  const dist = [0, 0, 0, 0];
  for (const it of items) if (it.type === 'mcq' && it.options.length === 4) dist[it.answer]++;
  const levels = Object.fromEntries(LEVELS.map((l) => [l, items.filter((i) => i.level === l).length]));
  console.log(`\n${b.file}`);
  console.log(`  answers  A ${dist[0]} · B ${dist[1]} · C ${dist[2]} · D ${dist[3]}`);
  console.log(`  levels   ${LEVELS.map((l) => `${l} ${levels[l]} (${Math.round((levels[l] / items.length) * 100)}% / target ${TARGET[l]}%)`).join(' · ')}`);
  if (fix) {
    let k = 0;
    const next = items.map((it) => (it.type === 'mcq' && it.options.length === 4 ? moveAnswer(it, k++ % 4) : it));
    writeFileSync(join(ROOT, b.file), JSON.stringify({ ...b.parsed, items: next }, null, 1) + '\n', 'utf-8');
    console.log('  → answers redistributed A, B, C, D in order');
  }
}

for (const p of loadPassages()) {
  if (!p.parsed) continue;
  const dist = [0, 0, 0, 0];
  for (const q of p.parsed.questions) if (q.options.length === 4) dist[q.answer]++;
  console.log(`\n${p.file}\n  answers  A ${dist[0]} · B ${dist[1]} · C ${dist[2]} · D ${dist[3]}`);
}
console.log('');
