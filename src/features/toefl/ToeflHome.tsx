import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SECTION_ORDER, TOEFL_CONFIG, type SectionKey } from '@content/toefl/toefl.config';
import { useStore } from '@/lib/useStore';
import { Rng, randomSeedString } from '@/lib/rng';
import { speechSupported } from '@/lib/speech';
import { recordingSupported } from '@/lib/recorder';
import { TOEFL_TESTS, taskPools } from './bank';
import { listeningScreens, readingScreens, ToeflRunner, type Screen } from './ToeflRunner';

type TaskKey = 'ctw' | 'daily' | 'academic' | 'choose' | 'conversation' | 'announcement' | 'talk' | 'buildSentence' | 'email' | 'discussion' | 'repeat' | 'interview';

const TASKS: Array<[TaskKey, string, SectionKey]> = [
  ['ctw', TOEFL_CONFIG.sections.reading.tasks.completeTheWords.title, 'reading'],
  ['daily', TOEFL_CONFIG.sections.reading.tasks.dailyLife.title, 'reading'],
  ['academic', TOEFL_CONFIG.sections.reading.tasks.academic.title, 'reading'],
  ['choose', TOEFL_CONFIG.sections.listening.tasks.chooseResponse.title, 'listening'],
  ['conversation', TOEFL_CONFIG.sections.listening.tasks.conversation.title, 'listening'],
  ['announcement', TOEFL_CONFIG.sections.listening.tasks.announcement.title, 'listening'],
  ['talk', TOEFL_CONFIG.sections.listening.tasks.academicTalk.title, 'listening'],
  ['buildSentence', TOEFL_CONFIG.sections.writing.tasks.buildSentence.title, 'writing'],
  ['email', TOEFL_CONFIG.sections.writing.tasks.email.title, 'writing'],
  ['discussion', TOEFL_CONFIG.sections.writing.tasks.discussion.title, 'writing'],
  ['repeat', TOEFL_CONFIG.sections.speaking.tasks.listenRepeat.title, 'speaking'],
  ['interview', TOEFL_CONFIG.sections.speaking.tasks.interview.title, 'speaking'],
];

/** A single-task practice set, drawn at random from the bank. */
function practiceSet(task: TaskKey, seed: string): Screen[] {
  const rng = new Rng(seed);
  const pools = taskPools();
  const mod = 'm1' as const;
  switch (task) {
    case 'ctw':
      return readingScreens({ ctw: [rng.pick(pools.ctw)], daily: [], academic: [] }, mod);
    case 'daily':
      return readingScreens({ ctw: [], daily: [rng.pick(pools.daily)], academic: [] }, mod);
    case 'academic':
      return readingScreens({ ctw: [], daily: [], academic: [rng.pick(pools.academic)] }, mod);
    case 'choose':
      return listeningScreens({ choose: rng.sample(pools.choose, 6), audio: [] }, mod);
    case 'conversation':
    case 'announcement':
    case 'talk':
      return listeningScreens({ choose: [], audio: [rng.pick(pools[task])] }, mod);
    case 'buildSentence':
      return rng.sample(pools.buildSentence, 10).map((item, i) => ({ id: `p-bas-${item.id}`, kind: 'bas', section: 'writing', item, n: i + 1, of: 10 }));
    case 'email': {
      const t = rng.pick(pools.email);
      return [{ id: `p-email-${t.id}`, kind: 'email', section: 'writing', task: t }];
    }
    case 'discussion': {
      const t = rng.pick(pools.discussion);
      return [{ id: `p-disc-${t.id}`, kind: 'discussion', section: 'writing', task: t }];
    }
    case 'repeat': {
      const r = rng.pick(pools.repeat);
      return r.sentences.map((s, i) => ({ id: `p-rep-${i}`, kind: 'repeat', section: 'speaking', n: i + 1, sentence: s, context: r.context }));
    }
    case 'interview': {
      const r = rng.pick(pools.interview);
      return r.questions.map((x, i) => ({ id: `p-int-${i}`, kind: 'interview', section: 'speaking', n: i + 1, q: x.q, model: x.model, context: r.context }));
    }
  }
}

type Run = { kind: 'full'; testIdx: number } | { kind: 'section'; testIdx: number; section: SectionKey } | { kind: 'task'; task: TaskKey; seed: string };

