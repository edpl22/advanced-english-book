import { Link } from 'react-router-dom';
import { TOC } from '@content/units/toc';
import { getUnit } from '@content/units';
import { itemPoints } from '@/lib/schema';
import { everCorrect } from '@/lib/progress';
import { useStore } from '@/lib/useStore';

export function Cover() {
  return (
    <div className="cover">
      <div className="publisher">A course book for Brazilian learners</div>
      <div className="ornament" aria-hidden="true">
        · · ·
      </div>
      <h1>Advanced English</h1>
      <div className="subtitle">Grammar, Vocabulary and Exam Practice · B2–C2</div>
      <div className="ornament" aria-hidden="true">
        · · ·
      </div>
      <p className="muted" style={{ maxWidth: '30rem' }}>
        TOEFL · IELTS · Cambridge C1/C2 · ITA · IME · AFA · EN · EFOMM · EsPCEx · FUVEST · ENEM
      </p>
    </div>
  );
}

export function Contents() {
  const state = useStore();
  const done = everCorrect(state);
  return (
    <nav aria-labelledby="contents-h">
      <h2 id="contents-h" className="sc" style={{ fontSize: '1.8rem', letterSpacing: '0.08em' }}>
        Contents
      </h2>
      <ul className="toc">
        <li className="part">
          <div className="part-title">Front matter</div>
          <div className="unit">
            <span className="n" />
            <Link to="/book/how-to-use">How to Use This Book</Link>
            <span className="leader">correction rules · symbols</span>
          </div>
        </li>
        {TOC.map((part) => (
          <li className="part" key={part.part}>
            <div className="part-title">
              Part {part.part} · {part.title}
            </div>
            {part.units.map((u) => {
              const unit = getUnit(u.id);
              const total = unit ? unit.exercises.flatMap((e) => e.items).reduce((n, it) => n + itemPoints(it), 0) : 0;
              const got = unit ? unit.exercises.flatMap((e) => e.items).filter((it) => done.has(it.id)).length : 0;
              const items = unit ? unit.exercises.flatMap((e) => e.items).length : 0;
              return (
                <div className="unit" key={u.id}>
                  <span className="n">{u.number}</span>
                  <span>
                    {u.ready ? <Link to={`/book/unit/${u.id}`}>{u.title}</Link> : <span>{u.title}</span>}
                  </span>
                  <span className="leader">
                    {u.ready ? `${total} items${items ? ` · ${Math.round((got / items) * 100)}% done` : ''}` : `in preparation (phase ${u.phase})`}
                  </span>
                  <span className="sections">
                    {u.sections.map((s, i) => (
                      <span key={i}>
                        {u.number}.{i + 1} {s}
                        {i < u.sections.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              );
            })}
          </li>
        ))}
        <li className="part">
          <div className="part-title">Back matter</div>
          {[
            ['A', '/book/appendix/irregular-verbs', 'Appendix A · Irregular verbs'],
            ['B', '/book/appendix/phrasal-verbs', 'Appendix B · Phrasal verbs dictionary'],
            ['C', '/book/appendix/false-friends', 'Appendix C · False friends'],
            ['', '/book/glossary', 'Glossary'],
            ['', '/book/index', 'Index'],
            ['', '/book/answer-key', 'Answer Key'],
          ].map(([n, to, label]) => (
            <div className="unit" key={to}>
              <span className="n">{n}</span>
              <Link to={to}>{label}</Link>
              <span className="leader" />
            </div>
          ))}
        </li>
      </ul>
    </nav>
  );
}

export function BookHome() {
  return (
    <div className="single">
      <Cover />
      <Contents />
    </div>
  );
}
