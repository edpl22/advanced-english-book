import { useCallback, useMemo, useState } from 'react';
import { TOEFL_CONFIG, type SectionKey } from '@content/toefl/toefl.config';
import type { BuildSentenceItem, ChooseResponse, CtwPassage, DiscussionTask, EmailTask, Listening, ListeningModule, ReadingModule, TMcq, ToeflTest } from '@content/toefl/types';
import { Rng } from '@/lib/rng';
import { clipPassage, ctwCorrect } from './ctw';
import { bsCorrect, buildSentenceById } from './bank';
import { AudioPlayer, Countdown, Recorder } from './media';
import { route as routeFor } from './scoring';
import { ToeflResults } from './ToeflResults';

export type Mod = 'm1' | 'easy' | 'hard';

export type Screen =
  | { id: string; kind: 'intro'; section: SectionKey; title: string; body: string }
  | { id: string; kind: 'ctw'; section: 'reading'; module: Mod; passage: CtwPassage }
  | { id: string; kind: 'read-q'; section: 'reading'; module: Mod; title: string; text: string; q: TMcq; qn: number; of: number; task: string }
  | { id: string; kind: 'choose'; section: 'listening'; module: Mod; item: ChooseResponse }
  | { id: string; kind: 'audio'; section: 'listening'; module: Mod; audio: Listening }
  | { id: string; kind: 'listen-q'; section: 'listening'; module: Mod; audio: Listening; q: TMcq; qn: number; of: number }
  | { id: string; kind: 'bas'; section: 'writing'; item: BuildSentenceItem; n: number; of: number }
  | { id: string; kind: 'email'; section: 'writing'; task: EmailTask }
  | { id: string; kind: 'discussion'; section: 'writing'; task: DiscussionTask }
  | { id: string; kind: 'repeat'; section: 'speaking'; n: number; sentence: string; context: string }
  | { id: string; kind: 'interview'; section: 'speaking'; n: number; q: string; model: string; context: string };

export type Answers = Record<string, unknown>;

const TASK = TOEFL_CONFIG.sections;

export function readingScreens(m: ReadingModule, module: Mod): Screen[] {
  const out: Screen[] = [];
  for (const p of m.ctw) out.push({ id: `${module}-${p.id}`, kind: 'ctw', section: 'reading', module, passage: p });
  for (const d of m.daily)
    d.questions.forEach((q, i) =>
      out.push({ id: `${module}-${d.id}-${i}`, kind: 'read-q', section: 'reading', module, title: d.title, text: d.body, q, qn: i + 1, of: d.questions.length, task: TASK.reading.tasks.dailyLife.title }),
    );
  for (const a of m.academic)
    a.questions.forEach((q, i) =>
      out.push({ id: `${module}-${a.id}-${i}`, kind: 'read-q', section: 'reading', module, title: a.title, text: a.text, q, qn: i + 1, of: a.questions.length, task: TASK.reading.tasks.academic.title }),
    );
  return out;
}

export function listeningScreens(m: ListeningModule, module: Mod): Screen[] {
  const out: Screen[] = [];
  for (const c of m.choose) out.push({ id: `${module}-${c.id}`, kind: 'choose', section: 'listening', module, item: c });
  for (const a of m.audio) {
    out.push({ id: `${module}-${a.id}-audio`, kind: 'audio', section: 'listening', module, audio: a });
    a.questions.forEach((q, i) => out.push({ id: `${module}-${a.id}-${i}`, kind: 'listen-q', section: 'listening', module, audio: a, q, qn: i + 1, of: a.questions.length }));
  }
  return out;
}

export function writingScreens(t: ToeflTest): Screen[] {
  const ids = t.writing.buildSentenceIds;
  const items = ids.map((id) => buildSentenceById(id)).filter((x): x is BuildSentenceItem => !!x);
  return [
    ...items.map((item, i) => ({ id: `bas-${item.id}`, kind: 'bas' as const, section: 'writing' as const, item, n: i + 1, of: items.length })),
    { id: `email-${t.writing.email.id}`, kind: 'email', section: 'writing', task: t.writing.email },
    { id: `disc-${t.writing.discussion.id}`, kind: 'discussion', section: 'writing', task: t.writing.discussion },
  ];
}