export default function ToeflHome() {
  const state = useStore();
  const [run, setRun] = useState<Run | null>(null);
  const [testIdx, setTestIdx] = useState(0);
  const [section, setSection] = useState<SectionKey>('reading');
  const [task, setTask] = useState<TaskKey>('buildSentence');

  if (run) {
    const test = TOEFL_TESTS[run.kind === 'task' ? 0 : run.testIdx];
    if (run.kind === 'task') {
      const label = TASKS.find(([k]) => k === run.task)![1];
      return <ToeflRunner key={run.seed} test={test} sections={[TASKS.find(([k]) => k === run.task)![2]]} practiceScreens={practiceSet(run.task, run.seed)} title={`Task practice · ${label}`} onExit={() => setRun(null)} />;
    }
    const sections = run.kind === 'full' ? SECTION_ORDER : [run.section];
    return <ToeflRunner test={test} sections={sections} title={`${test.title}${run.kind === 'section' ? ` · ${TOEFL_CONFIG.sections[run.section].title}` : ''}`} onExit={() => setRun(null)} />;
  }

  const history = state.tests.filter((t) => t.kind === 'toefl').slice(-5).reverse();

  return (
    <div className="single">
      <div className="running-head">
        <span>TOEFL Simulator</span>
        <span>{TOEFL_CONFIG.formatLabel}</span>
      </div>
      <h1 className="sc">TOEFL Simulator</h1>
      <p>
        The structure of the TOEFL iBT introduced in January 2026, with original content: adaptive Reading and Listening, Writing with automatic
        and self-assessed tasks, and recorded Speaking. Results are given as bands from 1 to 6 with their CEFR equivalent —{' '}
        <b>an unofficial estimate</b>.
      </p>
      <table className="ledger" style={{ margin: '1rem 0 1.5rem' }}>
        <thead>
          <tr>
            <th>Section</th>
            <th className="num">Minutes</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {SECTION_ORDER.map((s) => (
            <tr key={s}>
              <td>
                {TOEFL_CONFIG.sections[s].title}
                {TOEFL_CONFIG.sections[s].adaptive && <span className="muted"> · adaptive</span>}
              </td>
              <td className="num">{TOEFL_CONFIG.sections[s].minutes}</td>
              <td>{Object.values(TOEFL_CONFIG.sections[s].tasks).map((t) => t.title).join(' · ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(!speechSupported() || !recordingSupported()) && (
        <p className="notice">
          {!speechSupported() && 'This browser has no speech voices: listening tasks will offer transcripts instead. '}
          {!recordingSupported() && 'Recording is not available: in Speaking you will answer aloud and rate yourself.'}
        </p>
      )}

      <section>
        <h2 className="subhead">Complete test</h2>
        <div className="field">
          <label htmlFor="t-test">Test</label>
          <select id="t-test" value={testIdx} onChange={(e) => setTestIdx(Number(e.target.value))}>
            {TOEFL_TESTS.map((t, i) => (
              <option key={t.id} value={i}>
                {t.title}
              </option>
            ))}
          </select>
          <button type="button" className="btn primary" onClick={() => setRun({ kind: 'full', testIdx })}>
            Start full test (about {SECTION_ORDER.reduce((n, s) => n + TOEFL_CONFIG.sections[s].minutes, 0)} minutes)
          </button>
        </div>
      </section>

      <section>
        <h2 className="subhead">One section</h2>
        <div className="field">
          <label htmlFor="t-sec">Section</label>
          <select id="t-sec" value={section} onChange={(e) => setSection(e.target.value as SectionKey)}>
            {SECTION_ORDER.map((s) => (
              <option key={s} value={s}>
                {TOEFL_CONFIG.sections[s].title}
              </option>
            ))}
          </select>
          <button type="button" className="btn" onClick={() => setRun({ kind: 'section', testIdx, section })}>
            Start section
          </button>
        </div>
      </section>

      <section>
        <h2 className="subhead">Practise one task</h2>
        <p className="muted">Items are drawn at random from the bank (Build a Sentence: {taskPools().buildSentence.length} items).</p>
        <div className="field">
          <label htmlFor="t-task">Task</label>
          <select id="t-task" value={task} onChange={(e) => setTask(e.target.value as TaskKey)}>
            {SECTION_ORDER.map((s) => (
              <optgroup key={s} label={TOEFL_CONFIG.sections[s].title}>
                {TASKS.filter(([, , sec]) => sec === s).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button type="button" className="btn" onClick={() => setRun({ kind: 'task', task, seed: randomSeedString() })}>
            Practise
          </button>
        </div>
      </section>

      {history.length > 0 && (
        <section>
          <h2 className="subhead">Your simulations</h2>
          <table className="ledger">
            <thead>
              <tr>
                <th>Date</th>
                <th>Test</th>
                <th className="num">Overall</th>
                <th className="num">R · L · W · S</th>
              </tr>
            </thead>
            <tbody>
              {history.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.at).toLocaleDateString()}</td>
                  <td>{t.title}</td>
                  <td className="num">{t.bands?.overall?.toFixed(1) ?? '—'}</td>
                  <td className="num">{['reading', 'listening', 'writing', 'speaking'].map((s) => t.bands?.[s]?.toFixed(1) ?? '–').join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">
            All results are in <Link to="/progress">My Progress</Link>.
          </p>
        </section>
      )}
    </div>
  );
}
