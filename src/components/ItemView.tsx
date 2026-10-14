import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Item } from '@/lib/schema';
import { answerText, checkItem, type CheckResult, type ItemResponse, type ErrorResponse } from '@/lib/checking';
import { knownWords } from '@/lib/knownWords';
import { recordAnswer } from '@/lib/progress';
import { Rng } from '@/lib/rng';
import { RichText, refPath } from './RichText';

const LETTERS = 'ABCDE';
const letter = (i: number) => LETTERS[i] ?? String(i + 1);

export interface ItemViewProps {
  item: Item;
  n: number | string;
  /** practice: Check / Show / Try again; test: answers only, no feedback; review: read-only with key. */
  mode?: 'practice' | 'test' | 'review';
  response?: ItemResponse;
  onResponse?: (r: ItemResponse) => void;
  /** Where the attempt is recorded (book, practice, review…). */
  context?: string;
  showSource?: boolean;
  onChecked?: (r: CheckResult) => void;
}

/** One exercise item of any type. */
export function ItemView({ item, n, mode = 'practice', response: controlled, onResponse, context = 'book', showSource, onChecked }: ItemViewProps) {
  const [local, setLocal] = useState<ItemResponse>(undefined);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [shown, setShown] = useState(false);
  const response = controlled !== undefined || mode !== 'practice' ? controlled : local;
  const locked = mode === 'review' || (mode === 'practice' && (result?.verdict === 'correct' || shown));

  const setResponse = (r: ItemResponse) => {
    if (locked) return;
    if (mode === 'practice') {
      setLocal(r);
      if (result && result.verdict !== 'correct') setResult(null);
    }
    onResponse?.(r);
  };

  const check = () => {
    const r = checkItem(item, response, { knownWords: knownWords() });
    setResult(r);
    recordAnswer(item.id, item.topics[0], r.verdict, context, item.ref);
    onChecked?.(r);
  };

  const reviewResult = mode === 'review' ? checkItem(item, response, { knownWords: knownWords() }) : null;
  const effective = result ?? reviewResult;

  return (
    <div className="item" data-item-id={item.id}>
      <div className="item-num" aria-hidden="true">
        {n}
      </div>
      <div
        className="item-body"
        lang="en"
        onKeyDown={(e) => {
          // Enter in a text box checks the answer, as a submit button would.
          if (mode === 'practice' && !locked && e.key === 'Enter' && e.target instanceof HTMLInputElement && e.target.type !== 'radio') {
            e.preventDefault();
            check();
          }
        }}
      >
        {item.instruction && mode !== 'review' && <div className="instruction">{item.instruction}</div>}
        <ItemInput item={item} response={response} setResponse={setResponse} locked={locked} result={effective} shown={shown || mode === 'review'} n={n} />
        {showSource && <span className="source-tag">{item.source === 'generated' ? 'generated' : 'authored'}</span>}
        {mode === 'practice' && (
          <div className="controls no-print">
            <button type="button" className="btn primary" onClick={check} disabled={locked}>
              Check
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setShown(true);
                if (!result) recordAnswer(item.id, item.topics[0], 'incorrect', context, item.ref);
              }}
              disabled={shown}
            >
              Show answer
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setLocal(undefined);
                setResult(null);
                setShown(false);
              }}
            >
              Try again
            </button>
          </div>
        )}
        {(effective || shown) && mode !== 'test' && <Feedback item={item} result={effective} shown={shown || mode === 'review'} />}
      </div>
    </div>
  );
}

export function Feedback({ item, result, shown }: { item: Item; result: CheckResult | null; shown: boolean }) {
  const verdict = result?.verdict;
  const label = verdict === 'correct' ? 'Correct' : verdict === 'almost' ? 'Almost' : verdict === 'incorrect' ? 'Not quite' : 'Answer';
  const cls = verdict ?? 'incorrect';
  return (
    <div className={`feedback ${cls}`} role="status" aria-live="polite">
      <span className="verdict">{label}</span>
      {result && result.maxScore > 1 && (
        <span>
          {result.score}/{result.maxScore}.{' '}
        </span>
      )}
      {result?.message && <span>{result.message} </span>}
      {(shown || verdict !== 'correct') && (
        <div>
          <span className="sc">Answer:</span> <RichText text={answerText(item)} />
        </div>
      )}
      <div>
        <RichText text={item.explanation} />
      </div>
      <div>
        <Link to={refPath(item.ref)} className="sc">
          Review: {item.ref}
        </Link>
      </div>
    </div>
  );
}

interface InputProps {
  item: Item;
  response: ItemResponse;
  setResponse: (r: ItemResponse) => void;
  locked: boolean;
  result: CheckResult | null;
  shown: boolean;
  n: number | string;
}

function splitGap(prompt: string): [string, string] {
  const i = prompt.indexOf('___');
  return i < 0 ? [prompt, ''] : [prompt.slice(0, i), prompt.slice(i + 3)];
}

