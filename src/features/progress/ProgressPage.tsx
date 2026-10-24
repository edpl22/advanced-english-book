import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UNITS } from '@content/units';
import { useStore } from '@/lib/useStore';
import { dueForReview, everCorrect, frequentErrors, inReview, setUnitCompleted, topicAccuracy } from '@/lib/progress';
import { exportJson, importJson, resetAll, isStorageAvailable } from '@/lib/storage';
import { topicLabel } from '@/lib/topics';
import { itemPoints, type Item } from '@/lib/schema';
import { regenerate } from '@/lib/generators';
import { refPath } from '@/components/RichText';
import { ItemView } from '@/components/ItemView';
import { loadPool } from '../exams/pool';
import { fmtDate, useT } from '@/lib/i18n';

function findItem(id: string): Item | null {
  if (id.startsWith('g:')) return regenerate(id);
  const pool = loadPool();
  return pool.items.find((i) => i.id === id) ?? pool.passages.flatMap((p) => p.questions).find((q) => q.id === id) ?? null;
}

function Bar({ value }: { value: number }) {
  return (
    <span className="bar-track" aria-hidden="true">
      <span className="bar" style={{ width: `${Math.round(value * 100)}%` }} />
    </span>
  );
}

export default function ProgressPage() {
  const state = useStore();
  const t = useT();
  /** Items of the review in progress, fixed when it starts so answered ones stay on the page. */
  const [reviewIds, setReviewIds] = useState<string[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const correct = everCorrect(state);
  const acc = topicAccuracy(state);
  const errors = frequentErrors(state, 10);
  const due = dueForReview(state);
  const review = inReview(state);
  const reviewItems = useMemo(() => (reviewIds ?? []).map(findItem).filter((x): x is Item => !!x), [reviewIds]);

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `english-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const onImport = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    const err = importJson(text, 'merge');
    setMsg(err ? t(err) : t('Progress imported and merged with what was already on this device.'));
  };

  return (
    <div className="single">
      <div className="running-head">
        <span>{t('My Progress')}</span>
        <span>{state.attempts.length === 1 ? t('1 answer recorded') : t('{n} answers recorded', { n: state.attempts.length })}</span>
      </div>
      <h1 className="sc">{t('My Progress')}</h1>
      {!isStorageAvailable() && <p className="notice">{t('Saving is blocked in this browser: export your progress before closing the page.')}</p>}

      <section>
        <h2 className="subhead">{t('Units')}</h2>
        <table className="ledger">
          <thead>
            <tr>
              <th>{t('Unit')}</th>
              <th className="num">{t('Items done')}</th>
              <th>{t('Progress')}</th>
              <th>
                <span className="sr-only">{t('Mark as completed')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {UNITS.map((u) => {
              const items = u.exercises.flatMap((e) => e.items);
              const done = items.filter((i) => correct.has(i.id)).length;
              const pts = items.reduce((n, i) => n + itemPoints(i), 0);
              const marked = Boolean(state.completed[u.id]);
              return (
                <tr key={u.id}>
                  <td>
                    <Link to={`/book/unit/${u.id}`}>
                      {u.number} · {u.title}
                    </Link>
                  </td>
                  <td className="num">
                    {done}/{items.length} <span className="muted">({t('{n} marks', { n: pts })})</span>
                  </td>
                  <td>
                    <Bar value={marked ? 1 : done / Math.max(1, items.length)} /> {marked ? '✓' : `${Math.round((done / Math.max(1, items.length)) * 100)}%`}
                  </td>
                  <td>
                    <button type="button" className="linkish" aria-pressed={marked} onClick={() => setUnitCompleted(u.id, !marked)}>
                      {marked ? t('Completed (undo)') : t('Mark as completed')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="subhead">{t('Accuracy by topic')}</h2>
        {Object.keys(acc).length === 0 ? (
          <p className="muted">{t('No answers yet. Start with a unit or a practice test.')}</p>
        ) : (
          <table className="ledger">
            <thead>
              <tr>
                <th>{t('Topic')}</th>
                <th className="num">{t('Correct')}</th>
                <th>{t('Accuracy')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(acc)
                .sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1])
                .map(([tp, [c, n]]) => (
                  <tr key={tp}>
                    <td>{t(topicLabel(tp))}</td>
                    <td className="num">
                      {c}/{n}
                    </td>
                    <td>
                      <Bar value={c / n} /> {Math.round((c / n) * 100)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="subhead">{t('Your ten most frequent errors')}</h2>
        {errors.length === 0 ? (
          <p className="muted">{t('None so far.')}</p>
        ) : (
          <ol>
            {errors.map((e) => {
              const item = findItem(e.itemId);
              const label = (item && 'prompt' in item ? item.prompt : item && item.type === 'kwt' ? item.first : undefined) ?? e.itemId;
              return (
                <li key={e.itemId}>
                  <span lang="en">{label.length > 90 ? `${label.slice(0, 90)}…` : label}</span>{' '}
                  <span className="muted">
                    ({e.wrong}× · {t(topicLabel(e.topic))})
                  </span>{' '}
                  {e.ref && <Link to={refPath(e.ref)}>{t('review {ref}', { ref: e.ref })}</Link>}
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section>
        <h2 className="subhead">{t('Spaced review')}</h2>
        <p>
          {t('{n} items in review (boxes 1–5)', { n: review.length })} · <b>{due.length}</b> {t('due today.')}{' '}
          <span className="muted">
            {t('An item you get wrong enters box 1; each correct review moves it up a box (1, 2, 4, 8, 16 days); a mistake sends it back to box 1.')}
          </span>
        </p>
        {due.length > 0 && !reviewIds && (
          <button type="button" className="btn primary" onClick={() => setReviewIds(due.slice(0, 15).map(([id]) => id))}>
            {t('Review {n} items now', { n: Math.min(15, due.length) })}
          </button>
        )}
        {reviewIds && (
          <>
            {reviewItems.map((it, i) => (
              <ItemView key={it.id} item={it} n={i + 1} context="review" showSource />
            ))}
            <button type="button" className="btn" onClick={() => setReviewIds(null)}>
              {due.length > 0 ? t('Finish this round ({n} still due)', { n: due.length }) : t('Finish review')}
            </button>
          </>
        )}
      </section>

      <section>
        <h2 className="subhead">{t('Tests')}</h2>
        {state.tests.length === 0 ? (
          <p className="muted">{t('No practice tests or TOEFL-format simulations yet.')}</p>
        ) : (
          <table className="ledger">
            <thead>
              <tr>
                <th>{t('Date')}</th>
                <th>{t('Kind')}</th>
                <th>{t('Paper')}</th>
                <th className="num">{t('Score')}</th>
                <th className="num">{t('Time')}</th>
              </tr>
            </thead>
            <tbody>
              {[...state.tests].reverse().map((x) => (
                <tr key={x.id}>
                  <td>{fmtDate(state.settings.lang, new Date(x.at), { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>{x.kind === 'toefl' ? t('TOEFL format') : t('Practice')}</td>
                  <td>
                    {x.title}{' '}
                    <span className="muted">
                      · {t('seed')} {x.seed}
                    </span>
                  </td>
                  <td className="num">{x.kind === 'toefl' && x.bands ? t('band {n}', { n: x.bands.overall }) : `${x.score}/${x.max}`}</td>
                  <td className="num">{Math.round(x.durationSec / 60)} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="subhead">{t('Bookmarks')}</h2>
        {state.bookmarks.length === 0 ? (
          <p className="muted">{t('Use “Bookmark this unit” in any unit.')}</p>
        ) : (
          <ul>
            {state.bookmarks.map((b) => (
              <li key={b.path}>
                <Link to={b.path}>{b.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="subhead">{t('Export and import')}</h2>
        <p>{t('Your progress lives only on this device. Export it to keep a copy or move it to another browser.')}</p>
        <div className="btn-row">
          <button type="button" className="btn" onClick={download}>
            {t('Export progress (JSON)')}
          </button>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            {t('Import progress…')}
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => onImport(e.target.files?.[0])} />
          <button
            type="button"
            className="linkish"
            onClick={() => {
              if (window.confirm(t('Erase all progress on this device? Export it first if you want a copy.'))) {
                resetAll();
                setMsg(t('All progress erased.'));
              }
            }}
          >
            {t('reset everything')}
          </button>
        </div>
        {msg && (
          <p className="notice" role="status">
            {msg}
          </p>
        )}
      </section>
    </div>
  );
}
