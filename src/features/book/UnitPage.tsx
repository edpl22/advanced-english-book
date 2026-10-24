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
import { setUnitCompleted } from '@/lib/progress';
import { fmtDate, useLangTag, useT } from '@/lib/i18n';

/** Mark the unit as completed by hand (or undo it). */
function CompleteButton({ unitId, number, big }: { unitId: string; number: number; big?: boolean }) {
  const state = useStore();
  const t = useT();
  const done = Boolean(state.completed[unitId]);
  if (big) {
    return (
      <div className={`unit-finish${done ? ' is-done' : ''}`}>
        <p>
          {done
            ? t('Unit {n} is marked as completed on {date}.', {
                n: number,
                date: fmtDate(state.settings.lang, new Date(state.completed[unitId]), { day: 'numeric', month: 'long', year: 'numeric' }),
              })
            : t('Finished this unit? Mark it as completed: the contents and My Progress will show it as done.')}
        </p>
        <button type="button" className={done ? 'btn' : 'btn primary'} aria-pressed={done} onClick={() => setUnitCompleted(unitId, !done)}>
          {done ? t('Mark as not completed') : t('Mark Unit {n} as completed', { n: number })}
        </button>
      </div>
    );
  }
  return (
    <button type="button" className="linkish" aria-pressed={done} onClick={() => setUnitCompleted(unitId, !done)}>
      {done ? t('✓ Completed (undo)') : t('Mark as completed')}
    </button>
  );
}

function BookmarkButton({ path, label }: { path: string; label: string }) {
  const state = useStore();
  const t = useT();
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
      {marked ? t('Remove bookmark') : t('Bookmark this unit')}
    </button>
  );
}

