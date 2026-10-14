/**
 * Seeded pseudo-random numbers. Every generator, test paper and game uses
 * this module so that the same seed always yields the same output.
 */

/** FNV-1a hash of a string to an unsigned 32-bit integer. */
export function hashSeed(input: string | number): number {
  const s = String(input);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Mulberry32: small, fast, good enough for shuffling exam items. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Rng {
  private readonly next01: () => number;

  constructor(seed: string | number) {
    this.next01 = mulberry32(typeof seed === 'number' ? seed >>> 0 : hashSeed(seed));
  }

  /** Float in [0, 1). */
  next(): number {
    return this.next01();
  }

  /** Integer in [0, n). */
  int(n: number): number {
    if (n <= 0) throw new Error('Rng.int: n must be positive');
    return Math.floor(this.next01() * n);
  }

  /** Integer in [min, max] (inclusive). */
  range(min: number, max: number): number {
    return min + this.int(max - min + 1);
  }

  chance(p: number): boolean {
    return this.next01() < p;
  }

  pick<T>(arr: readonly T[]): T {
    if (arr.length === 0) throw new Error('Rng.pick: empty array');
    return arr[this.int(arr.length)];
  }

  /** Returns a shuffled copy (Fisher–Yates). */
  shuffle<T>(arr: readonly T[]): T[] {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = this.int(i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  /** k distinct elements, in random order. */
  sample<T>(arr: readonly T[], k: number): T[] {
    return this.shuffle(arr).slice(0, Math.min(k, arr.length));
  }

  /** Derive an independent child generator (stable for a given label). */
  fork(label: string | number): Rng {
    return new Rng(hashSeed(`${this.int(2 ** 31)}:${label}`));
  }
}

/** A fresh, human-friendly seed such as "K7Q-29XM". */
export function randomSeedString(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 7; i++) {
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
    if (i === 2) s += '-';
  }
  return s;
}
