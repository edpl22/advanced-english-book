import { lazy, Suspense, type ReactNode } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BookHome } from './features/book/BookHome';
import { HowToUse } from './features/book/HowToUse';
import { UnitPage } from './features/book/UnitPage';
import { MorePractice } from './features/book/MorePractice';
import { AnswerKey, FalseFriends, Glossary, IndexPage, IrregularVerbs, PhrasalDictionary } from './features/book/Appendices';

const PracticeTests = lazy(() => import('./features/exams/PracticeTests'));
const Toefl = lazy(() => import('./features/toefl/ToeflHome'));
const Lexicon = lazy(() => import('./features/lexicon/LexiconHome'));
const Medieval = lazy(() => import('./features/medieval/MedievalHome'));
const Progress = lazy(() => import('./features/progress/ProgressPage'));
const Daily = lazy(() => import('./features/daily/DailyChallenge'));

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<p className="muted">Turning the page…</p>}>{children}</Suspense>;
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/book" replace />} />
          <Route path="/book" element={<BookHome />} />
          <Route path="/book/how-to-use" element={<HowToUse />} />
          <Route path="/book/unit/:id" element={<UnitPage />} />
          <Route path="/book/unit/:id/practice" element={<MorePractice />} />
          <Route path="/book/appendix/irregular-verbs" element={<IrregularVerbs />} />
          <Route path="/book/appendix/phrasal-verbs" element={<PhrasalDictionary />} />
          <Route path="/book/appendix/false-friends" element={<FalseFriends />} />
          <Route path="/book/glossary" element={<Glossary />} />
          <Route path="/book/index" element={<IndexPage />} />
          <Route path="/book/answer-key" element={<AnswerKey />} />
          <Route path="/tests/*" element={<Lazy><PracticeTests /></Lazy>} />
          <Route path="/toefl/*" element={<Lazy><Toefl /></Lazy>} />
          <Route path="/lexicon/*" element={<Lazy><Lexicon /></Lazy>} />
          <Route path="/medieval/*" element={<Lazy><Medieval /></Lazy>} />
          <Route path="/progress" element={<Lazy><Progress /></Lazy>} />
          <Route path="/daily" element={<Lazy><Daily /></Lazy>} />
          <Route path="*" element={<Navigate to="/book" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
