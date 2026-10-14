import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getUnit } from '@content/units';
import { tocUnit } from '@content/units/toc';
import { PART_TITLES, TOPIC_INFO, type Topic } from '@/lib/topics';
import { itemPoints } from '@/lib/schema';
import { Blocks, BookTable } from '@/components/Blocks';
import { ExerciseBlock } from '@/components/ExerciseBlock';
import { Paragraphs, RichText } from '@/components/RichText';
import { update } from '@/lib/storage';
import { useStore } from '@/lib/useStore';
import { GENERATORS } from '@/lib/generators';

function BookmarkButton({ path, label }: { path: string; label: string }) {
  const state = useStore();
  const marked = state.bookmarks.some((b) => b.path === path);
  return (
    <button
      type="button"
      className="linkish"
      aria-pressed={marked}
      onClick={() =>
        update((s) => ({
          ...s,
          bookmarks: marked ? s.bookmarks.filter((b) => b.path !== path) : [...s.bookmarks, { path, label, at: Date.now() }],
        }))
      }
    >
      {marked ? 'Remove bookmark' : 'Bookmark this unit'}
    </button>
  );
}

export function UnitPage() {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const unit = getUnit(id);
  const toc = tocUnit(id);
  const target = params.get('s');

  useEffect(() => {
    if (!target) return;
    const el = document.getElementById(`s-${target}`);
    if (el) {
      el.scrollIntoView({ block: 'start' });
      (el.querySelector('h2') as HTMLElement | null)?.focus?.();
    }
  }, [target, id]);

  if (!toc) {
    return (
      <div className="single">
        <p>There is no unit with this number. Go back to the <Link to="/book">contents</Link>.</p>
      </div>
    );
  }

  if (!unit) return <UnitInPreparation id={id} />;

  const points = unit.exercises.flatMap((e) => e.items).reduce((n, it) => n + itemPoints(it), 0);

  return (
    <article className="single" aria-labelledby="unit-title">
      <div className="running-head">
        <span>
          Unit {unit.number} · {unit.title}
        </span>
        <span>
          Part {unit.part} · {PART_TITLES[unit.part]}
        </span>
      </div>

      <header className="unit-opening">
        <div className="chapter-number" aria-hidden="true">
          {unit.number}
        </div>
        <div>
          <div className="kicker">
            Unit {unit.number} · Part {unit.part} · {unit.levelRange}
          </div>
          <h1 id="unit-title">{unit.title}</h1>
        </div>
      </header>

      <div className="with-margin">
        <div>
          <p className="dropcap">
            <RichText text={unit.intro} />
          </p>
          <nav aria-label="In this unit" className="muted" style={{ fontSize: '0.95rem' }}>
            <span className="sc">In this unit: </span>
            {unit.sections.map((s, i) => (
              <span key={s.id}>
                <a href={`#s-${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`s-${s.id}`)?.scrollIntoView(); }}>
                  {s.id} {s.title}
                </a>
                {i < unit.sections.length - 1 ? ' · ' : ''}
              </span>
            ))}
            {' · '}
            <a href="#exercises" onClick={(e) => { e.preventDefault(); document.getElementById('exercises')?.scrollIntoView(); }}>
              Exercises ({points} items)
            </a>
          </nav>
        </div>
        <div className="margin-col no-print">
          <div className="margin-note">
            <span className="label">This unit</span>
            <BookmarkButton path={`/book/unit/${unit.id}`} label={`${unit.number} ${unit.title}`} />
            <br />
            <button type="button" className="linkish" onClick={() => window.print()}>
              Print as book pages
            </button>
            <br />
            <Link to={`/book/unit/${unit.id}/practice`}>More practice</Link>
          </div>
        </div>
      </div>

      {unit.sections.map((s) => (
        <section key={s.id} id={`s-${s.id}`} aria-labelledby={`h-${s.id}`}>
          <div className="section-title">
            <span className="num">{s.id}</span>
            <h2 id={`h-${s.id}`} tabIndex={-1}>
              {s.title}
            </h2>
          </div>
          <Blocks blocks={s.blocks} />
          {s.footnotes && (
            <div className="footnotes">
              <ol>
                {s.footnotes.map((f, i) => (
                  <li key={i}>
                    <RichText text={f} />
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      ))}

      <section aria-labelledby="examples-h">
        <div className="section-title">
          <span className="num">§</span>
          <h2 id="examples-h">{unit.examples.title}</h2>
        </div>
        <div className="with-margin">
          <div className="passage" lang="en">
            <Paragraphs text={unit.examples.text} />
          </div>
          {unit.examples.note && (
            <div className="margin-col">
              <div className="margin-note">
                <span className="label">Task</span>
                <RichText text={unit.examples.note} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="mistakes-h" lang="pt-BR">
        <div className="section-title">
          <span className="num">§</span>
          <h2 id="mistakes-h">Common mistakes by Brazilian learners</h2>
        </div>
        <ul className="mistakes prose" style={{ marginLeft: 0 }}>
          {unit.mistakes.map((m, i) => (
            <li key={i}>
              <div lang="en">
                <span className="wrong">{m.wrong}</span> → <span className="right">{m.right}</span>
              </div>
              <div className="why">
                <RichText text={m.why} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="exam-h">
        <div className="section-title">
          <span className="num">§</span>
          <h2 id="exam-h">Exam focus</h2>
        </div>
        <div className="prose" style={{ marginLeft: 0 }}>
          {unit.examFocus.map((f, i) => (
            <p key={i}>
              <b>{f.exam}</b>{' '}
              <span className="tags">
                {f.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </span>
              <br />
              <RichText text={f.text} />
            </p>
          ))}
        </div>
      </section>

      <section id="exercises" aria-labelledby="ex-h">
        <div className="section-title print-break">
          <span className="num">✎</span>
          <h2 id="ex-h">Exercises</h2>
        </div>
        {unit.exercises.map((ex) => (
          <ExerciseBlock key={ex.id} ex={ex} />
        ))}
      </section>

      <section aria-labelledby="review-h">
        <div className="section-title">
          <span className="num">§</span>
          <h2 id="review-h">Quick review</h2>
        </div>
        <div className="with-margin">
          <div>
            <ul>
              {unit.quickReview.points.map((p, i) => (
                <li key={i}>
                  <RichText text={p} />
                </li>
              ))}
            </ul>
            {unit.quickReview.table && <BookTable head={unit.quickReview.table.head} rows={unit.quickReview.table.rows} />}
            <h3 className="subhead">Check yourself</h3>
            <ol>
              {unit.quickReview.selfCheck.map((q, i) => (
                <li key={i}>
                  <RichText text={q.q} />{' '}
                  <details style={{ display: 'inline' }}>
                    <summary className="linkish" style={{ display: 'inline' }}>
                      answer
                    </summary>{' '}
                    <i>{q.a}</i>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-h" className="no-print">
        <div className="section-title">
          <span className="num">∞</span>
          <h2 id="more-h">More practice</h2>
        </div>
        <p>
          Unlimited new items on this unit, produced by the grammar generators with guaranteed answers:{' '}
          <Link to={`/book/unit/${unit.id}/practice`} className="btn accent" style={{ textDecoration: 'none' }}>
            More practice
          </Link>
        </p>
      </section>
    </article>
  );
}

function UnitInPreparation({ id }: { id: string }) {
  const toc = tocUnit(id)!;
  const topics = (Object.entries(TOPIC_INFO) as Array<[Topic, (typeof TOPIC_INFO)[Topic]]>).filter(([, v]) => v.unit === toc.number).map(([k]) => k);
  const gens = GENERATORS.filter((g) => topics.includes(g.topic) && !g.key.startsWith('phrasal-') && g.key !== 'tenses');
  return (
    <div className="single">
      <div className="running-head">
        <span>
          Unit {toc.number} · {toc.title}
        </span>
        <span>
          Part {toc.part} · {toc.partTitle}
        </span>
      </div>
      <header className="unit-opening">
        <div className="chapter-number" aria-hidden="true">
          {toc.number}
        </div>
        <div>
          <div className="kicker">Unit {toc.number} · in preparation (phase {toc.phase})</div>
          <h1>{toc.title}</h1>
        </div>
      </header>
      <p>The full text of this unit is being written. These are its planned sections:</p>
      <ol>
        {toc.sections.map((s, i) => (
          <li key={i}>
            {toc.number}.{i + 1} {s}
          </li>
        ))}
      </ol>
      {gens.length > 0 ? (
        <p className="notice">
          You can already practise this unit’s grammar with the generators:{' '}
          <Link to={`/book/unit/${id}/practice`}>More practice ({gens.map((g) => g.title).join('; ')})</Link>.
        </p>
      ) : null}
      <p>
        <Link to="/book">← Contents</Link>
      </p>
    </div>
  );
}
