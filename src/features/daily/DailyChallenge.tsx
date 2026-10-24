import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemView } from '@/components/ItemView';
import { refPath } from '@/components/RichText';
import { checkItem, type CheckResult, type ItemResponse } from '@/lib/checking';
import { completeDay, dailyItems, dailyScore, dateKey, DAILY_COUNT, liveStreak, shiftDay } from '@/lib/daily';
import { knownWords } from '@/lib/knownWords';
import { recordAnswer } from '@/lib/progress';
import type { LevelT } from '@/lib/schema';
import { update, type Daily } from '@/lib/storage';
import { TOPIC_INFO, type Topic } from '@/lib/topics';
import { useStore } from '@/lib/useStore';
import { loadPool } from '@/features/exams/pool';
import { fmtDate, N_, useT, type Lang } from '@/lib/i18n';

const LEVELS: Array<[LevelT, string]> = [
  ['B1', N_('Intermediate')],
  ['B2', N_('Upper-intermediate')],
  ['C1', N_('Advanced')],
  ['C2', N_('Proficiency')],
];

type Verdict = 'correct' | 'almost' | 'incorrect';
const VERDICT: Record<Verdict, string> = { correct: N_('Correct'), almost: N_('Almost'), incorrect: N_('Not quite') };

/** Re-render every second, so the date and the countdown stay current. */
function useClock(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

function untilMidnight(now: Date): string {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const s = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

const fmtScore = (n: number) => (Number.isInteger(n) ? String(n) : `${Math.floor(n)}½`);

function longDate(key: string, lang: Lang): string {
  const [y, m, d] = key.split('-').map(Number);
  return fmtDate(lang, new Date(y, m - 1, d), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/** The streak and a two-week calendar strip. */
function StreakPanel({ daily, today, lang }: { daily: Daily; today: string; lang: Lang }) {
  const t = useT();
  const streak = liveStreak(daily, today);
  const days = Array.from({ length: 14 }, (_, i) => shiftDay(today, i - 13));
  return (
    <section className="streak-panel" aria-label={t('Your daily streak')}>
      <div className="streak-count">
        <span className="streak-num">{streak}</span>
        <span className="streak-label">
          {streak === 1 ? t('day in a row') : t('days in a row')}
          <span className="streak-best">{t('best {n}', { n: daily.best })}</span>
        </span>
      </div>
      <ol className="streak-days" aria-label={t('The last fourteen days')}>
        {days.map((d) => {
          const rec = daily.days[d];
          const [, , dd] = d.split('-');
          const weekday = fmtDate(lang, new Date(`${d}T12:00:00`), { weekday: 'narrow' });
          return (
            <li
              key={d}
              className={`day${rec ? ' is-done' : ''}${d === today ? ' is-today' : ''}`}
              title={rec ? `${longDate(d, lang)}: ${fmtScore(rec.score)}/${rec.total}` : `${longDate(d, lang)}: ${t('not done')}`}
            >
              <span className="day-w" aria-hidden="true">
                {weekday}
              </span>
              <span className="day-mark" aria-hidden="true" />
              <span className="day-n">{Number(dd)}</span>
              <span className="sr-only">{rec ? t('done, {score} of {total}', { score: fmtScore(rec.score), total: rec.total }) : t('not done')}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Ledger({ items, results, at }: { items: ReturnType<typeof dailyItems>; results: Verdict[]; at: number }) {
  const t = useT();
  const state = (i: number) => (results[i] ? t(VERDICT[results[i]]) : i === at ? t('current') : t('to do'));
  return (
    <ol className="daily-ledger" aria-label={t('Questions')}>
      {items.map((it, i) => (
        <li key={it.id} className={`${results[i] ?? ''}${i === at ? ' is-now' : ''}`.trim()} title={t(TOPIC_INFO[it.topics[0] as Topic]?.label ?? '')}>
          <span className="sr-only">{t('Question {n}: {state}', { n: i + 1, state: state(i) })}</span>
        </li>
      ))}
    </ol>
  );
}

export default function DailyChallenge() {
  const state = useStore();
  const t = useT();
  const lang = state.settings.lang;
  const topicName = (tp: string) => t(TOPIC_INFO[tp as Topic]?.label ?? tp);
  const now = useClock();
  const today = dateKey(now);
  const daily = state.daily;
  const pool = useMemo(() => loadPool(), []);
  const current = daily.current?.date === today ? daily.current : null;
  const record = daily.days[today];
  const level = (current?.level ?? daily.level) as LevelT;
  const items = useMemo(() => dailyItems(pool, today, level), [pool, today, level]);

  const [response, setResponse] = useState<ItemResponse>(undefined);
  const [checked, setChecked] = useState<CheckResult | null>(null);

  const results = (current?.results ?? []) as Verdict[];
  const index = checked ? results.length - 1 : results.length;
  const item = items[index];

  const start = () =>
    update((s) => ({ ...s, daily: { ...s.daily, current: { date: today, level: s.daily.level, results: [] } } }));

  const check = () => {
    if (!item || checked) return;
    const r = checkItem(item, response, { knownWords: knownWords() });
    recordAnswer(item.id, item.topics[0], r.verdict, 'daily', item.ref);
    setChecked(r);
    update((s) => {
      const c = s.daily.current;
      if (!c || c.date !== today) return s;
      return { ...s, daily: { ...s.daily, current: { ...c, results: [...c.results, r.verdict] } } };
    });
  };

  const next = () => {
    setChecked(null);
    setResponse(undefined);
    if (results.length >= DAILY_COUNT) finish();
  };

  const finish = () =>
    update((s) => {
      const c = s.daily.current;
      const res = (c?.results ?? []) as Verdict[];
      return { ...s, daily: completeDay(s.daily, dailyScore(res), DAILY_COUNT, c?.level ?? s.daily.level, today) };
    });

  // ── Completed today ────────────────────────────────────────────────
  if (record) {
    const streak = liveStreak(daily, today);
    return (
      <div className="daily single">
        <header className="daily-head">
          <p className="daily-kicker">
            {t('Daily Challenge')} · {longDate(today, lang)}
          </p>
          <h1>{t('Today’s page is done')}</h1>
        </header>
        <div className="daily-result">
          <p className="daily-score">
            <span className="big">{fmtScore(record.score)}</span>
            <span className="of">/ {record.total}</span>
          </p>
          <p className="daily-verdict">
            {streak > 1
              ? t('Day {n} in a row. Keep the chain unbroken tomorrow.', { n: streak })
              : t('A new streak begins today. Come back tomorrow to make it two.')}
          </p>
          <p className="muted">
            {t('Next challenge in')} <span className="countdown">{untilMidnight(now)}</span>
          </p>
        </div>
        <StreakPanel daily={daily} today={today} lang={lang} />
        <h2 className="subhead">{t('Today’s topics')}</h2>
        <ol className="daily-topics">
          {items.map((it) => (
            <li key={it.id}>
              <Link to={refPath(it.ref)}>{topicName(it.topics[0])}</Link>
              <span className="muted"> · {it.ref}</span>
            </li>
          ))}
        </ol>
        <p className="muted">
          {t('Want more?')} <Link to="/tests">{t('Set a practice paper')}</Link> {t('or')}{' '}
          <Link to="/progress">{t('review the questions you missed')}</Link>.
        </p>
      </div>
    );
  }

  // ── Not started ────────────────────────────────────────────────────
  if (!current) {
    const streak = liveStreak(daily, today);
    const atRisk = streak > 0 && daily.last === shiftDay(today, -1);
    return (
      <div className="daily single">
        <header className="daily-head">
          <p className="daily-kicker">
            {t('Daily Challenge')} · {longDate(today, lang)}
          </p>
          <h1>{t('Ten questions, ten topics')}</h1>
          <p className="daily-lede">
            {t('A short page from every corner of the book, the same for everyone today. Finish all ten to keep your streak; miss a day and it starts again.')}
          </p>
        </header>
        <StreakPanel daily={daily} today={today} lang={lang} />
        {atRisk && (
          <p className="notice" role="note">
            {t('Your {n}-day streak ends at midnight unless you finish today’s challenge — {time} left.', { n: streak, time: untilMidnight(now) })}
          </p>
        )}
        <fieldset className="daily-level">
          <legend>{t('Level')}</legend>
          <div className="level-choice">
            {LEVELS.map(([lv, label]) => (
              <label key={lv} className={daily.level === lv ? 'is-on' : ''}>
                <input
                  type="radio"
                  name="daily-level"
                  value={lv}
                  checked={daily.level === lv}
                  onChange={() => update((s) => ({ ...s, daily: { ...s.daily, level: lv } }))}
                />
                <span className="lv">{lv}</span>
                <span className="lv-label">{t(label)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <h2 className="subhead">{t('Today’s topics')}</h2>
        <p className="daily-topic-line">
          {items.map((it, i) => (
            <span key={it.id}>
              {topicName(it.topics[0])}
              {i < items.length - 1 ? <span className="sep"> · </span> : ''}
            </span>
          ))}
        </p>
        <button type="button" className="btn primary daily-start" onClick={start}>
          {t('Begin today’s challenge')}
        </button>
      </div>
    );
  }

  // ── In progress ────────────────────────────────────────────────────
  const finished = results.length >= DAILY_COUNT && !checked;
  return (
    <div className="daily single">
      <header className="daily-bar">
        <span className="daily-kicker">
          {t('Daily Challenge')} · {level} · {t('question {n} of {total}', { n: Math.min(index + 1, DAILY_COUNT), total: DAILY_COUNT })}
        </span>
        <Ledger items={items} results={results} at={index} />
      </header>
      {finished || !item ? (
        <div className="daily-result">
          <p className="daily-score">
            <span className="big">{fmtScore(dailyScore(results))}</span>
            <span className="of">/ {DAILY_COUNT}</span>
          </p>
          <button type="button" className="btn primary" onClick={finish}>
            {t('Close the page and count the day')}
          </button>
        </div>
      ) : (
        <div
          className="daily-card"
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || !(e.target instanceof HTMLInputElement) || e.target.type === 'radio') return;
            e.preventDefault();
            if (checked) next();
            else check();
          }}
        >
          <p className="daily-topic">
            <span className="sc">{topicName(item.topics[0])}</span>
            <span className="muted"> · {item.level}</span>
          </p>
          <ItemView key={`${item.id}-${checked ? 'r' : 'q'}`} item={item} n={index + 1} mode={checked ? 'review' : 'test'} response={response} onResponse={setResponse} context="daily" />
          <div className="daily-actions">
            {checked ? (
              <button type="button" className="btn primary" onClick={next} autoFocus>
                {results.length >= DAILY_COUNT ? t('See my score') : t('Next question')} <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button type="button" className="btn primary" onClick={check} disabled={response === undefined}>
                {t('Check')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
