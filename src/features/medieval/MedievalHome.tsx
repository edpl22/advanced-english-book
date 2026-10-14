import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GRAMMAR_NOTES, LETTERS, MEDIEVAL_QUIZ, PRONOUNS, TEXTS, TIMELINE, WORD_ORIGINS } from '@content/medieval';
import { BookTable } from '@/components/Blocks';
import { RichText } from '@/components/RichText';
import { ItemView } from '@/components/ItemView';
import { Rng, randomSeedString } from '@/lib/rng';
import { speak, speechSupported } from '@/lib/speech';

const PERIOD = { OE: 'Old English', ME: 'Middle English', EModE: 'Early Modern English' } as const;

const SECTIONS: Array<[string, string]> = [
  ['timeline', 'Timeline'],
  ['letters', 'The lost letters'],
  ['grammar', 'Grammar then and now'],
  ['texts', 'Texts'],
  ['origins', 'Word origins'],
  ['quiz', 'Quiz'],
];

export default function MedievalHome() {
  const [params] = useSearchParams();
  const target = params.get('s');
  const [quizSeed, setQuizSeed] = useState(randomSeedString);
  const [quizSection, setQuizSection] = useState<string>('all');

  useEffect(() => {
    if (target) document.getElementById(`me-${target}`)?.scrollIntoView();
  }, [target]);

  const quiz = useMemo(() => {
    const pool = quizSection === 'all' ? MEDIEVAL_QUIZ : MEDIEVAL_QUIZ.filter((q) => q.ref === `ME.${quizSection}`);
    return new Rng(quizSeed).sample(pool, 10);
  }, [quizSeed, quizSection]);

  return (
    <div className="single">
      <div className="running-head">
        <span>Beyond the Book</span>
        <span>Old &amp; Middle English</span>
      </div>
      <h1 className="sc">Old &amp; Middle English</h1>
      <p className="dropcap">
        English has been written for about thirteen centuries. A speaker of today needs a translation to read Beowulf, can puzzle through Chaucer
        with notes, and reads Shakespeare with only occasional help. This chapter is a short tour of that history — for curiosity, and because it
        explains many oddities of modern spelling and grammar.
      </p>
      <nav className="muted" aria-label="Sections">
        {SECTIONS.map(([id, label], i) => (
          <span key={id}>
            <a
              href={`#me-${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(`me-${id}`)?.scrollIntoView();
              }}
            >
              {label}
            </a>
            {i < SECTIONS.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </nav>

      <section id="me-timeline">
        <div className="section-title">
          <span className="num">I</span>
          <h2>Timeline</h2>
        </div>
        <p className="muted">Old English c. 450–1100 · Middle English 1100–1500 · Early Modern English 1500–1700</p>
        <ul className="timeline">
          {TIMELINE.map((t) => (
            <li key={t.date}>
              <span className="date">{t.date}</span> <span className="tag">{PERIOD[t.period]}</span> {t.event}
            </li>
          ))}
        </ul>
      </section>

      <section id="me-letters">
        <div className="section-title">
          <span className="num">II</span>
          <h2>The lost letters</h2>
        </div>
        <div className="table-wrap">
          <table className="book-table">
            <thead>
              <tr>
                <th>Letter</th>
                <th>Name</th>
                <th>Sound</th>
                <th>Story</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {LETTERS.map((l) => (
                <tr key={l.name}>
                  <td className="medieval" style={{ fontSize: '1.6rem', whiteSpace: 'nowrap' }}>
                    {l.glyph}
                  </td>
                  <td>
                    <b>{l.name}</b>
                  </td>
                  <td>{l.sound}</td>
                  <td>{l.story}</td>
                  <td className="medieval">{l.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="me-grammar">
        <div className="section-title">
          <span className="num">III</span>
          <h2>Grammar then and now</h2>
        </div>
        {GRAMMAR_NOTES.map((g) => (
          <div key={g.title}>
            <h3 className="subhead">{g.title}</h3>
            <p>
              <RichText text={g.text} />
            </p>
            {g.title === 'Thou and you' && <BookTable caption="Second-person pronouns in Early Modern English" head={PRONOUNS.head} rows={PRONOUNS.rows} />}
          </div>
        ))}
      </section>

      <section id="me-texts">
        <div className="section-title">
          <span className="num">IV</span>
          <h2>Texts</h2>
        </div>
        <p className="muted">Originals on the left (public domain); line-by-line modern renderings on the right.</p>
        {TEXTS.map((t) => (
          <article key={t.id} style={{ marginBottom: '2rem' }}>
            <h3 className="subhead">{t.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {t.source} · {PERIOD[t.period]}{' '}
              {speechSupported() && t.period === 'EModE' && (
                <button type="button" className="linkish" onClick={() => speak(t.lines.map((l) => l[0]).join(' '), { rate: 0.85 })}>
                  listen
                </button>
              )}
            </p>
            <div className="interlinear">
              {t.lines.map(([orig, modern], i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div className="ol" lang={t.period === 'OE' ? 'ang' : t.period === 'ME' ? 'enm' : 'en'}>
                    {orig}
                  </div>
                  <div className="ml" lang="en">
                    {modern}
                  </div>
                </div>
              ))}
            </div>
            <ul style={{ fontSize: '0.92rem' }}>
              {t.notes.map((n, i) => (
                <li key={i}>
                  <RichText text={n} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section id="me-origins">
        <div className="section-title">
          <span className="num">V</span>
          <h2>Word origins</h2>
        </div>
        <div className="table-wrap">
          <table className="book-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Then</th>
                <th>Now</th>
                <th>How it changed</th>
              </tr>
            </thead>
            <tbody>
              {WORD_ORIGINS.map((w) => (
                <tr key={w.word}>
                  <td>
                    <b>{w.word}</b>
                  </td>
                  <td>{w.then}</td>
                  <td>{w.now}</td>
                  <td className="muted">{w.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="me-quiz">
        <div className="section-title">
          <span className="num">VI</span>
          <h2>Quiz</h2>
        </div>
        <div className="field no-print">
          <label htmlFor="me-sec">Section</label>
          <select id="me-sec" value={quizSection} onChange={(e) => setQuizSection(e.target.value)}>
            <option value="all">all ({MEDIEVAL_QUIZ.length} questions)</option>
            {SECTIONS.slice(0, 5).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <button type="button" className="btn" onClick={() => setQuizSeed(randomSeedString())}>
            New quiz
          </button>
        </div>
        {quiz.map((q, i) => (
          <ItemView key={`${quizSeed}-${q.id}`} item={q} n={i + 1} context="medieval" />
        ))}
      </section>
    </div>
  );
}
