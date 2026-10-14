import type { ExamTagT, Item, LevelT } from '../../src/lib/schema';
import type { Topic } from '../../src/lib/topics';

/**
 * Inline markup used in unit text:
 *   **bold**, *italic*, `form` (grammar formula, small caps-ish),
 *   [[7.2]] cross-reference to a section, ^1 footnote marker.
 */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'table'; caption?: string; head: string[]; rows: string[][]; note?: string }
  | { kind: 'examples'; items: Array<{ en: string; note?: string }> }
  | { kind: 'note'; variant: 'note' | 'watch' | 'exam'; title?: string; text: string }
  | { kind: 'pt'; title: string; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'passage'; title?: string; text: string };

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
  footnotes?: string[];
}

export interface Mistake {
  wrong: string;
  right: string;
  /** Explanation in Portuguese. */
  why: string;
}

export interface ExamFocus {
  exam: string;
  tags: ExamTagT[];
  text: string;
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type MetaKeys = 'id' | 'source' | 'level' | 'difficulty' | 'topics' | 'skill' | 'examTags' | 'ref';

/** An authored item: metadata is optional and inherited from its exercise. */
export type ItemInput = DistributiveOmit<Item, MetaKeys> & Partial<Pick<Item, 'level' | 'difficulty' | 'topics' | 'examTags' | 'ref'>>;

export interface ExerciseInput {
  /** "7.3" */
  id: string;
  title: string;
  instruction: string;
  /** Default book section for "Review". */
  ref: string;
  level: LevelT;
  difficulty: number;
  examTags: ExamTagT[];
  topics?: Topic[];
  skill?: Item['skill'];
  items: ItemInput[];
}

export interface Exercise extends Omit<ExerciseInput, 'items'> {
  items: Item[];
}

export interface UnitInput {
  id: string;
  number: number;
  part: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  topic: Topic;
  title: string;
  levelRange: string;
  /** Opening paragraph (drop cap). */
  intro: string;
  sections: Section[];
  examples: { title: string; text: string; note?: string };
  mistakes: Mistake[];
  examFocus: ExamFocus[];
  exercises: ExerciseInput[];
  quickReview: { points: string[]; table?: { head: string[]; rows: string[][] }; selfCheck: Array<{ q: string; a: string }> };
  /** Generator keys used by "More practice". */
  generators: string[];
}

export interface Unit extends Omit<UnitInput, 'exercises'> {
  exercises: Exercise[];
}

/** Fill in inherited metadata and stable ids: u07-7.3-05. */
export function buildUnit(u: UnitInput): Unit {
  return {
    ...u,
    exercises: u.exercises.map((ex) => ({
      ...ex,
      items: ex.items.map(
        (it, i) =>
          ({
            level: ex.level,
            difficulty: ex.difficulty,
            topics: ex.topics ?? [u.topic],
            skill: ex.skill ?? 'grammar',
            examTags: ex.examTags,
            ref: ex.ref,
            ...it,
            id: `${u.id}-${ex.id}-${String(i + 1).padStart(2, '0')}`,
            source: 'authored',
          }) as Item,
      ),
    })),
  };
}
