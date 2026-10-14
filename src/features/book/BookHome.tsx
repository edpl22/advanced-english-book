import { useMemo, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TOC } from '@content/units/toc';
import { getUnit } from '@content/units';
import { LEXICON } from '@content/lexicon';
import { itemPoints } from '@/lib/schema';
import { dueForReview, everCorrect } from '@/lib/progress';
import { useStore } from '@/lib/useStore';
import type { State } from '@/lib/storage';

interface Section {
  key: string;
  numeral: string;
  label: string;
  to: string;
  kicker: string;
  text: string;
  facts: Array<[string, string]>;
  cta: string;
}

const fmt = (n: number) => n.toLocaleString('en-GB');

function sections(state: State): Section[] {
  const units = TOC.flatMap((p) => p.units).filter((u) => u.ready);
  const points = units.reduce((n, u) => n + (getUnit(u.id)?.exercises.flatMap((e) => e.items).reduce((m, it) => m + itemPoints(it), 0) ?? 0), 0);
  const languages = new Set(LEXICON.map((e) => e.origin)).size;
  const stats = Object.values(state.items);
  const tried = stats.reduce((n, s) => n + s.n, 0);
  const right = stats.reduce((n, s) => n + s.correct, 0);
  return [
    {
      key: 'book',
      numeral: 'I',
      label: 'The Book',
      to: '/book',
      kicker: `Six parts · ${units.length} units`,
      text: 'Grammar and vocabulary taught the way a good teacher would: the rule, real examples, the mistakes Brazilian learners make, and exercises corrected as you go.',
      facts: [
        [String(units.length), 'units'],
        [fmt(points), 'exercise points'],
        ['3', 'appendices'],
      ],
      cta: 'Open the contents',
    },
    {
      key: 'tests',
      numeral: 'II',
      label: 'Practice Tests',
      to: '/tests',
      kicker: 'Papers made to measure',
      text: 'Choose the level, topics, question types and timer, and the book sets a paper for you. It covers everything from ENEM to the military entrance exams.',
      facts: [
        ['3,000+', 'authored points'],
        ['60', 'reading texts'],
        ['∞', 'generated items'],
      ],
      cta: 'Set a paper',
    },
    {
      key: 'toefl',
      numeral: 'III',
      label: 'TOEFL Simulator',
      to: '/toefl',
      kicker: 'The 2026 iBT format',
      text: 'Adaptive Reading and Listening, Writing tasks with model answers and recorded Speaking, all scored in bands from 1 to 6 with their CEFR level.',
      facts: [
        ['6', 'complete tests'],
        ['85', 'minutes each'],
        ['40', 'prompts per task'],
      ],
      cta: 'Enter the simulator',
    },
    {
      key: 'lexicon',
      numeral: 'IV',
      label: 'Lexicon',
      to: '/lexicon',
      kicker: 'Uncommon nouns',
      text: 'Rare and useful words, each with its pronunciation, its history and an example, plus a game of Real or Fake to test your instincts.',
      facts: [
        [fmt(LEXICON.length), 'entries'],
        [String(languages), 'source languages'],
        ['4', 'ways to practise'],
      ],
      cta: 'Browse the Lexicon',
    },
    {
      key: 'medieval',
      numeral: 'V',
      label: 'Old & Middle English',
      to: '/medieval',
      kicker: 'From Beowulf to Shakespeare',
      text: 'The letters, grammar and words that became modern English, read in the original and explained line by line.',
      facts: [
        ['1,300', 'years of English'],
        ['150+', 'quiz questions'],
        ['þ ð ƿ ȝ', 'old letters'],
      ],
      cta: 'Go back in time',
    },
    {
      key: 'progress',
      numeral: 'VI',
      label: 'My Progress',
      to: '/progress',
      kicker: 'Your record, kept on this device',
      text: 'See what you have answered, what is due for review today and which topics need another look. Nothing leaves your browser.',
      facts: [
        [fmt(stats.length), 'items answered'],
        [tried ? `${Math.round((right / tried) * 100)}%` : '—', 'accuracy'],
        [fmt(dueForReview(state).length), 'due for review'],
      ],
      cta: 'See my progress',
    },
  ];
}

/** The unit of the most recent answer given in the book, if any. */
function lastUnit(state: State): { id: string; number: number; title: string } | null {
  let best: { at: number; id: string } | null = null;
  for (const a of state.attempts) {
    const m = /^(u\d\d)-/.exec(a.itemId);
    if (m && (!best || a.at > best.at)) best = { at: a.at, id: m[1] };
  }
  if (!best) return null;
  const u = TOC.flatMap((p) => p.units).find((x) => x.id === best!.id);
  return u ? { id: u.id, number: u.number, title: u.title } : null;
}