export function speakingScreens(t: ToeflTest): Screen[] {
  return [
    ...t.speaking.repeat.map((s, i) => ({ id: `rep-${i}`, kind: 'repeat' as const, section: 'speaking' as const, n: i + 1, sentence: s, context: t.speaking.repeatContext })),
    ...t.speaking.interview.map((x, i) => ({ id: `int-${i}`, kind: 'interview' as const, section: 'speaking' as const, n: i + 1, q: x.q, model: x.model, context: t.speaking.interviewContext })),
  ];
}

const INTRO: Record<SectionKey, string> = {
  reading:
    'Reading has two modules. Your answers in Module 1 decide whether Module 2 is easier or harder. Tasks: Complete the Words (type the missing letters), Read in Daily Life and Read an Academic Passage. You cannot go back to earlier questions.',
  listening:
    'Listening has two modules and is adaptive, like Reading. Each recording plays once; the text is not shown. Tasks: Listen and Choose a Response, conversations, announcements and academic talks.',
  writing: 'Writing: Build a Sentence (put the fragments in order), Write an Email and Write for an Academic Discussion. Word counters and task timers are shown.',
  speaking: 'Speaking: Listen and Repeat, then Take an Interview. Your answers are recorded on this device only so that you can listen to them and assess yourself.',
};

/** Points earned on a screen (and points available). */
export function screenScore(s: Screen, a: unknown): [number, number] {
  switch (s.kind) {
    case 'ctw': {
      const toks = clipPassage(s.passage.text, TASK.reading.tasks.completeTheWords.blanksPerPassage).filter((t) => t.blank);
      const typed = (a as string[] | undefined) ?? [];
      return [toks.filter((t, i) => ctwCorrect(t, typed[i] ?? '')).length, toks.length];
    }
    case 'read-q':
    case 'listen-q':
      return [a === s.q.answer ? 1 : 0, 1];
    case 'choose':
      return [a === s.item.answer ? 1 : 0, 1];
    case 'bas':
      return [Array.isArray(a) && bsCorrect(s.item, a as string[]) ? 1 : 0, 1];
    default:
      return [0, 0];
  }
}

export interface RunnerProps {
  test: ToeflTest;
  sections: SectionKey[];
  /** Practice mode: a ready-made list of screens, no routing, feedback at the end. */
  practiceScreens?: Screen[];
  title: string;
  onExit: () => void;
}

