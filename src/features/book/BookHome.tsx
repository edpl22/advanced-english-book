import { useMemo, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TOC } from '@content/units/toc';
import { getUnit } from '@content/units';
import { LEXICON } from '@content/lexicon';
import { itemPoints } from '@/lib/schema';
import { dueForReview, everCorrect } from '@/lib/progress';
import { useStore } from '@/lib/useStore';
import { dateKey, doneToday, liveStreak } from '@/lib/daily';
import type { State } from '@/lib/storage';
import { fmtNum, useT, type Lang, type T } from '@/lib/i18n';

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

function sections(state: State, t: T, lang: Lang): Section[] {
  const fmt = (n: number) => fmtNum(lang, n);
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
      label: t('The Book'),
      to: '/book',
      kicker: t('Six parts · {n} units', { n: units.length }),
      text: t('Grammar and vocabulary taught the way a good teacher would: the rule, real examples, the mistakes Brazilian learners make, and exercises corrected as you go.'),
      facts: [
        [String(units.length), t('units')],
        [fmt(points), t('exercise points')],
        ['3', t('appendices')],
      ],
      cta: t('Open the contents'),
    },
    {
      key: 'tests',
      numeral: 'II',
      label: t('Practice Tests'),
      to: '/tests',
      kicker: t('Papers made to measure'),
      text: t('Choose the level, topics, question types and timer, and the book sets a paper for you. It covers everything from ENEM to the military entrance exams.'),
      facts: [
        [`${fmt(3000)}+`, t('authored points')],
        ['60', t('reading texts')],
        ['∞', t('generated items')],
      ],
      cta: t('Set a paper'),
    },
    {
      key: 'toefl',
      numeral: 'III',
      label: t('TOEFL format'),
      to: '/toefl',
      kicker: t('The 2026 iBT format'),
      text: t('Adaptive Reading and Listening, Writing tasks with model answers and recorded Speaking, all scored in bands from 1 to 6 with their CEFR level.'),
      facts: [
        ['6', t('complete tests')],
        ['85', t('minutes each')],
        ['40', t('prompts per task')],
      ],
      cta: t('Enter the simulator'),
    },
    {
      key: 'lexicon',
      numeral: 'IV',
      label: t('Lexicon'),
      to: '/lexicon',
      kicker: t('Uncommon nouns'),
      text: t('Rare and useful words, each with its pronunciation, its history and an example, plus a game of Real or Fake to test your instincts.'),
      facts: [
        [fmt(LEXICON.length), t('entries')],
        [String(languages), t('source languages')],
        ['4', t('ways to practise')],
      ],
      cta: t('Browse the Lexicon'),
    },
    {
      key: 'medieval',
      numeral: 'V',
      label: t('Old & Middle English'),
      to: '/medieval',
      kicker: t('From Beowulf to Shakespeare'),
      text: t('The letters, grammar and words that became modern English, read in the original and explained line by line.'),
      facts: [
        [fmt(1300), t('years of English')],
        ['150+', t('quiz questions')],
        ['þ ð ƿ ȝ', t('old letters')],
      ],
      cta: t('Go back in time'),
    },
    {
      key: 'progress',
      numeral: 'VI',
      label: t('My Progress'),
      to: '/progress',
      kicker: t('Your record, kept on this device'),
      text: t('See what you have answered, what is due for review today and which topics need another look. Nothing leaves your browser.'),
      facts: [
        [fmt(stats.length), t('items answered')],
        [tried ? `${Math.round((right / tried) * 100)}%` : '—', t('accuracy')],
        [fmt(dueForReview(state).length), t('due for review')],
      ],
      cta: t('See my progress'),
    },
    {
      key: 'daily',
      numeral: 'VII',
      label: t('Daily Challenge'),
      to: '/daily',
      kicker: doneToday(state.daily, dateKey()) ? t('Done for today') : t('Today’s page is waiting'),
      text: t('Ten questions on ten random topics, the same for everyone each day. Finish them daily to build a streak, and miss a day to start again.'),
      facts: [
        [String(liveStreak(state.daily, dateKey())), t('day streak')],
        [String(state.daily.best), t('best streak')],
        ['10', t('questions a day')],
      ],
      cta: doneToday(state.daily, dateKey()) ? t('See today’s result') : t('Take today’s challenge'),
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
  const t = useT();
  const lang = state.settings.lang;
  const list = useMemo(() => sections(state, t, lang), [state, t, lang]);
  const [active, setActive] = useState('book');
  const current = list.find((s) => s.key === active) ?? list[0];
  const resume = lastUnit(state);

  return (
    <section className="jacket" aria-label={t('Advanced English — cover and sections')}>
      <div className="board">
        <div className="board-frame">
          <p className="imprint">{t('A course book for Brazilian learners')}</p>
          <h1 className="title-lockup">
            <span>Advanced</span>
            <span>English</span>
          </h1>
          <p className="board-subtitle">{t('Grammar, Vocabulary and Exam Practice')}</p>
          <p className="board-levels" aria-label={t('Levels B2 to C2')}>
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

          <p className="board-exams">
            {t('Practice in the format of')} TOEFL · IELTS · Cambridge C1/C2 · ITA · IME · AFA · EN · EFOMM · EsPCEx · FUVEST · ENEM
          </p>
        </div>
        {resume && (
          <Link className="ribbon" to={`/book/unit/${resume.id}`} title={t('Continue with Unit {n}: {title}', { n: resume.number, title: resume.title })}>
            <span className="ribbon-label">{t('Continue')}</span>
            <span className="ribbon-unit">{t('Unit {n}', { n: resume.number })}</span>
          </Link>
        )}
      </div>

      <nav className="thumb-index" aria-label={t('Sections of the book')}>
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
  const t = useT();
  const done = everCorrect(state);
  return (
    <nav aria-labelledby="contents-h" className="contents" id="contents">
      <h2 id="contents-h" className="contents-title">
        {t('Contents')}
      </h2>
      <ol className="toc">
        <li className="part">
          <div className="part-title">
            <span className="part-name">{t('Front matter')}</span>
          </div>
          <ol className="toc-units">
            <li className="unit">
              <span className="n" />
              <Link to="/book/how-to-use" className="unit-title">
                {t('How to Use This Book')}
              </Link>
              <span className="leader" aria-hidden="true" />
              <span className="meta">{t('correction rules · symbols')}</span>
            </li>
          </ol>
        </li>
        {TOC.map((part) => (
          <li className="part" key={part.part}>
            <div className="part-title">
              <span className="part-num">{t('Part {n}', { n: part.part })}</span>
              <span className="part-name">{part.title}</span>
            </div>
            <ol className="toc-units">
              {part.units.map((u) => {
                const unit = getUnit(u.id);
                const all = unit ? unit.exercises.flatMap((e) => e.items) : [];
                const total = all.reduce((n, it) => n + itemPoints(it), 0);
                const got = all.filter((it) => done.has(it.id)).length;
                const marked = Boolean(state.completed[u.id]);
                const pct = marked ? 100 : all.length ? Math.round((got / all.length) * 100) : 0;
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
                          {t('{n} items', { n: total })}
                          {marked ? (
                            <span className="done" title={t('Marked as completed')}>
                              {' '}
                              · ✓ {t('completed')}
                            </span>
                          ) : (
                            pct > 0 && (
                              <span className="done" title={t('{pct}% of the unit answered correctly', { pct })}>
                                {' '}
                                · {pct}%
                              </span>
                            )
                          )}
                        </>
                      ) : (
                        t('in preparation')
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
            <span className="part-name">{t('Back matter')}</span>
          </div>
          <ol className="toc-units">
            {[
              ['A', '/book/appendix/irregular-verbs', t('Irregular verbs')],
              ['B', '/book/appendix/phrasal-verbs', t('Phrasal verbs dictionary')],
              ['C', '/book/appendix/false-friends', t('False friends')],
              ['', '/book/glossary', t('Glossary')],
              ['', '/book/index', t('Index')],
              ['', '/book/answer-key', t('Answer Key')],
            ].map(([n, to, label]) => (
              <li className="unit" key={to}>
                <span className="n">{n}</span>
                <Link to={to} className="unit-title">
                  {n ? `${t('Appendix {n}', { n })} · ` : ''}
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
