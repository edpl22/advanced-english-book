import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { unitIdForRef } from '@content/units/toc';

/** Link to a book section such as "7.2". */
export function refPath(ref: string): string {
  if (ref.startsWith('ME.')) return `/medieval?s=${ref.slice(3)}`;
  if (ref.startsWith('TOEFL')) return '/toefl';
  const unit = unitIdForRef(ref);
  if (!unit) return ref === 'Lexicon' ? '/lexicon' : '/book';
  return `/book/unit/${unit}?s=${encodeURIComponent(ref)}`;
}

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[\[[^\]]+\]\]|\^\d+|`[^`]+`)/g;

/**
 * Minimal inline markup: **bold**, *italic*, `formula`, [[7.2]] section
 * links and ^1 footnote markers.
 */
export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN).filter((p) => p !== '');
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('[[') && p.endsWith(']]')) {
          const ref = p.slice(2, -2);
          return (
            <Link key={i} to={refPath(ref)}>
              {ref}
            </Link>
          );
        }
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        if (p.startsWith('`') && p.endsWith('`')) return <span key={i} className="formula">{p.slice(1, -1)}</span>;
        if (/^\^\d+$/.test(p)) return <sup key={i} className="fn">{p.slice(1)}</sup>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

/** Paragraphs separated by blank lines. */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p, i) => (
        <p key={i} className={className}>
          <RichText text={p.trim()} />
        </p>
      ))}
    </>
  );
}