function ItemInput(p: InputProps): ReactNode {
  const { item } = p;
  switch (item.type) {
    case 'mcq':
    case 'reading':
      return <Mcq {...p} prompt={item.prompt} options={item.options} answer={item.answer} />;
    case 'gap':
    case 'word-formation':
    case 'phrasal-choice': {
      const [before, after] = splitGap(item.prompt);
      const value = typeof p.response === 'string' ? p.response : '';
      const long = item.acceptedAnswers[0].length > 18;
      return (
        <div className="item-prompt">
          <RichText text={before} />
          <input
            className={`blank ${long ? 'wide' : ''}`}
            aria-label={`Answer ${p.n}`}
            value={value}
            onChange={(e) => p.setResponse(e.target.value)}
            readOnly={p.locked}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <RichText text={after} />
          {item.cue && (
            <span className="cue">
              {' '}
              {item.type === 'word-formation' && item.cue === item.cue.toUpperCase() ? <span className="kwt-key">{item.cue}</span> : `(${item.cue})`}
            </span>
          )}
        </div>
      );
    }
    case 'kwt': {
      const value = typeof p.response === 'string' ? p.response : '';
      return (
        <div>
          <div className="item-prompt">
            <RichText text={item.first} />
          </div>
          <div className="item-prompt">
            <span className="kwt-key" aria-label={`key word ${item.keyword}`}>
              {item.keyword}
            </span>
          </div>
          <div className="item-prompt">
            {item.before && <RichText text={item.before + ' '} />}
            <input
              className="blank wide"
              aria-label={`Answer ${p.n} (2–5 words including ${item.keyword})`}
              value={value}
              onChange={(e) => p.setResponse(e.target.value)}
              readOnly={p.locked}
              autoComplete="off"
              spellCheck={false}
            />
            {item.after && <RichText text={(/^[,.;:!?]/.test(item.after) ? '' : ' ') + item.after} />}
          </div>
        </div>
      );
    }
    case 'error-correction':
      return <ErrorCorrection {...p} item={item} />;
    case 'matching':
      return <Matching {...p} item={item} />;
    case 'word-order':
      return <WordOrder {...p} item={item} />;
    case 'open-cloze':
      return <OpenCloze {...p} item={item} />;
    case 'mc-cloze':
      return <McCloze {...p} item={item} />;
  }
}

