import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { applyTheme, useStore } from '@/lib/useStore';
import { isStorageAvailable, update } from '@/lib/storage';

const TABS: Array<[string, string]> = [
  ['/book', 'The Book'],
  ['/tests', 'Practice Tests'],
  ['/toefl', 'TOEFL Simulator'],
  ['/lexicon', 'Lexicon'],
  ['/medieval', 'Old & Middle English'],
  ['/progress', 'My Progress'],
];

const THEMES = [
  ['auto', 'Auto', 'Paper follows your system setting'],
  ['day', 'Day', 'Cream paper'],
  ['night', 'Night', 'Dark sepia paper for night reading'],
] as const;

export function Layout() {
  const state = useStore();
  const theme = state.settings.theme;
  const location = useLocation();

  useEffect(() => applyTheme(theme), [theme]);

  // Scroll to the top on navigation, unless a section is requested.
  useEffect(() => {
    if (!new URLSearchParams(location.search).get('s')) window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <div className="masthead-inner">
          <Link to="/book" className="masthead-title" aria-label="Advanced English — home">
            <span className="wordmark">Advanced English</span>
            <span className="fleuron" aria-hidden="true">
              ❧
            </span>
            <span className="strap">Grammar, Vocabulary &amp; Exams</span>
          </Link>
          <div className="masthead-tools">
            <div className="paper-switch" role="group" aria-label="Paper colour">
              {THEMES.map(([value, label, title]) => (
                <button
                  key={value}
                  type="button"
                  title={title}
                  aria-pressed={theme === value}
                  onClick={() => update((s) => ({ ...s, settings: { ...s.settings, theme: value } }))}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <nav className="tabs" aria-label="Main sections">
          {TABS.map(([to, label]) => (
            <NavLink key={to} to={to} aria-current={location.pathname.startsWith(to) ? 'page' : undefined}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      {!isStorageAvailable() && (
        <div className="page" style={{ paddingBottom: 0 }}>
          <p className="notice" role="note">
            Your browser is not allowing this site to save data, so progress will be kept only until you close this page. You can still export it from My Progress.
          </p>
        </div>
      )}
      <main id="main" className="page">
        <Outlet />
      </main>
      <footer className="colophon">
        <span>
          <span className="sc">Advanced English</span> · set in EB Garamond
        </span>
        <span>All texts and exercises are original. Your progress stays on this device.</span>
      </footer>
    </>
  );
}
