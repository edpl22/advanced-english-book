import { Link } from 'react-router-dom';
import { MarginNote } from '@/components/Blocks';
import { useLang } from '@/lib/i18n';
import { HowToUsePt } from './HowToUsePt';

export function HowToUse() {
  return useLang() === 'pt' ? <HowToUsePt /> : <HowToUseEn />;
}

function HowToUseEn() {
  return (
    <div className="single">
      <div className="running-head">
        <span>Front matter</span>
        <span>How to Use This Book</span>
      </div>
      <h1 className="sc" style={{ marginBottom: '1.5rem' }}>
        How to Use This Book
      </h1>
      <div className="with-margin">
        <div>
          <p className="dropcap">
            This is a reference and practice book for learners who already communicate in English and now want accuracy, range and exam
            results. Each unit can be studied on its own; cross-references such as <Link to="/book/unit/u07?s=7.2">7.2</Link> send you to the
            section that explains a point.
          </p>
          <h2 className="subhead">The structure of a unit</h2>
          <ol>
            <li>
              <b>Presentation</b> — form, use and nuance, with tables.
            </li>
            <li>
              <b>Examples</b> — sentences and a short text in context.
            </li>
            <li>
              <b>Common mistakes by Brazilian learners</b> — explained in Portuguese.
            </li>
            <li>
              <b>Exam focus</b> — how the topic appears in TOEFL, IELTS, Cambridge and Brazilian entrance exams.
            </li>
            <li>
              <b>Exercises</b> — at least 80 items in at least six formats, all corrected automatically.
            </li>
            <li>
              <b>Quick review</b> — the essentials on one page.
            </li>
            <li>
              <b>More practice</b> — unlimited new items produced from the unit’s grammar.
            </li>
          </ol>
        </div>
        <div className="margin-col">
          <MarginNote variant="note" text="Notes like this one sit in the margin. **Watch out!** marks a common trap; **Exam focus** shows how a point is tested." />
        </div>
      </div>
      <div className="with-margin">
        <div>
          <h2 className="subhead">How answers are corrected</h2>
          <p>Before your answer is compared with the key, it is normalised:</p>
          <ul>
            <li>extra spaces, capital letters and the final full stop are ignored (capitals count only where an item says so);</li>
            <li>curly and straight apostrophes and quotation marks are treated as the same;</li>
            <li>
              contractions and full forms are equivalent: <i>don’t = do not</i>, <i>won’t = will not</i>, <i>can’t = cannot = can not</i>. The
              ambiguous <i>’d</i> and <i>’s</i> are read as <i>had/would</i> and <i>is/has</i> according to the sentence;
            </li>
            <li>every acceptable variant listed by the author is accepted (for example both British and American spellings).</li>
          </ul>
          <p>You receive one of three verdicts:</p>
          <ul>
            <li>
              <b className="sc">Correct</b>;
            </li>
            <li>
              <b className="sc">Almost</b> — your answer differs from a correct one by a single spelling slip (one letter added, missing,
              changed, or two letters swapped), and the misspelt word is not itself a real English form. A slip such as <i>recieved</i> is
              “almost”; <i>lives</i> for <i>lived</i> is a grammar error, so it is marked wrong;
            </li>
            <li>
              <b className="sc">Not quite</b> — with the answer, an explanation and a link to the section to review.
            </li>
          </ul>
          <h2 className="subhead">Key word transformations</h2>
          <p>
            Use between two and five words, including the key word, which must not be changed. Contractions count as the words they stand for
            (<i>didn’t</i> = 2, <i>can’t</i> = 2, <i>I’d</i> = 2); <i>cannot</i> counts as one word, a hyphenated word as one, and a possessive
            ’s adds nothing. A negative contraction of the key word is accepted (<b>HAD</b> → <i>hadn’t</i>); other contractions are not
            (<b>WOULD</b> → <i>’d</i>).
          </p>
          <h2 className="subhead">Practice Tests, TOEFL and progress</h2>
          <p>
            Every answer you check is recorded on this device. Items you get wrong enter a <b>spaced review</b> queue (five boxes, reviewed after
            1, 2, 4, 8 and 16 days). <Link to="/progress">My Progress</Link> shows your accuracy by topic, your most frequent errors and lets you
            export or import your progress as a file. After ten attempts at an item, its difficulty is recalibrated from your own results.
          </p>
          <p>
            Questions marked <span className="source-tag">authored</span> were written and reviewed by hand;{' '}
            <span className="source-tag">generated</span> questions are produced by grammar generators from verified tables, so their answers are
            guaranteed — Practice Tests let you filter by source.
          </p>
          <h2 className="subhead">Printing and offline use</h2>
          <p>
            Each unit prints as book pages (use your browser’s Print command); Practice Tests print as a test paper with a separate answer sheet.
            After the first visit the whole book works without an internet connection.
          </p>
        </div>
        <div className="margin-col">
          <MarginNote variant="watch" title="Audio" text="Listening tasks use your browser’s built-in voices. If no voice is available, the transcript is offered instead." />
        </div>
      </div>
    </div>
  );
}