export function UnitPage() {
  const { id = '' } = useParams();
  const t = useT();
  const langTag = useLangTag();
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
        <p>
          {t('There is no unit with this number.')} <Link to="/book">← {t('Contents')}</Link>
        </p>
      </div>
    );
  }

  if (!unit) return <UnitInPreparation id={id} />;

  const points = unit.exercises.flatMap((e) => e.items).reduce((n, it) => n + itemPoints(it), 0);

  return (
    <article className="single" aria-labelledby="unit-title">
      <div className="running-head">
        <span>
          {t('Unit {n}', { n: unit.number })} · {unit.title}
        </span>
        <span>
          {t('Part {n}', { n: unit.part })} · {t(PART_TITLES[unit.part])}
        </span>
      </div>

      <header className="unit-opening">
        <div className="chapter-number" aria-hidden="true">
          {unit.number}
        </div>
        <div>
          <div className="kicker">
            {t('Unit {n}', { n: unit.number })} · {t('Part {n}', { n: unit.part })} · {unit.levelRange}
          </div>
          <h1 id="unit-title" lang="en">
            {unit.title}
          </h1>
        </div>
      </header>

      <div className="with-margin">
        <div>
          <p className="dropcap" lang="en">
            <RichText text={unit.intro} />
          </p>
          <nav aria-label={t('In this unit')} className="muted" style={{ fontSize: '0.95rem' }}>
            <span className="sc">{t('In this unit')}: </span>
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
              {t('Exercises ({n} items)', { n: points })}
            </a>
          </nav>
        </div>
        <div className="margin-col no-print">
          <div className="margin-note">
            <span className="label">{t('This unit')}</span>
            <BookmarkButton path={`/book/unit/${unit.id}`} label={`${unit.number} ${unit.title}`} />
            <br />
            <CompleteButton unitId={unit.id} number={unit.number} />
            <br />
            <button type="button" className="linkish" onClick={() => window.print()}>
              {t('Print as book pages')}
            </button>
            <br />
            <Link to={`/book/unit/${unit.id}/practice`}>{t('More practice')}</Link>
          </div>
        </div>
      </div>

      {unit.sections.map((s) => (
        <section key={s.id} id={`s-${s.id}`} aria-labelledby={`h-${s.id}`} lang="en">
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

      <section aria-labelledby="examples-h" lang="en">
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
                <span className="label">{t('Task')}</span>
                <RichText text={unit.examples.note} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="mistakes-h" lang="pt-BR">
        <div className="section-title">
          <span className="num">§</span>
          <h2 id="mistakes-h">{t('Common mistakes by Brazilian learners')}</h2>
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
          <h2 id="exam-h">{t('Exam focus')}</h2>
        </div>
        <div className="prose" style={{ marginLeft: 0 }} lang="en">
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
          <h2 id="ex-h">{t('Exercises')}</h2>
        </div>
        {unit.exercises.map((ex) => (
          <ExerciseBlock key={ex.id} ex={ex} />
        ))}
      </section>

      <section aria-labelledby="review-h">
        <div className="section-title">
          <span className="num">§</span>
          <h2 id="review-h">{t('Quick review')}</h2>
        </div>
        <div className="with-margin">
          <div lang="en">
            <ul>
              {unit.quickReview.points.map((p, i) => (
                <li key={i}>
                  <RichText text={p} />
                </li>
              ))}
            </ul>
            {unit.quickReview.table && <BookTable head={unit.quickReview.table.head} rows={unit.quickReview.table.rows} />}
            <h3 className="subhead" lang={langTag}>
              {t('Check yourself')}
            </h3>
            <ol>
              {unit.quickReview.selfCheck.map((q, i) => (
                <li key={i}>
                  <RichText text={q.q} />{' '}
                  <details style={{ display: 'inline' }}>
                    <summary className="linkish" style={{ display: 'inline' }} lang={langTag}>
                      {t('answer')}
                    </summary>{' '}
                    <i>{q.a}</i>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <CompleteButton unitId={unit.id} number={unit.number} big />
      </section>

      <section aria-labelledby="more-h" className="no-print">
        <div className="section-title">
          <span className="num">∞</span>
          <h2 id="more-h">{t('More practice')}</h2>
        </div>
        <p>
          {t('Unlimited new items on this unit, produced by the grammar generators with guaranteed answers:')}{' '}
          <Link to={`/book/unit/${unit.id}/practice`} className="btn accent" style={{ textDecoration: 'none' }}>
            {t('More practice')}
          </Link>
        </p>
      </section>
    </article>
  );
}

function UnitInPreparation({ id }: { id: string }) {
  const t = useT();
  const toc = tocUnit(id)!;
  const topics = (Object.entries(TOPIC_INFO) as Array<[Topic, (typeof TOPIC_INFO)[Topic]]>).filter(([, v]) => v.unit === toc.number).map(([k]) => k);
  const gens = GENERATORS.filter((g) => topics.includes(g.topic) && !g.key.startsWith('phrasal-') && g.key !== 'tenses');
  return (
    <div className="single">
      <div className="running-head">
        <span>
          {t('Unit {n}', { n: toc.number })} · {toc.title}
        </span>
        <span>
          {t('Part {n}', { n: toc.part })} · {toc.partTitle}
        </span>
      </div>
      <header className="unit-opening">
        <div className="chapter-number" aria-hidden="true">
          {toc.number}
        </div>
        <div>
          <div className="kicker">
            {t('Unit {n}', { n: toc.number })} · {t('in preparation (phase {n})', { n: toc.phase })}
          </div>
          <h1>{toc.title}</h1>
        </div>
      </header>
      <p>{t('The full text of this unit is being written. These are its planned sections:')}</p>
      <ol>
        {toc.sections.map((s, i) => (
          <li key={i}>
            {toc.number}.{i + 1} {s}
          </li>
        ))}
      </ol>
      {gens.length > 0 ? (
        <p className="notice">
          {t('You can already practise this unit’s grammar with the generators:')}{' '}
          <Link to={`/book/unit/${id}/practice`}>
            {t('More practice')} ({gens.map((g) => g.title).join('; ')})
          </Link>
          .
        </p>
      ) : null}
      <p>
        <Link to="/book">← {t('Contents')}</Link>
      </p>
    </div>
  );
}
