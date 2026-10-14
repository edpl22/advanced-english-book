import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BankBatch, ItemSchema, Passage, type BankBatchT, type Item, type PassageT } from '../src/lib/schema';
import { UNITS } from '../content/units';
import { MEDIEVAL_QUIZ } from '../content/medieval';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

export interface LoadedBatch {
  file: string;
  raw: unknown;
  parsed: BankBatchT | null;
  error?: string;
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.json') ? [p] : [];
  });
}

export function loadBatches(): LoadedBatch[] {
  return walk(join(ROOT, 'content', 'bank')).map((file) => {
    const raw = JSON.parse(readFileSync(file, 'utf-8'));
    const r = BankBatch.safeParse(raw);
    return { file: relative(ROOT, file), raw, parsed: r.success ? r.data : null, error: r.success ? undefined : r.error.issues.slice(0, 5).map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') };
  });
}

export function loadPassages(): Array<{ file: string; parsed: PassageT | null; error?: string }> {
  return walk(join(ROOT, 'content', 'reading')).map((file) => {
    const r = Passage.safeParse(JSON.parse(readFileSync(file, 'utf-8')));
    return { file: relative(ROOT, file), parsed: r.success ? r.data : null, error: r.success ? undefined : r.error.message };
  });
}

export interface AuthoredItem {
  item: Item;
  origin: string;
}

/** Every authored item: units, bank batches, reading questions and the medieval quiz. */
export function allAuthored(): AuthoredItem[] {
  const out: AuthoredItem[] = [];
  for (const u of UNITS) for (const e of u.exercises) for (const it of e.items) out.push({ item: it, origin: `unit ${u.number} · ex ${e.id}` });
  for (const b of loadBatches()) {
    if (b.parsed) for (const it of b.parsed.items) out.push({ item: it, origin: b.file });
    else if (Array.isArray((b.raw as { items?: unknown[] })?.items))
      for (const it of (b.raw as { items: unknown[] }).items) {
        const p = ItemSchema.safeParse(it);
        if (p.success) out.push({ item: p.data, origin: b.file });
      }
  }
  for (const p of loadPassages()) if (p.parsed) for (const q of p.parsed.questions) out.push({ item: q, origin: p.file });
  for (const q of MEDIEVAL_QUIZ) out.push({ item: q, origin: 'content/medieval' });
  return out;
}
