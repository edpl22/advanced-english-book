import type { LevelT } from '../../src/lib/schema';

export const ORIGINS = [
  'Latin',
  'Greek',
  'French',
  'German',
  'Dutch',
  'Italian',
  'Spanish',
  'Portuguese',
  'Arabic',
  'Persian',
  'Hebrew',
  'Sanskrit/Hindi',
  'Tamil',
  'Japanese',
  'Quechua',
  'Nahuatl',
  'Tupi',
  'Malay',
  'Chinese',
  'Turkish',
  'Russian',
  'Yiddish',
  'Irish',
  'Czech',
  'Afrikaans',
  'Norwegian',
  'Danish',
  'Icelandic',
  'Inuit',
  'Old English',
  'Old Norse',
  'Swedish',
  'Scots',
  'English coinage',
  'Unknown',
] as const;
export type Origin = (typeof ORIGINS)[number];

export interface LexEntry {
  word: string;
  ipa: string;
  /** Original definition. */
  def: string;
  /** Short etymology. */
  etym: string;
  origin: Origin;
  /** Original example sentence containing the word exactly as written. */
  ex: string;
  register: 'literary' | 'academic' | 'technical' | 'formal' | 'informal';
  level: LevelT;
  /** Invented but plausible definitions for “Real or Fake?”. */
  fakes: [string, string];
}
