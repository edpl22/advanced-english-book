import { ENTRIES_001 } from './entries-001';
import type { LexEntry } from './types';

export * from './types';

/** All Lexicon entries (batches are appended here as they are written). */
export const LEXICON: LexEntry[] = [...ENTRIES_001];
