import { ENTRIES_001 } from './entries-001';
import { ENTRIES_002 } from './entries-002';
import { ENTRIES_003 } from './entries-003';
import { ENTRIES_004 } from './entries-004';
import { ENTRIES_005 } from './entries-005';
import { ENTRIES_006 } from './entries-006';
import { ENTRIES_007 } from './entries-007';
import type { LexEntry } from './types';

export * from './types';
export { LEX_SIMILAR } from './similar';

/** All Lexicon entries (batches are appended here as they are written). */
export const LEXICON: LexEntry[] = [...ENTRIES_001, ...ENTRIES_002, ...ENTRIES_003, ...ENTRIES_004, ...ENTRIES_005, ...ENTRIES_006, ...ENTRIES_007];
