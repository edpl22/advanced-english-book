import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ITEM_TYPES, ITEM_TYPE_LABELS, itemPoints, type Item, type ItemType } from '@/lib/schema';
import { PART_TITLES, TOPIC_INFO, topicLabel, type Topic } from '@/lib/topics';
import { checkItem, answerText, type CheckResult, type ItemResponse } from '@/lib/checking';
import { knownWords } from '@/lib/knownWords';
import { recordAnswer, recentlyCorrect, topicAccuracy } from '@/lib/progress';
import { update, load } from '@/lib/storage';
import { randomSeedString } from '@/lib/rng';
import { generatedTopics } from '@/lib/generators';
import { ItemView } from '@/components/ItemView';
import { Paragraphs } from '@/components/RichText';
import { buildTest, type TestConfig, type TestLevel, type TestPaper } from './sampler';
import { loadPool } from './pool';
import { fmtDate, N_, useLang, useT } from '@/lib/i18n';

const COUNTS = [10, 20, 40, 60, 100];
const LEVELS: Array<[TestLevel, string]> = [
  ['B1', 'B1'],
  ['B2', 'B2'],
  ['C1', 'C1'],
  ['C2', 'C2'],
  ['military', N_('Military entrance exams (ITA · IME · EN · AFA · EFOMM · EsPCEx)')],
];

function availableTopics(): Topic[] {
  const pool = loadPool();
  const s = new Set<Topic>(generatedTopics());
  for (const i of pool.items) s.add(i.topics[0]);
  for (const p of pool.passages) p.topics.forEach((t) => s.add(t));
  s.delete('medieval');
  return [...s];
}

function defaultConfig(): TestConfig {
  return { level: 'C1', topics: ['conditionals', 'phrasal-verbs'], count: 20, types: [], source: 'both', timerMin: null, seed: randomSeedString(), avoidRecent: true };
}

type Phase = { kind: 'config' } | { kind: 'running'; paper: TestPaper; startedAt: number } | { kind: 'results'; paper: TestPaper; responses: ItemResponse[]; results: CheckResult[]; durationSec: number };

export default function PracticeTests() {
  const [cfg, setCfg] = useState<TestConfig>(defaultConfig);
  const [phase, setPhase] = useState<Phase>({ kind: 'config' });
  const [error, setError] = useState<string | null>(null);
  const t = useT();

  const start = (config: TestConfig) => {
    const paper = buildTest(config, loadPool(), config.avoidRecent ? recentlyCorrect() : new Set());
    if (paper.items.length === 0) {
      setError(t('No questions match these settings. Choose more topics, another level or both sources.'));
      return;
    }
    setError(null);
    setPhase({ kind: 'running', paper, startedAt: Date.now() });
  };

  if (phase.kind === 'running') {
    return (
      <Runner
        paper={phase.paper}
        startedAt={phase.startedAt}
        onCancel={() => setPhase({ kind: 'config' })}
        onSubmit={(responses) => {
          const results = phase.paper.items.map((it, i) => checkItem(it, responses[i], { knownWords: knownWords() }));
          const durationSec = Math.round((Date.now() - phase.startedAt) / 1000);
          phase.paper.items.forEach((it, i) => recordAnswer(it.id, it.topics[0], results[i].verdict, 'test', it.ref));
          const byTopic: Record<string, [number, number]> = {};
          phase.paper.items.forEach((it, i) => {
            const acc = (byTopic[it.topics[0]] ??= [0, 0]);
            acc[0] += results[i].score;
            acc[1] += results[i].maxScore;
          });
          const score = results.reduce((n, r) => n + r.score, 0);
          const max = results.reduce((n, r) => n + r.maxScore, 0);
          update((s) => ({
            ...s,
            tests: [
              ...s.tests,
              {
                id: `t-${Date.now()}`,
                kind: 'practice',
                title: `${phase.paper.config.level === 'military' ? t('Military') : phase.paper.config.level} · ${phase.paper.config.topics.map((tp) => t(topicLabel(tp))).join(', ')}`,
                seed: phase.paper.config.seed,
                at: Date.now(),
                durationSec,
                score,
                max,
                config: phase.paper.config as unknown as Record<string, unknown>,
                itemIds: phase.paper.items.map((i) => i.id),
                byTopic,
              },
            ],
          }));
          setPhase({ kind: 'results', paper: phase.paper, responses, results, durationSec });
        }}
      />
    );
  }

  if (phase.kind === 'results') {
    return (
      <Results
        {...phase}
        onAgain={() => setPhase({ kind: 'config' })}
        onWeak={(topics) => {
          const next = { ...phase.paper.config, topics, seed: randomSeedString(), source: 'both' as const };
          setCfg(next);
          start(next);
        }}
      />
    );
  }

  return <Configurator cfg={cfg} setCfg={setCfg} onStart={() => start(cfg)} error={error} />;
}