export function ToeflRunner({ test, sections, practiceScreens, title, onExit }: RunnerProps) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [screens, setScreens] = useState<Screen[]>(() => (practiceScreens ? practiceScreens : buildSection(sections[0], 'm1')));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [routes, setRoutes] = useState<Partial<Record<SectionKey, 'easy' | 'hard'>>>({});
  const [done, setDone] = useState(false);
  const [startedAt] = useState(Date.now());
  const [sectionStart, setSectionStart] = useState(Date.now());

  function buildSection(sec: SectionKey, module: Mod): Screen[] {
    const intro: Screen = { id: `intro-${sec}-${module}`, kind: 'intro', section: sec, title: module === 'm1' ? TASK[sec].title : `${TASK[sec].title} · Module 2`, body: module === 'm1' ? INTRO[sec] : 'Module 2 begins now.' };
    if (sec === 'reading') return [intro, ...readingScreens(test.reading[module], module)];
    if (sec === 'listening') return [intro, ...listeningScreens(test.listening[module], module)];
    if (sec === 'writing') return [intro, ...writingScreens(test)];
    return [intro, ...speakingScreens(test)];
  }

  const section = practiceScreens ? practiceScreens[0]?.section ?? 'reading' : sections[sectionIdx];
  const screen = screens[idx];

  const finishSection = useCallback(() => {
    if (practiceScreens) {
      setDone(true);
      return;
    }
    const sec = sections[sectionIdx];
    const isAdaptive = TASK[sec].adaptive;
    const inM1 = screens.every((s) => !('module' in s) || s.module === 'm1');
    if (isAdaptive && inM1) {
      let c = 0;
      let t = 0;
      for (const s of screens) {
        const [a, b] = screenScore(s, answers[s.id]);
        c += a;
        t += b;
      }
      const r = routeFor(c, t);
      setRoutes((x) => ({ ...x, [sec]: r }));
      setScreens((prev) => [...prev, ...buildSection(sec, r)]);
      setIdx((i) => i + 1);
      return;
    }
    if (sectionIdx + 1 < sections.length) {
      const next = sections[sectionIdx + 1];
      setSectionIdx(sectionIdx + 1);
      setScreens((prev) => [...prev, ...buildSection(next, 'm1')]);
      setIdx((i) => i + 1);
      setSectionStart(Date.now());
    } else {
      setDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, screens, sectionIdx, sections, practiceScreens]);

  const next = () => {
    const nextScreen = screens[idx + 1];
    const endOfModule = !nextScreen || nextScreen.section !== screen.section || ('module' in screen && 'module' in nextScreen && nextScreen.module !== screen.module) || nextScreen.kind === 'intro';
    if (endOfModule) finishSection();
    else setIdx(idx + 1);
  };

  /** Section timer ran out: the rest of the section counts as unanswered. */
  const timeUp = useCallback(() => {
    if (practiceScreens) return;
    const sec = sections[sectionIdx];
    let added: Screen[] = [];
    if (TASK[sec].adaptive && !routes[sec]) {
      let c = 0;
      let t = 0;
      for (const s of screens) {
        if (s.section !== sec) continue;
        const [a, b] = screenScore(s, answers[s.id]);
        c += a;
        t += b;
      }
      const r = routeFor(c, t);
      setRoutes((x) => ({ ...x, [sec]: r }));
      // Module 2 is added unanswered so that the score reflects the whole section.
      added = buildSection(sec, r);
    }
    if (sectionIdx + 1 < sections.length) {
      const nextSec = sections[sectionIdx + 1];
      const nextScreens = buildSection(nextSec, 'm1');
      setScreens([...screens, ...added, ...nextScreens]);
      setIdx(screens.length + added.length);
      setSectionIdx(sectionIdx + 1);
      setSectionStart(Date.now());
    } else {
      setScreens([...screens, ...added]);
      setDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdx, sections, screens, answers, routes, practiceScreens]);

  const setAnswer = (v: unknown) => setAnswers((a) => ({ ...a, [screen.id]: v }));

  if (done) {
    return <ToeflResults test={test} title={title} screens={screens} answers={answers} routes={routes} sections={practiceScreens ? [section] : sections} startedAt={startedAt} practice={!!practiceScreens} onExit={onExit} />;
  }

  const sectionScreens = screens.filter((s) => s.section === section && s.kind !== 'intro');
  const pos = sectionScreens.indexOf(screen) + 1;

  return (
    <div className="exam-screen" aria-label="TOEFL simulator">
      <div className="exam-bar">
        <span>
          {title}
          {title.includes(TASK[section].title) ? '' : ` · ${TASK[section].title}`}
          {'module' in screen ? ` · Module ${screen.module === 'm1' ? 1 : 2}` : ''}
        </span>
        <span>{screen.kind !== 'intro' && `Question ${pos} of ${sectionScreens.length}${routes[section] ? '' : TASK[section].adaptive && !practiceScreens ? '+' : ''}`}</span>
        {!practiceScreens && <Countdown key={`${section}-${sectionStart}`} seconds={TASK[section].minutes * 60} onEnd={timeUp} label="Section" />}
      </div>
      <div className="exam-body">
        <ScreenView key={screen.id} screen={screen} value={answers[screen.id]} onChange={setAnswer} onAutoNext={next} />
        <div className="btn-row" style={{ marginTop: '1.4rem', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="linkish"
            onClick={() => {
              if (window.confirm('Leave the test? Your answers will be lost.')) onExit();
            }}
          >
            exit
          </button>
          <button type="button" className="btn primary" onClick={next}>
            {screen.kind === 'intro' ? 'Begin' : 'Next →'}
          </button>
        </div>
        {!TOEFL_CONFIG.allowBack && screen.kind !== 'intro' && <p className="muted" style={{ fontSize: '0.8rem', textAlign: 'right' }}>As in the real test, you cannot return to earlier questions.</p>}
      </div>
    </div>
  );
}

function Mcq({ q, value, onChange, disabled }: { q: { options: string[] }; value: unknown; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <ul className="options" role="radiogroup">
      {q.options.map((o, i) => (
        <li key={i}>
          <label>
            <input type="radio" name="toefl-q" checked={value === i} onChange={() => onChange(i)} disabled={disabled} />
            <span className="letter">{'ABCD'[i]}</span> <span lang="en">{o}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function wordCount(s: string): number {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

export function ScreenView({ screen, value, onChange, onAutoNext }: { screen: Screen; value: unknown; onChange: (v: unknown) => void; onAutoNext: () => void }) {
  const [heard, setHeard] = useState(false);
  switch (screen.kind) {
    case 'intro':
      return (
        <div>
          <h2 className="sc">{screen.title}</h2>
          <p>{screen.body}</p>
          <p className="muted">Time for this section: {TASK[screen.section].minutes} minutes.</p>
        </div>
      );
    case 'ctw': {
      const toks = clipPassage(screen.passage.text, TASK.reading.tasks.completeTheWords.blanksPerPassage);
      const typed = (value as string[] | undefined) ?? [];
      return (
        <div>
          <h3 className="subhead">{TASK.reading.tasks.completeTheWords.title}</h3>
          <p className="instruction">Fill in the missing letters to complete the text.</p>
          <p className="cloze-text" lang="en">
            {toks.map((t, i) =>
              t.blank ? (
                <span key={i} style={{ whiteSpace: 'nowrap' }}>
                  {t.shown}
                  <input
                    className="blank"
                    style={{ minWidth: 0, width: `${Math.max(2.2, t.missing.length * 0.75 + 0.8)}em` }}
                    aria-label={`Missing letters ${t.n + 1}: ${t.shown}…`}
                    value={typed[t.n] ?? ''}
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(e) => {
                      const next = [...typed];
                      next[t.n] = e.target.value;
                      onChange(next);
                    }}
                  />
                  {t.tail}
                </span>
              ) : (
                <span key={i}>
                  {t.shown}
                  {t.tail}
                </span>
              ),
            )}
          </p>
        </div>
      );
    }
    case 'read-q':
      return (
        <div className="exam-split">
          <div className="reading-pane" lang="en">
            <h3 className="subhead">{screen.title}</h3>
            {screen.text.split(/\n\s*\n/).map((p, i) => (
              <p key={i} style={{ whiteSpace: 'pre-line' }}>
                {p}
              </p>
            ))}
          </div>
          <div>
            <p className="muted sc">
              {screen.task} · question {screen.qn} of {screen.of}
            </p>
            <p lang="en">{screen.q.q}</p>
            <Mcq q={screen.q} value={value} onChange={onChange} />
          </div>
        </div>
      );
    case 'choose':
      return (
        <div>
          <h3 className="subhead">{TASK.listening.tasks.chooseResponse.title}</h3>
          <p className="instruction">Listen to the speaker and choose the best response.</p>
          <AudioPlayer lines={[{ speaker: screen.item.speaker, text: screen.item.line }]} onDone={() => setHeard(true)} />
          <Mcq q={screen.item} value={value} onChange={onChange} disabled={!heard} />
        </div>
      );
    case 'audio':
      return (
        <div>
          <h3 className="subhead">{screen.audio.kind === 'conversation' ? TASK.listening.tasks.conversation.title : screen.audio.kind === 'announcement' ? TASK.listening.tasks.announcement.title : TASK.listening.tasks.academicTalk.title}</h3>
          <p>{screen.audio.title}. Listen, then answer {screen.audio.questions.length} questions. You may take notes on paper.</p>
          <AudioPlayer lines={screen.audio.lines} onDone={() => onChange(true)} />
        </div>
      );
    case 'listen-q':
      return (
        <div>
          <p className="muted sc">
            {screen.audio.title} · question {screen.qn} of {screen.of}
          </p>
          <p lang="en">{screen.q.q}</p>
          <Mcq q={screen.q} value={value} onChange={onChange} />
        </div>
      );
    case 'bas':
      return <BuildSentence item={screen.item} value={value as string[] | undefined} onChange={onChange} n={screen.n} of={screen.of} />;
    case 'email':
    case 'discussion': {
      const text = (value as string | undefined) ?? '';
      const cfg = screen.kind === 'email' ? TASK.writing.tasks.email : TASK.writing.tasks.discussion;
      return (
        <div>
          <div className="btn-row" style={{ justifyContent: 'space-between' }}>
            <h3 className="subhead" style={{ margin: 0 }}>
              {cfg.title}
            </h3>
            <Countdown seconds={cfg.minutes * 60} onEnd={onAutoNext} label="Task" />
          </div>
          {screen.kind === 'email' ? (
            <div lang="en">
              <p>{screen.task.situation}</p>
              <p>Write an email. In your email:</p>
              <ul>
                {screen.task.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div lang="en">
              <p>
                <b>{screen.task.professor}:</b> {screen.task.prompt}
              </p>
              {screen.task.posts.map((p) => (
                <p key={p.name} style={{ borderLeft: '2px solid var(--rule)', paddingLeft: '0.8rem' }}>
                  <b>{p.name}:</b> {p.text}
                </p>
              ))}
              <p className="muted">Make a contribution to the discussion in your own words (about {cfg.targetWords} words or more).</p>
            </div>
          )}
          <textarea className="writing" lang="en" value={text} onChange={(e) => onChange(e.target.value)} aria-label="Your response" spellCheck={false} />
          <p className="muted">
            Words: <b>{wordCount(text)}</b> (suggested: {cfg.targetWords}+)
          </p>
        </div>
      );
    }
    case 'repeat':
      return (
        <div>
          <h3 className="subhead">{TASK.speaking.tasks.listenRepeat.title}</h3>
          <p>{screen.context}</p>
          <p className="muted">
            Sentence {screen.n} of {TASK.speaking.tasks.listenRepeat.count}
          </p>
          <AudioPlayer lines={[{ speaker: 'Coordinator', text: screen.sentence }]} label="Play sentence" />
          <p className="muted">Now repeat it exactly.</p>
          <Recorder seconds={TASK.speaking.tasks.listenRepeat.responseSeconds} value={value as string | undefined} onChange={onChange} />
        </div>
      );
    case 'interview':
      return (
        <div>
          <h3 className="subhead">{TASK.speaking.tasks.interview.title}</h3>
          <p>{screen.context}</p>
          <p className="muted">
            Question {screen.n} of {TASK.speaking.tasks.interview.count}
          </p>
          <AudioPlayer lines={[{ speaker: 'Researcher', text: screen.q }]} label="Play question" />
          <Recorder seconds={TASK.speaking.tasks.interview.responseSeconds} value={value as string | undefined} onChange={onChange} />
        </div>
      );
  }
}

function BuildSentence({ item, value, onChange, n, of }: { item: BuildSentenceItem; value?: string[]; onChange: (v: string[]) => void; n: number; of: number }) {
  const bank = useMemo(() => {
    const all = item.distractor ? [...item.chunks, item.distractor] : [...item.chunks];
    let s = new Rng(item.id).shuffle(all);
    if (s.join('|') === all.join('|')) s = [...s.slice(1), s[0]];
    return s;
  }, [item]);
  const placed = value ?? [];
  const remaining = [...bank];
  for (const p of placed) {
    const i = remaining.indexOf(p);
    if (i >= 0) remaining.splice(i, 1);
  }
  return (
    <div>
      <h3 className="subhead">
        {TASK.writing.tasks.buildSentence.title} · {n} of {of}
      </h3>
      <p className="instruction">Make an appropriate sentence. One fragment may not be needed.</p>
      <p lang="en">
        <b>A:</b> {item.context}
      </p>
      <p lang="en">
        <b>B:</b>
      </p>
      <div className="answer-line fragments" aria-label="Your sentence">
        {placed.map((p, i) => (
          <button key={i} type="button" className="fragment placed" onClick={() => onChange(placed.filter((_, j) => j !== i))}>
            {p}
          </button>
        ))}
        {placed.length > 0 && <span>{item.punctuation ?? '.'}</span>}
      </div>
      <div className="fragments">
        {remaining.map((f, i) => (
          <button key={`${f}-${i}`} type="button" className="fragment" onClick={() => onChange([...placed, f])}>
            {f}
          </button>
        ))}
      </div>
      {placed.length > 0 && (
        <button type="button" className="linkish" onClick={() => onChange([])}>
          clear
        </button>
      )}
    </div>
  );
}