function Mcq({ prompt, options, answer, response, setResponse, locked, result, shown, n, item }: InputProps & { prompt: string; options: string[]; answer: number }) {
  const name = `q-${item.id}`;
  return (
    <div>
      <div className="item-prompt">
        <RichText text={prompt} />
      </div>
      <ul className="options" role="radiogroup" aria-label={`Question ${n}`}>
        {options.map((o, i) => {
          const chosen = response === i;
          const cls = (shown || result) && i === answer && (shown || result?.verdict === 'correct') ? 'is-answer' : result && chosen && i !== answer ? 'is-wrong' : '';
          return (
            <li key={i}>
              <label className={cls}>
                <input type="radio" name={name} checked={chosen} onChange={() => setResponse(i)} disabled={locked && !chosen} />
                <span className="letter">{letter(i)}</span>
                <span>
                  <RichText text={o} />
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ErrorCorrection({ item, response, setResponse, locked, n }: InputProps & { item: Extract<Item, { type: 'error-correction' }> }) {
  const r = (response as ErrorResponse | undefined) ?? { index: -1, correction: '' };
  let k = -1;
  return (
    <div>
      <div className="item-prompt err-parts">
        {item.parts.map((part, i) => {
          if (typeof part === 'string') return <RichText key={i} text={part} />;
          k++;
          const idx = k;
          return (
            <button
              key={i}
              type="button"
              className="seg"
              aria-pressed={r.index === idx}
              onClick={() => setResponse({ ...r, index: idx })}
              disabled={locked}
            >
              {part.u}
              <span className="seg-letter">{letter(idx)}</span>
            </button>
          );
        })}
      </div>
      <div className="item-prompt">
        <span className="sc">Correction:</span>{' '}
        <input
          className="blank wide"
          aria-label={`Correction for item ${n}`}
          value={r.correction}
          onChange={(e) => setResponse({ ...r, correction: e.target.value })}
          readOnly={locked}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

function Matching({ item, response, setResponse, locked, result, n }: InputProps & { item: Extract<Item, { type: 'matching' }> }) {
  const r = Array.isArray(response) ? (response as number[]) : item.left.map(() => -1);
  return (
    <div>
      {item.prompt && <div className="item-prompt sc">{item.prompt}</div>}
      <div className="matching">
        <ol>
          {item.left.map((l, i) => (
            <li key={i}>
              <RichText text={l} />{' '}
              <select
                className={`blank ${result?.parts ? `gap-mark ${result.parts[i]}` : ''}`}
                aria-label={`Match for ${i + 1} (item ${n})`}
                value={r[i] ?? -1}
                disabled={locked}
                onChange={(e) => {
                  const next = [...r];
                  next[i] = Number(e.target.value);
                  setResponse(next);
                }}
              >
                <option value={-1}>—</option>
                {item.right.map((_, j) => (
                  <option key={j} value={j}>
                    {String.fromCharCode(97 + j)}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ol>
        <ol className="alpha">
          {item.right.map((rt, j) => (
            <li key={j}>
              <RichText text={rt} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function WordOrder({ item, response, setResponse, locked }: InputProps & { item: Extract<Item, { type: 'word-order' }> }) {
  const shuffled = useMemo(() => {
    const idx = item.fragments.map((_, i) => i);
    let s = new Rng(item.id).shuffle(idx);
    // Never present the fragments already in the right order.
    if (s.every((v, i) => v === i) && s.length > 1) s = [...s.slice(1), s[0]];
    return s;
  }, [item]);
  const placed = Array.isArray(response) ? (response as string[]) : [];
  // Track which fragment indices are used, allowing repeated fragments.
  const used = new Set<number>();
  for (const frag of placed) {
    const i = shuffled.find((k) => item.fragments[k] === frag && !used.has(k));
    if (i !== undefined) used.add(i);
  }
  return (
    <div>
      {item.context && (
        <div className="item-prompt">
          <RichText text={item.context} />
        </div>
      )}
      <div className="answer-line fragments" aria-label="Your sentence" aria-live="polite">
        {placed.map((frag, i) => (
          <button key={i} type="button" className="fragment placed" disabled={locked} onClick={() => setResponse(placed.filter((_, j) => j !== i))} aria-label={`Remove “${frag}”`}>
            {frag}
          </button>
        ))}
      </div>
      <div className="fragments" aria-label="Fragments">
        {shuffled.map((k) =>
          used.has(k) ? null : (
            <button key={k} type="button" className="fragment" disabled={locked} onClick={() => setResponse([...placed, item.fragments[k]])}>
              {item.fragments[k]}
            </button>
          ),
        )}
      </div>
      {placed.length > 0 && !locked && (
        <button type="button" className="linkish" onClick={() => setResponse([])}>
          clear
        </button>
      )}
    </div>
  );
}

function clozeSegments(text: string): Array<string | number> {
  const out: Array<string | number> = [];
  const re = /\[(\d+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    out.push(text.slice(last, m.index));
    out.push(Number(m[1]) - 1);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

function OpenCloze({ item, response, setResponse, locked, result }: InputProps & { item: Extract<Item, { type: 'open-cloze' }> }) {
  const r = Array.isArray(response) ? (response as string[]) : item.gaps.map(() => '');
  return (
    <div>
      {item.title && <h4 className="subhead">{item.title}</h4>}
      <p className="cloze-text">
        {clozeSegments(item.text).map((seg, i) =>
          typeof seg === 'string' ? (
            <RichText key={i} text={seg} />
          ) : (
            <span key={i}>
              <span className="gap-num">{seg + 1}</span>
              <input
                className={`blank ${result?.parts ? `gap-mark ${result.parts[seg]}` : ''}`}
                aria-label={`Gap ${seg + 1}`}
                value={r[seg] ?? ''}
                readOnly={locked}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => {
                  const next = [...r];
                  next[seg] = e.target.value;
                  setResponse(next);
                }}
              />
            </span>
          ),
        )}
      </p>
    </div>
  );
}

function McCloze({ item, response, setResponse, locked, result }: InputProps & { item: Extract<Item, { type: 'mc-cloze' }> }) {
  const r = Array.isArray(response) ? (response as number[]) : item.gaps.map(() => -1);
  return (
    <div>
      {item.title && <h4 className="subhead">{item.title}</h4>}
      <p className="cloze-text">
        {clozeSegments(item.text).map((seg, i) =>
          typeof seg === 'string' ? (
            <RichText key={i} text={seg} />
          ) : (
            <span key={i}>
              <span className="gap-num">{seg + 1}</span>
              <select
                className={`blank ${result?.parts ? `gap-mark ${result.parts[seg]}` : ''}`}
                aria-label={`Gap ${seg + 1}`}
                value={r[seg] ?? -1}
                disabled={locked}
                onChange={(e) => {
                  const next = [...r];
                  next[seg] = Number(e.target.value);
                  setResponse(next);
                }}
              >
                <option value={-1}>—</option>
                {item.gaps[seg].options.map((o, j) => (
                  <option key={j} value={j}>
                    {letter(j)} {o}
                  </option>
                ))}
              </select>
            </span>
          ),
        )}
      </p>
      <table className="ledger only-print">
        <tbody>
          {item.gaps.map((g, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {g.options.map((o, j) => (
                <td key={j}>
                  {letter(j)} {o}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
