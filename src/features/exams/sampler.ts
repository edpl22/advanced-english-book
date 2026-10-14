import { Rng, hashSeed } from '@/lib/rng';
import { MILITARY_TAGS, type Item, type ItemType, type LevelT, type PassageT } from '@/lib/schema';
import type { Topic } from '@/lib/topics';
import { generateMany, generatorsForTopic, itemFingerprint } from '@/lib/generators';

/**
 * Test assembly. buildTest() is a pure function of (config, pool, excluded):
 * the same seed and configuration always give the same paper.
 */

export type TestLevel = LevelT | 'military';
export type SourceFilter = 'authored' | 'generated' | 'both';

export interface TestConfig {
  level: TestLevel;
  topics: Topic[];
  count: number;
  types: ItemType[];
  source: SourceFilter;
  timerMin: number | null;
  seed: string;
  avoidRecent: boolean;
}

export interface Pool {
  items: Item[];
  passages: PassageT[];
}

export interface TestPaper {
  config: TestConfig;
  items: Item[];
  /** Passage text for reading items, by passage id. */
  passages: Record<string, PassageT>;
}

const LEVEL_ORDER: LevelT[] = ['B1', 'B2', 'C1', 'C2'];

/** Levels admitted in a test of a given level: that level and the one below. */
export function levelsFor(level: TestLevel): LevelT[] {
  if (level === 'military') return ['B2', 'C1', 'C2'];
  const i = LEVEL_ORDER.indexOf(level);
  return LEVEL_ORDER.slice(Math.max(0, i - 1), i + 1);
}

function matches(item: Item, cfg: TestConfig): boolean {
  if (!levelsFor(cfg.level).includes(item.level)) return false;
  if (cfg.level === 'military' && !item.examTags.some((t) => (MILITARY_TAGS as readonly string[]).includes(t))) return false;
  if (cfg.types.length && !cfg.types.includes(item.type)) return false;
  return true;
}

/** A stable string for the configuration, so a seed reproduces one exact paper. */
export function configKey(cfg: TestConfig): string {
  return JSON.stringify([cfg.level, [...cfg.topics].sort(), cfg.count, [...cfg.types].sort(), cfg.source, cfg.seed, cfg.avoidRecent]);
}

export function buildTest(cfg: TestConfig, pool: Pool, exclude: ReadonlySet<string> = new Set()): TestPaper {
  const rng = new Rng(hashSeed(configKey(cfg)));
  const topics = rng.shuffle(cfg.topics.length ? cfg.topics : [...new Set(pool.items.flatMap((i) => i.topics))]);
  const passages: Record<string, PassageT> = {};

  // Per-topic queues of authored items and passages, shuffled with the seed.
  const authored = new Map<Topic, Item[]>();
  const passageQueue = new Map<Topic, PassageT[]>();
  if (cfg.source !== 'generated') {
    for (const t of topics) {
      const list = pool.items.filter((i) => i.topics[0] === t && matches(i, cfg) && !(cfg.avoidRecent && exclude.has(i.id)) && i.type !== 'reading');
      authored.set(t, rng.shuffle(list));
      const ps = pool.passages.filter(
        (p) =>
          p.topics.includes(t) &&
          levelsFor(cfg.level).includes(p.level) &&
          (cfg.level !== 'military' || p.style === 'military' || p.examTags.some((x) => (MILITARY_TAGS as readonly string[]).includes(x))) &&
          (!cfg.types.length || cfg.types.includes('reading')),
      );
      passageQueue.set(t, rng.shuffle(ps));
    }
  }

  // Generated items, produced lazily per topic with a seed derived from the paper's seed.
  const generated = new Map<Topic, Item[]>();
  const genFor = (t: Topic): Item[] => {
    if (!generated.has(t)) {
      const gens = cfg.source === 'authored' ? [] : generatorsForTopic(t);
      const out: Item[] = [];
      gens.forEach((g, gi) => {
        out.push(...generateMany(g, hashSeed(`${cfg.seed}:${t}:${gi}`), Math.ceil(cfg.count / Math.max(1, topics.length)) + 6).filter((i) => matches(i, { ...cfg, level: cfg.level === 'military' ? 'C1' : cfg.level })));
      });
      generated.set(t, rng.shuffle(out));
    }
    return generated.get(t)!;
  };

  const out: Item[] = [];
  const seen = new Set<string>();
  const push = (it: Item) => {
    const fp = itemFingerprint(it);
    if (seen.has(fp)) return false;
    seen.add(fp);
    out.push(it);
    return true;
  };

  let guard = 0;
  let ti = 0;
  while (out.length < cfg.count && guard < cfg.count * 20) {
    guard++;
    const t = topics[ti % topics.length];
    ti++;
    const ps = passageQueue.get(t);
    // A passage slot brings all its questions at once (kept together).
    if (ps && ps.length && rng.chance(0.35) && out.length + ps[0].questions.length <= cfg.count) {
      const p = ps.shift()!;
      passages[p.id] = p;
      p.questions.forEach((q) => push(q));
      continue;
    }
    const a = authored.get(t) ?? [];
    const g = cfg.source === 'authored' ? [] : genFor(t);
    const preferGenerated = cfg.source === 'generated' || (cfg.source === 'both' && (a.length === 0 || rng.chance(0.4)));
    const src = preferGenerated && g.length ? g : a.length ? a : g;
    const next = src.shift();
    if (next) push(next);
    if (topics.every((x) => !(authored.get(x)?.length) && !(passageQueue.get(x)?.length) && !(cfg.source !== 'authored' && genFor(x).length))) break;
  }
  return { config: cfg, items: out, passages };
}
