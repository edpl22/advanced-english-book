import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { applyTheme, useStore } from '@/lib/useStore';
import { isStorageAvailable, update } from '@/lib/storage';
import { dateKey, doneToday, liveStreak } from '@/lib/daily';
import { N_, useT, type Lang } from '@/lib/i18n';

const TABS: Array<[string, string]> = [
  ['/book', N_('The Book')],
  ['/daily', N_('Daily Challenge')],
  ['/tests', N_('Practice Tests')],
  ['/toefl', N_('TOEFL format')],
  ['/lexicon', N_('Lexicon')],
  ['/medieval', N_('Old & Middle English')],
  ['/progress', N_('My Progress')],
];

const THEMES = [
  ['auto', N_('Auto'), N_('Paper follows your system setting')],
  ['day', N_('Day'), N_('Cream paper')],
  ['night', N_('Night'), N_('Dark sepia paper for night reading')],
] as const;

/** Independent project: exam names only describe the format practised. */
export const DISCLAIMER = N_(
  'An independent study project, not affiliated with, endorsed or reviewed by ETS, Cambridge University Press & Assessment, the British Council, IDP or any entrance-exam board. TOEFL and TOEFL iBT are registered trademarks of ETS; IELTS and Cambridge English are trademarks of their owners. Exam names appear only to describe the format practised, and every score shown here is an unofficial estimate.',
);

const LANGS: Array<[Lang, string, string]> = [
  ['pt', 'PT', 'Interface em português'],
  ['en', 'EN', 'Interface in English'],
];

/** Streak count beside the Daily Challenge tab; a dot while today is still to do. */
function DailyBadge() {
  const { daily } = useStore();
  const t = useT();
  const today = dateKey();
  const streak = liveStreak(daily, today);
  const pending = !doneToday(daily, today);
  return (
    <>
      {streak > 0 && <span className="tab-badge">{streak}</span>}
      {pending && <span className="tab-dot" title={t('Today’s challenge is waiting')} />}
      <span className="sr-only">{`, ${t('{n}-day streak', { n: streak })}, ${pending ? t('today not done yet') : t('done today')}`}</span>
    </>
  );
}

export function Layout() {
  const state = useStore();
  const theme = state.settings.theme;
  const lang = state.settings.lang;
  const t = useT();
  const location = useLocation();

  useEffect(() => applyTheme(theme), [theme]);
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  // Scroll to the top on navigation, unless a section is requested.
  useEffect(() => {
    if (!new URLSearchParams(location.search).get('s')) window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <>
      <a className="skip-link" href="#main">
        {t('Skip to content')}
      </a>
      <header className="masthead">
        <div className="masthead-inner">
          <Link to="/book" className="masthead-title" aria-label={`Thorn — ${t('home')}`}>
            <span className="wordmark">
              <span className="wordmark-thorn" aria-hidden="true">
                Þ
              </span>
              Thorn
            </span>
            <span className="fleuron" aria-hidden="true">
              ❧
            </span>
            <span className="strap">{t('Advanced English for Brazilian learners')}</span>
          </Link>
          <div className="masthead-tools">
            <div className="paper-switch" role="group" aria-label={t('Interface language')}>
              {LANGS.map(([value, label, title]) => (
                <button
                  key={value}
                  type="button"
                  title={title}
                  lang={value === 'pt' ? 'pt-BR' : 'en'}
                  aria-pressed={lang === value}
                  onClick={() => update((s) => ({ ...s, settings: { ...s.settings, lang: value } }))}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="paper-switch" role="group" aria-label={t('Paper colour')}>
              {THEMES.map(([value, label, title]) => (
                <button
                  key={value}
                  type="button"
                  title={t(title)}
                  aria-pressed={theme === value}
                  onClick={() => update((s) => ({ ...s, settings: { ...s.settings, theme: value } }))}
                >
                  {t(label)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <nav className="tabs" aria-label={t('Main sections')}>
          {TABS.map(([to, label]) => (
            <NavLink key={to} to={to} aria-current={location.pathname.startsWith(to) ? 'page' : undefined}>
              {t(label)}
              {to === '/daily' && <DailyBadge />}
            </NavLink>
          ))}
        </nav>
      </header>
      {!isStorageAvailable() && (
        <div className="page" style={{ paddingBottom: 0 }}>
          <p className="notice" role="note">
            {t('Your browser is not allowing this site to save data, so progress will be kept only until you close this page. You can still export it from My Progress.')}
          </p>
        </div>
      )}
      <main id="main" className="page">
        <Outlet />
      </main>
      <footer className="colophon">
        <span>
          <span className="sc">Thorn</span> · {t('set in EB Garamond')}
        </span>
        <span>{t('All texts and exercises are original. Your progress stays on this device.')}</span>
        <p className="disclaimer">{t(DISCLAIMER)}</p>
      </footer>
    </>
  );
}
