import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRREGULAR_VERBS } from '@content/data/verbs';
import { PHRASAL_VERBS, pvLabel, type PvTheme } from '@content/phrasal/dictionary';
import { FALSE_FRIENDS } from '@content/data/tables';
import { GLOSSARY } from '@content/appendices/glossary';
import { UNITS } from '@content/units';
import { answerText } from '@/lib/checking';
import { RichText, refPath } from '@/components/RichText';

function BackHead({ title, part = 'Back matter' }: { title: string; part?: string }) {
  return (
    <div className="running-head">
      <span>{part}</span>
      <span>{title}</span>
    </div>
  );
}

export function IrregularVerbs() {
  const [q, setQ] = useState('');
  const rows = IRREGULAR_VERBS.filter((v) => !q || [v.base, ...v.past, ...v.pp, v.pt ?? ''].some((f) => f.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="single">
      <BackHead title="Appendix A · Irregular verbs" />
      <h1 className="sc">Appendix A · Irregular verbs</h1>
      <p className="muted">
        Where two forms are given, the first is the one used in this book (usually British); the second is common in American English or in
        informal use. {IRREGULAR_VERBS.length} verbs.
      </p>
      <div className="field no-print">
        <label htmlFor="iv-q">Find</label>
        <input id="iv-q" type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="table-wrap">
        <table className="book-table" lang="en">
          <thead>
            <tr>
              <th>Base form</th>
              <th>Past simple</th>
              <th>Past participle</th>
              <th lang="pt-BR">Português</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.base}>
                <td>
                  <b>{v.base}</b>
                </td>
                <td>{v.past.join(' / ')}</td>
                <td>{v.pp.join(' / ')}</td>
                <td lang="pt-BR" className="muted">
                  {v.pt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const THEMES: PvTheme[] = ['work', 'relationships', 'travel', 'problems', 'money', 'communication', 'daily-life', 'study', 'health', 'emotions', 'technology'];

export function PhrasalDictionary() {
  const [particle, setParticle] = useState('');
  const [theme, setTheme] = useState('');
  const [q, setQ] = useState('');
  const particles = useMemo(() => [...new Set(PHRASAL_VERBS.map((p) => p.particle))].sort(), []);
  const rows = PHRASAL_VERBS.filter(
    (p) =>
      (!particle || p.particle === particle) &&
      (!theme || p.themes.includes(theme as PvTheme)) &&
      (!q || `${pvLabel(p)} ${p.meaning} ${p.formal ?? ''}`.toLowerCase().includes(q.toLowerCase())),
  ).sort((a, b) => pvLabel(a).localeCompare(pvLabel(b)));
  return (
    <div className="single">
      <BackHead title="Appendix B · Phrasal verbs" />
      <h1 className="sc">Appendix B · Phrasal verbs dictionary</h1>
      <p className="muted">
        {PHRASAL_VERBS.length} entries. Types: <i>intr.</i> intransitive · <i>sep.</i> separable (turn it off) · <i>insep.</i> inseparable (look
        after it) · <i>3-part</i> (put up with it). See <Link to="/book/unit/u22">Unit 22</Link>.
      </p>
      <div className="field no-print">
        <label htmlFor="pv-q">Find</label>
        <input id="pv-q" type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        <label htmlFor="pv-p">Particle</label>
        <select id="pv-p" value={particle} onChange={(e) => setParticle(e.target.value)}>
          <option value="">all</option>
          {particles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <label htmlFor="pv-t">Theme</label>
        <select id="pv-t" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="">all</option>
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="table-wrap">
        <table className="book-table" lang="en">
          <thead>
            <tr>
              <th>Phrasal verb</th>
              <th>Type</th>
              <th>Meaning</th>
              <th>Formal</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>
                  <b>{pvLabel(p)}</b>
                  {p.register === 'informal' && <span className="muted"> (inf.)</span>}
                </td>
                <td className="muted">{{ intransitive: 'intr.', separable: 'sep.', inseparable: 'insep.', 'three-part': '3-part' }[p.type]}</td>
                <td>{p.meaning}</td>
                <td className="muted">{p.formal ?? '—'}</td>
                <td>
                  <i>{p.examples[0].replace(/[{}]/g, '')}</i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FalseFriends() {
  return (
    <div className="single">
      <BackHead title="Appendix C · False friends" />
      <h1 className="sc">Appendix C · False friends</h1>
      <p className="muted" lang="pt-BR">
        Palavras que parecem iguais em português e inglês, mas não significam a mesma coisa.
      </p>
      <div className="table-wrap">
        <table className="book-table">
          <thead>
            <tr>
              <th lang="pt-BR">Português</th>
              <th>Say in English</th>
              <th>Not…</th>
              <th lang="pt-BR">…que significa</th>
            </tr>
          </thead>
          <tbody>
            {FALSE_FRIENDS.map((f) => (
              <tr key={f.pt}>
                <td lang="pt-BR">
                  <b>{f.pt}</b>
                </td>
                <td lang="en">{f.correct.join(', ')}</td>
                <td lang="en">
                  <i>{f.falseFriend}</i>
                </td>
                <td lang="pt-BR" className="muted">
                  {f.falseMeaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Glossary() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="single">
      <BackHead title="Glossary" />
      <h1 className="sc">Glossary</h1>
      <dl className="prose" style={{ marginLeft: 0 }}>
        {sorted.map((g) => (
          <div key={g.term} style={{ borderBottom: '1px solid var(--rule)', padding: '0.5rem 0' }}>
            <dt>
              <b>{g.term}</b>
              {g.pt && (
                <span className="muted" lang="pt-BR">
                  {' '}
                  · {g.pt}
                </span>
              )}
              {g.ref && (
                <>
                  {' '}
                  · <Link to={refPath(g.ref)}>{g.ref}</Link>
                </>
              )}
            </dt>
            <dd style={{ margin: 0 }}>
              <RichText text={g.def} />
              {g.example && (
                <>
                  {' '}
                  <i>
                    <RichText text={g.example} />
                  </i>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Alphabetical index built from section titles, bold terms, the glossary and the phrasal verbs. */
export function IndexPage() {
  const entries = useMemo(() => {
    const map = new Map<string, Set<string>>();
    const add = (term: string, ref: string) => {
      const t = term.trim().replace(/[.,;:]$/, '');
      if (t.length < 2) return;
      const key = t.toLowerCase();
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(ref);
    };
    for (const u of UNITS) {
      for (const s of u.sections) {
        add(s.title, s.id);
        for (const b of s.blocks) {
          const text = 'text' in b ? b.text : '';
          for (const m of text.matchAll(/\*\*([^*]+)\*\*/g)) add(m[1], s.id);
          if (b.kind === 'table') for (const r of b.rows) for (const c of r) for (const m of c.matchAll(/\*\*([^*]+)\*\*/g)) add(m[1], s.id);
        }
      }
    }
    for (const g of GLOSSARY) if (g.ref) add(g.term, g.ref);
    for (const p of PHRASAL_VERBS) add(pvLabel(p), 'B');
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, []);
  const groups = new Map<string, typeof entries>();
  for (const e of entries) {
    const l = e[0][0].toUpperCase();
    if (!groups.has(l)) groups.set(l, []);
    groups.get(l)!.push(e);
  }
  return (
    <div className="single">
      <BackHead title="Index" />
      <h1 className="sc">Index</h1>
      <p className="muted">Numbers refer to sections; B = Appendix B (phrasal verbs).</p>
      <div className="index-cols" lang="en">
        {[...groups.entries()].map(([l, list]) => (
          <div key={l}>
            <h3>{l}</h3>
            {list.map(([term, refs]) => (
              <div key={term}>
                {term}{' '}
                {[...refs].map((r, i) => (
                  <span key={r}>
                    {i > 0 && ', '}
                    {r === 'B' ? <Link to="/book/appendix/phrasal-verbs">B</Link> : <Link to={refPath(r)}>{r}</Link>}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnswerKey() {
  return (
    <div className="single">
      <BackHead title="Answer Key" />
      <h1 className="sc">Answer Key</h1>
      <p className="muted">Numbering follows the book. Where several answers are possible, they are separated by a slash.</p>
      {UNITS.map((u) => (
        <section key={u.id}>
          <div className="section-title">
            <span className="num">{u.number}</span>
            <h2>{u.title}</h2>
          </div>
          {u.exercises.map((ex) => (
            <div key={ex.id} style={{ marginBottom: '1rem' }}>
              <h3 className="subhead">
                <Link to={`/book/unit/${u.id}?s=${ex.ref}`}>Exercise {ex.id}</Link> · {ex.title}
              </h3>
              <ol style={{ margin: 0 }}>
                {ex.items.map((it) => (
                  <li key={it.id}>
                    <RichText text={answerText(it)} />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
