import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUnit } from '@content/units';
import { tocUnit } from '@content/units/toc';
import { GENERATORS, generateMany, getGenerator, type Generator } from '@/lib/generators';
import { TOPIC_INFO, type Topic } from '@/lib/topics';
import { ItemView } from '@/components/ItemView';
import { hashSeed, randomSeedString } from '@/lib/rng';

function generatorsForUnit(id: string): Generator[] {
  const unit = getUnit(id);
  if (unit) return unit.generators.map((k) => getGenerator(k)).filter((g): g is Generator => !!g);
  const toc = tocUnit(id);
  if (!toc) return [];
  const topics = (Object.entries(TOPIC_INFO) as Array<[Topic, (typeof TOPIC_INFO)[Topic]]>).filter(([, v]) => v.unit === toc.number).map(([k]) => k);
  return GENERATORS.filter((g) => topics.includes(g.topic) && !g.key.startsWith('phrasal-') && g.key !== 'tenses');
}

const BATCH = 10;

export function MorePractice() {
  const { id = '' } = useParams();
  const toc = tocUnit(id);
  const gens = generatorsForUnit(id);
  const [genKey, setGenKey] = useState(gens[0]?.key ?? '');
  const [seed, setSeed] = useState(randomSeedString());
  const [batches, setBatches] = useState(1);

  const gen = gens.find((g) => g.key === genKey) ?? gens[0];
  const items = useMemo(() => (gen ? generateMany(gen, hashSeed(`${seed}:${gen.key}`), BATCH * batches) : []), [gen, seed, batches]);

  if (!toc) return <p>Unknown unit.</p>;

  return (
    <div className="single">
      <div className="running-head">
        <span>
          Unit {toc.number} · {toc.title}
        </span>
        <span>More practice</span>
      </div>
      <h1 className="sc" style={{ marginBottom: '0.5rem' }}>
        More practice · Unit {toc.number}
      </h1>
      <p className="muted">
        Items are produced by the grammar generators from verified tables: every answer is guaranteed, and the same seed always gives the same
        items. <Link to={`/book/unit/${id}`}>← Back to the unit</Link>
      </p>
      {gens.length === 0 ? (
        <p className="notice">There is no generator for this unit yet.</p>
      ) : (
        <>
          <div className="field no-print">
            <label htmlFor="gen">Generator</label>
            <select
              id="gen"
              value={gen?.key}
              onChange={(e) => {
                setGenKey(e.target.value);
                setBatches(1);
              }}
            >
              {gens.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.title}
                </option>
              ))}
            </select>
            <span className="muted">
              seed <b>{seed}</b>
            </span>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setSeed(randomSeedString());
                setBatches(1);
              }}
            >
              New set
            </button>
          </div>
          {items.map((it, i) => (
            <ItemView key={it.id} item={it} n={i + 1} context="practice" />
          ))}
          <div className="btn-row no-print" style={{ marginTop: '1.5rem' }}>
            <button type="button" className="btn primary" onClick={() => setBatches((b) => b + 1)}>
              Ten more items
            </button>
          </div>
        </>
      )}
    </div>
  );
}
