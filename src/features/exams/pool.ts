import { unitItems } from '@content/units';
import { BankBatch, ItemSchema, Passage, type Item, type PassageT } from '@/lib/schema';
import type { Pool } from './sampler';

/**
 * Everything authored that can go into a test: unit exercises, bank batches
 * (/content/bank/<topic>/<batch>.json) and reading passages
 * (/content/reading/*.json). Files are validated again here; an invalid item
 * is skipped rather than breaking the page.
 */

const bankFiles = import.meta.glob('/content/bank/**/*.json', { eager: true, import: 'default' });
const readingFiles = import.meta.glob('/content/reading/*.json', { eager: true, import: 'default' });

let cached: Pool | null = null;

export function loadPool(): Pool {
  if (cached) return cached;
  const items: Item[] = [...unitItems()];
  for (const raw of Object.values(bankFiles)) {
    const batch = BankBatch.safeParse(raw);
    if (batch.success) items.push(...batch.data.items);
    else if (Array.isArray((raw as { items?: unknown[] })?.items)) {
      for (const it of (raw as { items: unknown[] }).items) {
        const p = ItemSchema.safeParse(it);
        if (p.success) items.push(p.data);
      }
    }
  }
  const passages: PassageT[] = [];
  for (const raw of Object.values(readingFiles)) {
    const p = Passage.safeParse(raw);
    if (p.success) passages.push(p.data);
  }
  cached = { items, passages };
  return cached;
}

export function bankSize(): { items: number; passages: number } {
  const p = loadPool();
  return { items: p.items.length + p.passages.reduce((n, x) => n + x.questions.length, 0), passages: p.passages.length };
}
