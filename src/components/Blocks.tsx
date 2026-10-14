import type { Block } from '@content/units/types';
import { Paragraphs, RichText } from './RichText';

const NOTE_LABEL = { note: 'Note', watch: 'Watch out!', exam: 'Exam focus' } as const;

export function MarginNote({ variant, title, text }: { variant: 'note' | 'watch' | 'exam'; title?: string; text: string }) {
  return (
    <aside className={`margin-note ${variant}`} aria-label={title ?? NOTE_LABEL[variant]}>
      <span className="label">{title ?? NOTE_LABEL[variant]}</span>
      <RichText text={text} />
    </aside>
  );
}

export function BookTable({ caption, head, rows, note }: { caption?: string; head: string[]; rows: string[][]; note?: string }) {
  return (
    <div className="table-wrap">
      <table className="book-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>
                  <RichText text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <p className="muted">
          <RichText text={note} />
        </p>
      )}
    </div>
  );
}

function BlockBody({ b }: { b: Block }) {
  switch (b.kind) {
    case 'p':
      return (
        <p>
          <RichText text={b.text} />
        </p>
      );
    case 'h':
      return <h3 className="subhead">{b.text}</h3>;
    case 'table':
      return <BookTable caption={b.caption} head={b.head} rows={b.rows} note={b.note} />;
    case 'examples':
      return (
        <ul className="examples" lang="en">
          {b.items.map((e, i) => (
            <li key={i}>
              <RichText text={e.en} />
              {e.note && (
                <>
                  {' '}
                  <span className="ex-note">({e.note})</span>
                </>
              )}
            </li>
          ))}
        </ul>
      );
    case 'pt':
      return (
        <section className="pt-box" lang="pt-BR" aria-label={b.title}>
          <h4>{b.title}</h4>
          <RichText text={b.text} />
        </section>
      );
    case 'list':
      return b.ordered ? (
        <ol>
          {b.items.map((t, i) => (
            <li key={i}>
              <RichText text={t} />
            </li>
          ))}
        </ol>
      ) : (
        <ul>
          {b.items.map((t, i) => (
            <li key={i}>
              <RichText text={t} />
            </li>
          ))}
        </ul>
      );
    case 'passage':
      return (
        <div className="passage">
          {b.title && <h3 className="subhead">{b.title}</h3>}
          <Paragraphs text={b.text} />
        </div>
      );
    case 'note':
      return null;
  }
}

/**
 * Renders a section's blocks. Each margin note is attached to the block just
 * before it and floats in the margin column on wide screens (inline on small
 * screens and in print it returns to the margin).
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  const rows: Array<{ body: Block | null; notes: Block[] }> = [];
  for (const b of blocks) {
    if (b.kind === 'note') {
      if (rows.length === 0) rows.push({ body: null, notes: [] });
      rows[rows.length - 1].notes.push(b);
    } else rows.push({ body: b, notes: [] });
  }
  return (
    <>
      {rows.map((r, i) => (
        <div className="with-margin" key={i}>
          <div className="main-col">{r.body && <BlockBody b={r.body} />}</div>
          {r.notes.length > 0 && (
            <div className="margin-col">
              {r.notes.map((n, k) => (n.kind === 'note' ? <MarginNote key={k} variant={n.variant} title={n.title} text={n.text} /> : null))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
