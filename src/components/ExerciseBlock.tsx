import type { Exercise } from '@content/units/types';
import { ITEM_TYPE_LABELS, itemPoints } from '@/lib/schema';
import { ItemView } from './ItemView';

export function ExerciseBlock({ ex }: { ex: Exercise }) {
  const points = ex.items.reduce((n, it) => n + itemPoints(it), 0);
  const types = [...new Set(ex.items.map((i) => ITEM_TYPE_LABELS[i.type]))].join(' · ');
  return (
    <section className="exercise" id={`ex-${ex.id}`} aria-labelledby={`ex-h-${ex.id}`}>
      <div className="exercise-head">
        <span className="ex-num">Exercise {ex.id}</span>
        <h3 id={`ex-h-${ex.id}`}>{ex.title}</h3>
        <span className="ex-meta">
          {types} · {points} {points === 1 ? 'item' : 'items'} · {ex.level}
        </span>
      </div>
      <p className="instruction">{ex.instruction}</p>
      {ex.items.map((it, i) => (
        <ItemView key={it.id} item={it} n={ex.items.length > 1 ? i + 1 : ''} />
      ))}
    </section>
  );
}