function scrollToContents(e: MouseEvent) {
  e.preventDefault();
  document.getElementById('contents-h')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function TabLink({ s, children, ...rest }: { s: Section; children: ReactNode } & HTMLAttributes<HTMLAnchorElement>) {
  if (s.key === 'book')
    return (
      <a href="#contents" onClick={scrollToContents} {...rest}>
        {children}
      </a>
    );
  return (
    <Link to={s.to} {...rest}>
      {children}
    </Link>
  );
}

export function Cover() {
  const state = useStore();
  const list = useMemo(() => sections(state), [state]);
  const [active, setActive] = useState('book');
  const current = list.find((s) => s.key === active) ?? list[0];
  const resume = lastUnit(state);

  return (
    <section className="jacket" aria-label="Advanced English — cover and sections">
      <div className="board">
        <div className="board-frame">
          <p className="imprint">A course book for Brazilian learners</p>
          <h1 className="title-lockup">
            <span>Advanced</span>
            <span>English</span>
          </h1>
          <p className="board-subtitle">Grammar, Vocabulary and Exam Practice</p>
          <p className="board-levels" aria-label="Levels B2 to C2">
            B2 <span aria-hidden="true">—</span> C2
          </p>

          <div className="plate" aria-live="polite" key={current.key}>
            <p className="plate-kicker">
              <span className="plate-num">{current.numeral}</span> {current.kicker}
            </p>
            <p className="plate-text">{current.text}</p>
            <dl className="plate-facts">
              {current.facts.map(([n, l]) => (
                <div key={l}>
                  <dt>{l}</dt>
                  <dd>{n}</dd>
                </div>
              ))}
            </dl>
            <TabLink s={current} className="plate-cta">
              {current.cta} <span aria-hidden="true">→</span>
            </TabLink>
          </div>

          <p className="board-exams">TOEFL · IELTS · Cambridge C1/C2 · ITA · IME · AFA · EN · EFOMM · EsPCEx · FUVEST · ENEM</p>
        </div>
        {resume && (
          <Link className="ribbon" to={`/book/unit/${resume.id}`} title={`Continue with Unit ${resume.number}: ${resume.title}`}>
            <span className="ribbon-label">Continue</span>
            <span className="ribbon-unit">Unit {resume.number}</span>
          </Link>
        )}
      </div>

      <nav className="thumb-index" aria-label="Sections of the book">
        {list.map((s) => (
          <TabLink
            key={s.key}
            s={s}
            className={`thumb${s.key === active ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(s.key)}
            onFocus={() => setActive(s.key)}
          >
            <span className="thumb-num">{s.numeral}</span>
            <span className="thumb-label">{s.label}</span>
          </TabLink>
        ))}
      </nav>
    </section>
  );
}

export function Contents() {
  const state = useStore();
  const done = everCorrect(state);
  return (
    <nav aria-labelledby="contents-h" className="contents" id="contents">
      <h2 id="contents-h" className="contents-title">
        Contents
      </h2>
      <ol className="toc">
        <li className="part">
          <div className="part-title">
            <span className="part-name">Front matter</span>
          </div>
          <ol className="toc-units">
            <li className="unit">
              <span className="n" />
              <Link to="/book/how-to-use" className="unit-title">
                How to Use This Book
              </Link>
              <span className="leader" aria-hidden="true" />
              <span className="meta">correction rules · symbols</span>
            </li>
          </ol>
        </li>
        {TOC.map((part) => (
          <li className="part" key={part.part}>
            <div className="part-title">
              <span className="part-num">Part {part.part}</span>
              <span className="part-name">{part.title}</span>
            </div>
            <ol className="toc-units">
              {part.units.map((u) => {
                const unit = getUnit(u.id);
                const all = unit ? unit.exercises.flatMap((e) => e.items) : [];
                const total = all.reduce((n, it) => n + itemPoints(it), 0);
                const got = all.filter((it) => done.has(it.id)).length;
                const pct = all.length ? Math.round((got / all.length) * 100) : 0;
                return (
                  <li className="unit" key={u.id}>
                    <span className="n">{u.number}</span>
                    {u.ready ? (
                      <Link to={`/book/unit/${u.id}`} className="unit-title">
                        {u.title}
                      </Link>
                    ) : (
                      <span className="unit-title">{u.title}</span>
                    )}
                    <span className="leader" aria-hidden="true" />
                    <span className="meta">
                      {u.ready ? (
                        <>
                          {total} items
                          {pct > 0 && (
                            <span className="done" title={`${pct}% of the unit answered correctly`}>
                              {' '}
                              · {pct}%
                            </span>
                          )}
                        </>
                      ) : (
                        `in preparation`
                      )}
                    </span>
                    {pct > 0 && (
                      <span className="unit-progress" aria-hidden="true">
                        <span style={{ width: `${pct}%` }} />
                      </span>
                    )}
                    <span className="sections">
                      {u.sections.map((s, i) => (
                        <span key={i}>
                          <span className="sec-n">
                            {u.number}.{i + 1}
                          </span>{' '}
                          {s}
                          {i < u.sections.length - 1 ? <span className="sep"> · </span> : ''}
                        </span>
                      ))}
                    </span>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
        <li className="part">
          <div className="part-title">
            <span className="part-name">Back matter</span>
          </div>
          <ol className="toc-units">
            {[
              ['A', '/book/appendix/irregular-verbs', 'Irregular verbs'],
              ['B', '/book/appendix/phrasal-verbs', 'Phrasal verbs dictionary'],
              ['C', '/book/appendix/false-friends', 'False friends'],
              ['', '/book/glossary', 'Glossary'],
              ['', '/book/index', 'Index'],
              ['', '/book/answer-key', 'Answer Key'],
            ].map(([n, to, label]) => (
              <li className="unit" key={to}>
                <span className="n">{n}</span>
                <Link to={to} className="unit-title">
                  {n ? `Appendix ${n} · ` : ''}
                  {label}
                </Link>
                <span className="leader" aria-hidden="true" />
                <span className="meta" />
              </li>
            ))}
          </ol>
        </li>
      </ol>
    </nav>
  );
}

export function BookHome() {
  return (
    <div className="book-home">
      <Cover />
      <div className="single">
        <Contents />
      </div>
    </div>
  );
}