function Configurator({ cfg, setCfg, onStart, error }: { cfg: TestConfig; setCfg: (c: TestConfig) => void; onStart: () => void; error: string | null }) {
  const t = useT();
  const topics = useMemo(availableTopics, []);
  const pool = loadPool();
  const byPart = useMemo(() => {
    const m = new Map<string, Topic[]>();
    for (const tp of topics) {
      const p = TOPIC_INFO[tp].part;
      if (!m.has(p)) m.set(p, []);
      m.get(p)!.push(tp);
    }
    return [...m.entries()].sort();
  }, [topics]);
  const authoredCount = (tp: Topic) =>
    pool.items.filter((i) => i.topics[0] === tp).length + pool.passages.filter((p) => p.topics.includes(tp)).reduce((n, p) => n + p.questions.length, 0);
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const history = load().tests.filter((x) => x.kind === 'practice').slice(-5).reverse();
  const lang = useLang();

  return (
    <div className="single">
      <div className="running-head">
        <span>{t('Practice Tests')}</span>
        <span>{t('Configure a test paper')}</span>
      </div>
      <h1 className="sc" style={{ marginBottom: '0.5rem' }}>
        {t('Practice Tests')}
      </h1>
      <p className="muted">
        {t('Papers are assembled from the authored bank and the generators, balanced across the topics you choose. The same seed and settings always produce the same paper.')}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onStart();
        }}
      >
        <fieldset>
          <legend>{t('Level')}</legend>
          <div className="check-grid">
            {LEVELS.map(([v, label]) => (
              <label key={v}>
                <input type="radio" name="level" checked={cfg.level === v} onChange={() => setCfg({ ...cfg, level: v })} /> {t(label)}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{t('Topics')}</legend>
          {byPart.map(([part, ts]) => (
            <div key={part} style={{ marginBottom: '0.5rem' }}>
              <div className="muted sc">
                {part === 'X' ? t(PART_TITLES.X) : `${t('Part {n}', { n: part })} · ${t(PART_TITLES[part as keyof typeof PART_TITLES])}`}
              </div>
              <div className="check-grid">
                {ts.map((tp) => (
                  <label key={tp}>
                    <input type="checkbox" checked={cfg.topics.includes(tp)} onChange={() => setCfg({ ...cfg, topics: toggle(cfg.topics, tp) })} />{' '}
                    {t(topicLabel(tp))}
                    <span className="muted" style={{ fontSize: '0.8em' }}>
                      {authoredCount(tp) ? ` (${authoredCount(tp)})` : ` (${t('gen.')})`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="btn-row">
            <button type="button" className="linkish" onClick={() => setCfg({ ...cfg, topics })}>
              {t('all')}
            </button>
            <button type="button" className="linkish" onClick={() => setCfg({ ...cfg, topics: [] })}>
              {t('none')}
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>{t('Number of questions')}</legend>
          <div className="check-grid">
            {COUNTS.map((n) => (
              <label key={n}>
                <input type="radio" name="count" checked={cfg.count === n} onChange={() => setCfg({ ...cfg, count: n })} /> {n}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{t('Question types (none ticked = all)')}</legend>
          <div className="check-grid">
            {ITEM_TYPES.map((ty) => (
              <label key={ty}>
                <input type="checkbox" checked={cfg.types.includes(ty)} onChange={() => setCfg({ ...cfg, types: toggle(cfg.types, ty) as ItemType[] })} />{' '}
                {t(ITEM_TYPE_LABELS[ty])}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{t('Source')}</legend>
          <div className="check-grid">
            {(
              [
                ['both', N_('Both')],
                ['authored', N_('Authored only')],
                ['generated', N_('Generated only')],
              ] as const
            ).map(([v, label]) => (
              <label key={v}>
                <input type="radio" name="source" checked={cfg.source === v} onChange={() => setCfg({ ...cfg, source: v })} /> {t(label)}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{t('Timer and seed')}</legend>
          <div className="field">
            <label htmlFor="timer">{t('Timer')}</label>
            <select id="timer" value={cfg.timerMin ?? 0} onChange={(e) => setCfg({ ...cfg, timerMin: Number(e.target.value) || null })}>
              <option value={0}>{t('none')}</option>
              {[10, 15, 20, 30, 45, 60, 90].map((m) => (
                <option key={m} value={m}>
                  {t('{n} minutes', { n: m })}
                </option>
              ))}
            </select>
            <label htmlFor="seed">{t('Seed')}</label>
            <input id="seed" type="text" value={cfg.seed} onChange={(e) => setCfg({ ...cfg, seed: e.target.value.trim() })} style={{ width: '9rem' }} />
            <button type="button" className="linkish" onClick={() => setCfg({ ...cfg, seed: randomSeedString() })}>
              {t('new seed')}
            </button>
          </div>
          <label>
            <input type="checkbox" checked={cfg.avoidRecent} onChange={() => setCfg({ ...cfg, avoidRecent: !cfg.avoidRecent })} />{' '}
            {t('Leave out questions I answered correctly in the last 14 days')}{' '}
            <span className="muted">{t('(the paper then also depends on your history; untick to reproduce a seed exactly)')}</span>
          </label>
        </fieldset>

        {error && <p className="notice">{error}</p>}
        <div className="btn-row">
          <button type="submit" className="btn primary" disabled={cfg.topics.length === 0}>
            {t('Start the test')}
          </button>
        </div>
      </form>

      {history.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="subhead">{t('Recent papers')}</h2>
          <table className="ledger">
            <thead>
              <tr>
                <th>{t('Date')}</th>
                <th>{t('Paper')}</th>
                <th>{t('Seed')}</th>
                <th className="num">{t('Score')}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>{fmtDate(lang, new Date(h.at), { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>{h.title}</td>
                  <td>
                    <button type="button" className="linkish" onClick={() => setCfg({ ...(h.config as unknown as TestConfig), avoidRecent: false })}>
                      {h.seed}
                    </button>
                  </td>
                  <td className="num">
                    {h.score}/{h.max}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">
            {t('Click a seed to load the same paper settings. Full history is in')} <Link to="/progress">{t('My Progress')}</Link>.
          </p>
        </section>
      )}
    </div>
  );
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function Runner({ paper, startedAt, onSubmit, onCancel }: { paper: TestPaper; startedAt: number; onSubmit: (r: ItemResponse[]) => void; onCancel: () => void }) {
  const t = useT();
  const [responses, setResponses] = useState<ItemResponse[]>(() => paper.items.map(() => undefined));
  const [now, setNow] = useState(Date.now());
  const submitted = useRef(false);
  const limit = paper.config.timerMin ? paper.config.timerMin * 60 : null;
  const elapsed = Math.floor((now - startedAt) / 1000);
  const left = limit ? Math.max(0, limit - elapsed) : null;

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const submit = () => {
    if (submitted.current) return;
    submitted.current = true;
    onSubmit(responses);
  };

  useEffect(() => {
    if (left === 0) submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const answered = responses.filter((r) => r !== undefined && r !== '' && !(Array.isArray(r) && r.length === 0)).length;
  let lastPassage: string | null = null;
  const totalPoints = paper.items.reduce((n, it) => n + itemPoints(it), 0);

  return (
    <div className="single">
      <div className="running-head">
        <span>
          {t('Test paper · seed {seed} · {n} questions ({marks} marks)', { seed: paper.config.seed, n: paper.items.length, marks: totalPoints })}
        </span>
        <span aria-live="off">{left !== null ? t('Time left {time}', { time: formatTime(left) }) : t('Time {time}', { time: formatTime(elapsed) })}</span>
      </div>
      <div className="btn-row no-print" style={{ marginBottom: '1rem' }}>
        <button type="button" className="btn" onClick={() => window.print()}>
          {t('Print test paper')}
        </button>
        <button type="button" className="linkish" onClick={onCancel}>
          {t('abandon')}
        </button>
        <span className="muted">{t('{a}/{n} answered', { a: answered, n: paper.items.length })}</span>
      </div>
      {paper.items.map((it, i) => {
        const passageId = it.type === 'reading' ? it.passageId : null;
        const showPassage = passageId && passageId !== lastPassage;
        lastPassage = passageId;
        const p = passageId ? paper.passages[passageId] : null;
        return (
          <div key={it.id}>
            {showPassage && p && (
              <div className="passage" lang="en">
                <h3 className="subhead">{p.title}</h3>
                <Paragraphs text={p.text} />
                {p.glossary && (
                  <p className="muted" style={{ fontSize: '0.85rem' }}>
                    {t('Glossary')}: {p.glossary.map(([w, d]) => `${w} — ${d}`).join('; ')}
                  </p>
                )}
              </div>
            )}
            <ItemView
              item={it}
              n={i + 1}
              mode="test"
              showSource
              response={responses[i]}
              onResponse={(r) => setResponses((prev) => prev.map((x, k) => (k === i ? r : x)))}
            />
          </div>
        );
      })}
      <div className="btn-row no-print" style={{ marginTop: '1.5rem' }}>
        <button type="button" className="btn primary" onClick={submit}>
          {t('Hand in the paper')}
        </button>
      </div>
      <AnswerSheet paper={paper} />
    </div>
  );
}

/** Printed only: a separate answer sheet and, on the last page, the key. */
function AnswerSheet({ paper }: { paper: TestPaper }) {
  const t = useT();
  return (
    <div className="only-print">
      <div className="answer-sheet">
        <h2 className="sc">{t('Answer sheet')}</h2>
        <p>
          {t('Name')}: ______________________ {t('Date')}: ____________ {t('Seed')}: {paper.config.seed}
        </p>
        <ol>
          {paper.items.map((it) => (
            <li key={it.id} style={{ padding: '0.25rem 0', borderBottom: '1px solid #999' }}>
              {it.type === 'mcq' || it.type === 'reading' ? 'A  B  C  D' : ' '}
            </li>
          ))}
        </ol>
      </div>
      <div className="answer-sheet">
        <h2 className="sc">{t('Key')}</h2>
        <ol>
          {paper.items.map((it) => (
            <li key={it.id}>{answerText(it)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Results({
  paper,
  responses,
  results,
  durationSec,
  onAgain,
  onWeak,
}: {
  paper: TestPaper;
  responses: ItemResponse[];
  results: CheckResult[];
  durationSec: number;
  onAgain: () => void;
  onWeak: (topics: Topic[]) => void;
}) {
  const t = useT();
  const score = results.reduce((n, r) => n + r.score, 0);
  const max = results.reduce((n, r) => n + r.maxScore, 0);
  const byTopic = new Map<Topic, [number, number]>();
  paper.items.forEach((it, i) => {
    const acc = byTopic.get(it.topics[0]) ?? [0, 0];
    byTopic.set(it.topics[0], [acc[0] + results[i].score, acc[1] + results[i].maxScore]);
  });
  const overall = topicAccuracy();
  const weak = [...byTopic.entries()].filter(([, [s, m]]) => m > 0 && s / m < 0.7).map(([tp]) => tp);
  const wrong: Array<{ item: Item; i: number }> = paper.items.map((item, i) => ({ item, i })).filter(({ i }) => results[i].verdict !== 'correct');

  return (
    <div className="single">
      <div className="running-head">
        <span>{t('Results')}</span>
        <span>
          {t('seed')} {paper.config.seed}
        </span>
      </div>
      <h1 className="sc">{t('Report')}</h1>
      <table className="ledger" style={{ maxWidth: '36rem', margin: '1rem 0 1.5rem' }}>
        <tbody>
          <tr>
            <th>{t('Score')}</th>
            <td className="num">
              {score} / {max} ({Math.round((score / Math.max(1, max)) * 100)}%)
            </td>
          </tr>
          <tr>
            <th>{t('Time')}</th>
            <td className="num">{formatTime(durationSec)}</td>
          </tr>
          <tr>
            <th>{t('Questions')}</th>
            <td className="num">
              {t('{n} ({a} authored, {g} generated)', {
                n: paper.items.length,
                a: paper.items.filter((i) => i.source === 'authored').length,
                g: paper.items.filter((i) => i.source === 'generated').length,
              })}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="subhead">{t('Performance by topic')}</h2>
      <table className="ledger">
        <thead>
          <tr>
            <th>{t('Topic')}</th>
            <th className="num">{t('This paper')}</th>
            <th className="num">%</th>
            <th className="num">{t('All your answers')}</th>
          </tr>
        </thead>
        <tbody>
          {[...byTopic.entries()].map(([tp, [s, m]]) => {
            const o = overall[tp];
            return (
              <tr key={tp}>
                <td>{t(topicLabel(tp))}</td>
                <td className="num">
                  {s}/{m}
                </td>
                <td className="num">{Math.round((s / Math.max(1, m)) * 100)}</td>
                <td className="num">{o ? t('{pct}% of {n}', { pct: Math.round((o[0] / o[1]) * 100), n: o[1] }) : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="btn-row" style={{ margin: '1.5rem 0' }}>
        <button type="button" className="btn primary" onClick={() => onWeak(weak.length ? weak : [...byTopic.keys()])}>
          {t('New test with only my weak points')}
          {weak.length ? ` (${weak.map((tp) => t(topicLabel(tp))).join(', ')})` : ''}
        </button>
        <button type="button" className="btn" onClick={onAgain}>
          {t('Configure another test')}
        </button>
      </div>

      <h2 className="subhead">{t('Your errors ({n})', { n: wrong.length })}</h2>
      {wrong.length === 0 && <p>{t('No errors — excellent work.')}</p>}
      {wrong.map(({ item, i }) => (
        <ItemView key={item.id} item={item} n={i + 1} mode="review" response={responses[i]} showSource />
      ))}
    </div>
  );
}
