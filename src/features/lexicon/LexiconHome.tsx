import { useMemo, useState } from 'react';
import { LEXICON, ORIGINS, type LexEntry } from '@content/lexicon';
import { lexiconItem, realOrFake } from '@/lib/generators/lexicon';
import { Rng, randomSeedString } from '@/lib/rng';
import { update } from '@/lib/storage';
import { useStore } from '@/lib/useStore';
import { nextBox, LEITNER_INTERVALS } from '@/lib/progress';
import type { McqItemT } from '@/lib/schema';
import { speak, speechSupported } from '@/lib/speech';

type Mode = 'match' | 'fake' | 'etymology' | 'fill' | 'review' | 'browse';

const MODES: Array<[Mode, string, string]> = [
  ['match', 'Definition Match', 'Choose the word for the definition.'],
  ['fake', 'Real or Fake?', 'One definition is real; the others were invented.'],
  ['etymology', 'Etymology Detective', 'Guess the language the word comes from.'],
  ['fill', 'Fill the Sentence', 'Put the right word into the sentence.'],
  ['review', 'Spaced Review', 'Five Leitner boxes: master each word.'],
  ['browse', 'Browse the cards', 'Read every entry.'],
];

const DAY = 86400000;

function recordWord(word: string, ok: boolean) {
  update((s) => {
    const prev = s.lexicon[word] ?? { box: 1, due: 0, seen: 0, correct: 0 };
    const box = Math.max(1, nextBox(prev.box, ok ? 'correct' : 'incorrect'));
    const streak = ok ? s.settings.streak + 1 : 0;
    return {
      ...s,
      lexicon: { ...s.lexicon, [word]: { box, due: Date.now() + LEITNER_INTERVALS[box] * DAY, seen: prev.seen + 1, correct: prev.correct + (ok ? 1 : 0) } },
      settings: { ...s.settings, streak, bestStreak: Math.max(s.settings.bestStreak, streak) },
    };
  });
}

export function EntryCard({ e }: { e: LexEntry }) {
  return (
    <article className="card-entry" lang="en" aria-label={`Entry: ${e.word}`}>
      <div>
        <span className="headword">{e.word}</span>
        <span className="ipa">{e.ipa}</span>{' '}
        {speechSupported() && (
          <button type="button" className="linkish" onClick={() => speak(e.word, { rate: 0.85 })} aria-label={`Hear ${e.word}`}>
            ♪
          </button>
        )}
      </div>
      <div>
        <span className="pos">noun</span> · <span className="tag">{e.register}</span> <span className="tag">{e.level}</span>
      </div>
      <p style={{ margin: '0.5rem 0' }}>{e.def}.</p>
      <p style={{ margin: '0.4rem 0' }}>
        <i>{e.ex}</i>
      </p>
      <p className="muted" style={{ fontSize: '0.92rem', margin: 0 }}>
        <span className="sc">Etymology</span> ({e.origin}): {e.etym}
      </p>
    </article>
  );
}

interface Question {
  entry: LexEntry;
  prompt: string;
  options: string[];
  answer: number;
}

function makeQuestion(mode: Mode, rng: Rng, pool: LexEntry[]): Question {
  const entry = rng.pick(pool);
  if (mode === 'fake') {
    const r = realOrFake(rng, entry);
    return { entry, prompt: `What does “${entry.word}” really mean?`, options: r.options, answer: r.answer };
  }
  const kind = mode === 'match' ? 0 : mode === 'etymology' ? (entry.origin === 'Unknown' ? 0 : 2) : mode === 'fill' ? 3 : 0;
  const item = lexiconItem(rng, entry, 'lex', LEXICON, kind) as McqItemT;
  return { entry, prompt: item.prompt, options: item.options, answer: item.answer };
}

export default function LexiconHome() {
  const state = useStore();
  const [mode, setMode] = useState<Mode>('match');
  const [seed] = useState(randomSeedString);
  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);

  const mastered = Object.values(state.lexicon).filter((s) => s.box >= 5).length;
  const duePool = useMemo(() => {
    const now = Date.now();
    const due = LEXICON.filter((e) => {
      const s = state.lexicon[e.word];
      return s && s.box < 5 && s.due <= now;
    });
    const fresh = LEXICON.filter((e) => !state.lexicon[e.word]).slice(0, 10);
    return due.length ? due : fresh;
    // Recompute only when the round changes, not on every answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, mode]);

  const q = useMemo(() => {
    if (mode === 'browse') return null;
    const rng = new Rng(`${seed}:${mode}:${round}`);
    const pool = mode === 'review' ? (duePool.length ? duePool : LEXICON) : LEXICON;
    return makeQuestion(mode === 'review' ? 'match' : mode, rng, pool);
  }, [mode, round, seed, duePool]);

  const answer = (i: number) => {
    if (!q || chosen !== null) return;
    setChosen(i);
    recordWord(q.entry.word, i === q.answer);
  };
  const next = () => {
    setChosen(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="single">
      <div className="running-head">
        <span>Lexicon</span>
        <span>
          {LEXICON.length} rare nouns · {mastered} mastered · streak {state.settings.streak} (best {state.settings.bestStreak})
        </span>
      </div>
      <h1 className="sc">Lexicon</h1>
      <p className="muted">Uncommon but real nouns for reading, writing and the pleasure of words. Origins: {ORIGINS.filter((o) => LEXICON.some((e) => e.origin === o)).length} languages.</p>
      <nav aria-label="Games" className="tabs" style={{ padding: 0, margin: '0.5rem 0 1rem' }}>
        {MODES.map(([m, label]) => (
          <a
            key={m}
            href={`#/lexicon`}
            aria-current={mode === m ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setMode(m);
              setChosen(null);
              setRound((r) => r + 1);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <p className="instruction">{MODES.find(([m]) => m === mode)![2]}</p>

      {mode === 'browse' ? (
        <div>
          {[...LEXICON].sort((a, b) => a.word.localeCompare(b.word)).map((e) => (
            <EntryCard key={e.word} e={e} />
          ))}
        </div>
      ) : (
        q && (
          <div className="card-entry" style={{ maxWidth: '40rem' }}>
            {mode === 'review' && (
              <p className="muted" style={{ marginTop: 0 }}>
                Box {state.lexicon[q.entry.word]?.box ?? 1} of 5 · {duePool.length} words in today’s queue
              </p>
            )}
            <p style={{ fontSize: '1.15rem', whiteSpace: 'pre-line' }} lang="en">
              {q.prompt}
            </p>
            <ul className="options" lang="en">
              {q.options.map((o, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={`fragment ${chosen !== null && i === q.answer ? 'placed' : ''}`}
                    style={{ width: '100%', textAlign: 'left', borderColor: chosen !== null && i === q.answer ? 'var(--ok)' : chosen === i ? 'var(--accent)' : undefined }}
                    onClick={() => answer(i)}
                    aria-pressed={chosen === i}
                  >
                    <span className="letter sc">{'ABCD'[i]}</span> {o}
                  </button>
                </li>
              ))}
            </ul>
            {chosen !== null && (
              <div role="status">
                <p className={chosen === q.answer ? '' : ''}>
                  <b className="sc" style={{ color: chosen === q.answer ? 'var(--ok)' : 'var(--accent)' }}>
                    {chosen === q.answer ? 'Correct' : 'Not quite'}
                  </b>
                </p>
                <EntryCard e={q.entry} />
                <button type="button" className="btn primary" onClick={next} autoFocus>
                  Next word
                </button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
