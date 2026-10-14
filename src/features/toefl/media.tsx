import { useEffect, useRef, useState } from 'react';
import { speakScript, speechSupported, stopSpeaking, type ScriptLine } from '@/lib/speech';
import { recordingSupported, startRecording, type Recording } from '@/lib/recorder';
import { load } from '@/lib/storage';

/**
 * Plays a script once (as in the real test). Without speech synthesis, the
 * transcript is offered instead.
 */
export function AudioPlayer({ lines, onDone, allowReplay = false, label = 'Play audio' }: { lines: ScriptLine[]; onDone?: () => void; allowReplay?: boolean; label?: string }) {
  const [state, setState] = useState<'idle' | 'playing' | 'done'>('idle');
  const [showText, setShowText] = useState(false);
  const stop = useRef(false);

  useEffect(
    () => () => {
      stop.current = true;
      stopSpeaking();
    },
    [],
  );

  if (!speechSupported()) {
    return (
      <div className="notice">
        Audio is not available in this browser.{' '}
        {!showText ? (
          <button
            type="button"
            className="linkish"
            onClick={() => {
              setShowText(true);
              onDone?.();
            }}
          >
            Read the transcript instead
          </button>
        ) : (
          <div lang="en">
            {lines.map((l, i) => (
              <p key={i}>
                <b>{l.speaker}:</b> {l.text}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }

  const play = async () => {
    stop.current = false;
    setState('playing');
    await speakScript(lines, load().settings.speechRate, () => stop.current);
    if (!stop.current) {
      setState('done');
      onDone?.();
    }
  };

  return (
    <div className="btn-row" aria-live="polite">
      <button type="button" className="btn primary" onClick={play} disabled={state === 'playing' || (state === 'done' && !allowReplay)}>
        {state === 'idle' ? `▶ ${label}` : state === 'playing' ? 'Playing…' : allowReplay ? '▶ Play again' : 'Played'}
      </button>
      {state === 'playing' && <span className="muted">Listen carefully — the audio plays once.</span>}
    </div>
  );
}

/** Records the learner's answer for a fixed time, then offers playback. */
export function Recorder({ seconds, value, onChange }: { seconds: number; value?: string; onChange: (url: string) => void }) {
  const [rec, setRec] = useState<Recording | null>(null);
  const [left, setLeft] = useState(seconds);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rec) return;
    if (left <= 0) {
      rec.stop().then((url) => {
        setRec(null);
        if (url) onChange(url);
      });
      return;
    }
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rec, left]);

  useEffect(() => () => rec?.cancel(), [rec]);

  if (!recordingSupported()) {
    return <p className="notice">Recording is not available in this browser. Answer aloud and rate yourself at the end of the section.</p>;
  }

  return (
    <div>
      <div className="btn-row">
        {!rec ? (
          <button
            type="button"
            className="btn primary"
            onClick={async () => {
              setError(null);
              try {
                setLeft(seconds);
                setRec(await startRecording());
              } catch {
                setError('The microphone could not be used. Check the browser permission, or answer aloud and rate yourself later.');
              }
            }}
          >
            ● {value ? 'Record again' : 'Start recording'}
          </button>
        ) : (
          <button
            type="button"
            className="btn accent"
            onClick={() => setLeft(0)}
            aria-label={`Recording, ${left} seconds left. Stop now`}
          >
            ■ Stop ({left}s)
          </button>
        )}
        <span className="muted">Response time: {seconds} seconds</span>
      </div>
      {error && <p className="notice">{error}</p>}
      {value && !rec && (
        <p>
          <span className="sc">Your answer:</span> <audio controls src={value} />
        </p>
      )}
    </div>
  );
}

export function Countdown({ seconds, onEnd, label }: { seconds: number; onEnd?: () => void; label?: string }) {
  const [left, setLeft] = useState(seconds);
  const ended = useRef(false);
  useEffect(() => {
    const t = setInterval(() => setLeft((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (left === 0 && !ended.current) {
      ended.current = true;
      onEnd?.();
    }
  }, [left, onEnd]);
  const m = Math.floor(left / 60);
  const s = left % 60;
  return (
    <span className={`timer ${left < 60 ? 'low' : ''}`} role="timer" aria-label={`${label ?? 'Time left'}: ${m} minutes ${s} seconds`}>
      {label ? `${label} ` : ''}
      {m}:{String(s).padStart(2, '0')}
    </span>
  );
}
