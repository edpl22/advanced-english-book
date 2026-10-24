import { useState } from 'react';
import { TOEFL_CONFIG, type SectionKey } from '@content/toefl/toefl.config';
import type { ToeflTest } from '@content/toefl/types';
import { update } from '@/lib/storage';
import { clipPassage, ctwCorrect } from './ctw';
import { bsSentence } from './bank';
import { adaptiveBand, cefr, overallBand, rubricScore, speakingBand, writingBand } from './scoring';
import { screenScore, type Answers, type Screen } from './ToeflRunner';
import { N_, useT } from '@/lib/i18n';

const RUBRIC = TOEFL_CONFIG.rubric;
const MARKS: Array<[number, string]> = [
  [0, N_('no')],
  [1, N_('partly')],
  [2, N_('yes')],
];

function Rubric({ name, marks, setMarks }: { name: string; marks: number[]; setMarks: (m: number[]) => void }) {
  const t = useT();
  return (
    <table className="ledger" style={{ margin: '0.5rem 0 1rem' }}>
      <tbody>
        {RUBRIC.map((r, i) => (
          <tr key={r}>
            <td>{t(r)}</td>
            <td style={{ whiteSpace: 'nowrap' }}>
              {MARKS.map(([v, label]) => (
                <label key={v} style={{ marginRight: '0.8rem' }}>
                  <input
                    type="radio"
                    name={`${name}-${i}`}
                    checked={marks[i] === v}
                    onChange={() => {
                      const next = [...marks];
                      next[i] = v;
                      setMarks(next);
                    }}
                  />{' '}
                  {t(label)}
                </label>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export interface ResultsProps {
  test: ToeflTest;
  title: string;
  screens: Screen[];
  answers: Answers;
  routes: Partial<Record<SectionKey, 'easy' | 'hard'>>;
  sections: SectionKey[];
  startedAt: number;
  practice: boolean;
  onExit: () => void;
}

export function ToeflResults({ test, title, screens, answers, routes, sections, startedAt, practice, onExit }: ResultsProps) {
  const t = useT();
  const [emailMarks, setEmailMarks] = useState<number[]>([1, 1, 1, 1, 1]);
  const [discMarks, setDiscMarks] = useState<number[]>([1, 1, 1, 1, 1]);
  const [intMarks, setIntMarks] = useState<number[]>([1, 1, 1, 1, 1]);
  const [repeatMarks, setRepeatMarks] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<Record<string, number> | null>(null);

  const scored = (sec: SectionKey) => {
    let c = 0;
    let t = 0;
    for (const s of screens) {
      if (s.section !== sec) continue;
      const [a, b] = screenScore(s, answers[s.id]);
      c += a;
      t += b;
    }
    return [c, t] as const;
  };

  const repeats = screens.filter((s): s is Extract<Screen, { kind: 'repeat' }> => s.kind === 'repeat');
  const interviews = screens.filter((s): s is Extract<Screen, { kind: 'interview' }> => s.kind === 'interview');
  const email = screens.find((s): s is Extract<Screen, { kind: 'email' }> => s.kind === 'email');
  const disc = screens.find((s): s is Extract<Screen, { kind: 'discussion' }> => s.kind === 'discussion');
  const bas = screens.filter((s) => s.kind === 'bas');

  const compute = (): Record<string, number> => {
    const bands: Record<string, number> = {};
    for (const sec of sections) {
      if (sec === 'reading' || sec === 'listening') {
        const [c, t] = scored(sec);
        bands[sec] = adaptiveBand(c, t, routes[sec] ?? 'easy');
      }
      if (sec === 'writing') {
        const [c, t] = scored('writing');
        bands.writing = writingBand(t ? c / t : 0, email ? rubricScore(emailMarks) : 0, disc ? rubricScore(discMarks) : 0);
      }
      if (sec === 'speaking') {
        const rp = repeats.length ? repeats.reduce((n, r) => n + (repeatMarks[r.id] ?? 1), 0) / (repeats.length * 2) : 0;
        bands.speaking = speakingBand(rp, interviews.length ? rubricScore(intMarks) : 0);
      }
    }
    bands.overall = overallBand(sections.map((s) => bands[s]));
    return bands;
  };

  const finish = () => {
    const bands = compute();
    setSaved(bands);
    if (practice) return;
    const totals = sections.map((s) => scored(s));
    update((st) => ({
      ...st,
      tests: [
        ...st.tests,
        {
          id: `toefl-${Date.now()}`,
          kind: 'toefl',
          title,
          seed: test.id,
          at: Date.now(),
          durationSec: Math.round((Date.now() - startedAt) / 1000),
          score: totals.reduce((n, [c]) => n + c, 0),
          max: totals.reduce((n, [, t]) => n + t, 0),
          bands,
        },
      ],
    }));
  };

  const autoSections = sections.filter((s) => s === 'reading' || s === 'listening');

  return (
    <div className="single">
      <div className="running-head">
        <span>{t('TOEFL-format Simulator')}</span>
        <span>
          {title} · {t('results')}
        </span>
      </div>
      <h1 className="sc">{t('Results')}</h1>

      {autoSections.map((sec) => {
        const [c, n] = scored(sec);
        return (
          <p key={sec}>
            <b>{TOEFL_CONFIG.sections[sec].title}</b>: {t('{c}/{n} points', { c, n })}
            {routes[sec] && <span className="muted"> · {routes[sec] === 'hard' ? t('Module 2: harder route') : t('Module 2: easier route')}</span>}
          </p>
        );
      })}

      {practice ? (
        <PracticeReview screens={screens} answers={answers} />
      ) : (
        autoSections.length > 0 && (
          <details>
            <summary className="linkish">{t('Review answers and listening transcripts')}</summary>
            <PracticeReview screens={screens} answers={answers} />
          </details>
        )
      )}

      {sections.includes('writing') && (
        <section>
          <h2 className="subhead">Writing</h2>
          {bas.length > 0 && (
            <p>
              Build a Sentence: {t('{c}/{n} correct.', { c: scored('writing')[0], n: scored('writing')[1] })}
            </p>
          )}
          {bas.map((s) =>
            s.kind === 'bas' ? (
              <p key={s.id} style={{ fontSize: '0.92rem' }} lang="en">
                {((answers[s.id] as string[] | undefined)?.length ? bsSentence(s.item, answers[s.id] as string[]) : '—')}{' '}
                {screenScore(s, answers[s.id])[0] ? '✓' : <span className="muted">→ {bsSentence(s.item)}</span>}
              </p>
            ) : null,
          )}
          {email && (
            <div>
              <h3 className="subhead">Write an Email — {t('assess yourself')}</h3>
              <div className="two-col">
                <div>
                  <p className="sc muted">{t('Your email')}</p>
                  <p style={{ whiteSpace: 'pre-line' }} lang="en">
                    {(answers[email.id] as string) || '—'}
                  </p>
                </div>
                <div>
                  <p className="sc muted">{t('Model answer')}</p>
                  <p style={{ whiteSpace: 'pre-line' }} lang="en">
                    {email.task.model}
                  </p>
                </div>
              </div>
              <Rubric name="email" marks={emailMarks} setMarks={setEmailMarks} />
            </div>
          )}
          {disc && (
            <div>
              <h3 className="subhead">Academic Discussion — {t('assess yourself')}</h3>
              <div className="two-col">
                <div>
                  <p className="sc muted">{t('Your post')}</p>
                  <p style={{ whiteSpace: 'pre-line' }} lang="en">
                    {(answers[disc.id] as string) || '—'}
                  </p>
                </div>
                <div>
                  <p className="sc muted">{t('Model answer')}</p>
                  <p lang="en">{disc.task.model}</p>
                </div>
              </div>
              <Rubric name="disc" marks={discMarks} setMarks={setDiscMarks} />
            </div>
          )}
        </section>
      )}

      {sections.includes('speaking') && (
        <section>
          <h2 className="subhead">Speaking — {t('listen and assess yourself')}</h2>
          {repeats.length > 0 && <h3 className="subhead">Listen and Repeat</h3>}
          {repeats.map((r) => (
            <div key={r.id} style={{ borderBottom: '1px dotted var(--rule)', padding: '0.4rem 0' }}>
              <div lang="en">
                {r.n}. {r.sentence}
              </div>
              {answers[r.id] ? <audio controls src={answers[r.id] as string} /> : <span className="muted">{t('no recording')}</span>}
              <div>
                {(
                  [
                    [2, N_('exactly')],
                    [1, N_('small errors')],
                    [0, N_('major errors / no answer')],
                  ] as const
                ).map(([v, label]) => (
                  <label key={v} style={{ marginRight: '0.8rem' }}>
                    <input type="radio" name={`rep-${r.id}`} checked={(repeatMarks[r.id] ?? 1) === v} onChange={() => setRepeatMarks((m) => ({ ...m, [r.id]: v }))} /> {t(label)}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {interviews.length > 0 && <h3 className="subhead">Take an Interview</h3>}
          {interviews.map((q) => (
            <div key={q.id} style={{ borderBottom: '1px dotted var(--rule)', padding: '0.4rem 0' }}>
              <p lang="en">
                <b>{q.n}.</b> {q.q}
              </p>
              {answers[q.id] ? <audio controls src={answers[q.id] as string} /> : <span className="muted">{t('no recording')}</span>}
              <p className="muted" lang="en">
                <span className="sc">{t('Model transcript:')}</span> {q.model}
              </p>
            </div>
          ))}
          {interviews.length > 0 && <Rubric name="int" marks={intMarks} setMarks={setIntMarks} />}
        </section>
      )}

      <div className="btn-row" style={{ margin: '1.5rem 0' }}>
        <button type="button" className="btn primary" onClick={finish}>
          {saved ? t('Recalculate my estimate') : t('Calculate my band estimate')}
        </button>
        <button type="button" className="btn" onClick={onExit}>
          {t('Back to the simulator')}
        </button>
      </div>

      {saved && (
        <section aria-live="polite">
          <h2 className="subhead">{t('Estimated scores')}</h2>
          <table className="ledger" style={{ maxWidth: '30rem' }}>
            <thead>
              <tr>
                <th>{t('Section')}</th>
                <th className="num">{t('Band (1–6)')}</th>
                <th className="num">CEFR</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s) => (
                <tr key={s}>
                  <td>{TOEFL_CONFIG.sections[s].title}</td>
                  <td className="num">{saved[s].toFixed(1)}</td>
                  <td className="num">{cefr(saved[s])}</td>
                </tr>
              ))}
              {sections.length > 1 && (
                <tr>
                  <th>{t('Overall')}</th>
                  <th className="num">{saved.overall.toFixed(1)}</th>
                  <th className="num">{cefr(saved.overall)}</th>
                </tr>
              )}
            </tbody>
          </table>
          <p className="notice">
            <b>{t('Unofficial estimate.')}</b>{' '}
            {t('This simulator reproduces the structure of the TOEFL iBT with original content; the bands are an approximation calculated from your answers and your self-assessment, not an ETS score.')}
          </p>
        </section>
      )}
    </div>
  );
}

function PracticeReview({ screens, answers }: { screens: Screen[]; answers: Answers }) {
  const t = useT();
  return (
    <section>
      <h2 className="subhead">{t('Review')}</h2>
      {screens.map((s) => {
        if (s.kind === 'read-q' || s.kind === 'listen-q') {
          const a = answers[s.id];
          return (
            <p key={s.id} lang="en">
              {s.q.q} — <b>{s.q.options[s.q.answer]}</b> {a === s.q.answer ? '✓' : <span className="muted">({t('you')}: {typeof a === 'number' ? s.q.options[a] : '—'})</span>}
            </p>
          );
        }
        if (s.kind === 'choose') {
          const a = answers[s.id];
          return (
            <p key={s.id} lang="en">
              “{s.item.line}” — <b>{s.item.options[s.item.answer]}</b> {a === s.item.answer ? '✓' : <span className="muted">({t('you')}: {typeof a === 'number' ? s.item.options[a] : '—'})</span>}
            </p>
          );
        }
        if (s.kind === 'ctw') {
          const typed = (answers[s.id] as string[] | undefined) ?? [];
          const toks = clipPassage(s.passage.text).filter((tok) => tok.blank);
          return (
            <p key={s.id} lang="en">
              {toks.map((tok, i) => (
                <span key={i} style={{ marginRight: '0.6rem' }}>
                  {tok.shown}
                  <b>{tok.missing}</b> {ctwCorrect(tok, typed[i] ?? '') ? '✓' : <span className="muted">({typed[i] || '—'})</span>}
                </span>
              ))}
            </p>
          );
        }
        if (s.kind === 'audio')
          return (
            <details key={s.id}>
              <summary className="linkish">
                {t('Transcript')}: {s.audio.title}
              </summary>
              {s.audio.lines.map((l, i) => (
                <p key={i} lang="en">
                  <b>{l.speaker}:</b> {l.text}
                </p>
              ))}
            </details>
          );
        return null;
      })}
    </section>
  );
}
