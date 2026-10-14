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

const THEME_LABEL = { auto: 'Paper: auto', day: 'Paper: day', night: 'Paper: night reading' } as const;
const NEXT_THEME = { auto: 'day', day: 'night', night: 'auto' } as const;

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
          <Link to="/book" className="masthead-title">
            Advanced English <b>·</b> Grammar, Vocabulary &amp; Exams
          </Link>
          <div className="masthead-tools">
            <button
              type="button"
              className="linkish"
              onClick={() => update((s) => ({ ...s, settings: { ...s.settings, theme: NEXT_THEME[theme] } }))}
              aria-label={`${THEME_LABEL[theme]}. Change paper colour`}
            >
              {THEME_LABEL[theme]}
            </button>
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
    </>
  );
}
