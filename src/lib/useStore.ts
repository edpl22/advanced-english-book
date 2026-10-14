import { useSyncExternalStore } from 'react';
import { load, subscribe, type State } from './storage';

/** The persistent state, re-rendering on every change. */
export function useStore(): State {
  return useSyncExternalStore(subscribe, load, load);
}

/** Apply the theme setting to <html data-theme>. */
export function applyTheme(theme: State['settings']['theme']): void {
  const root = document.documentElement;
  if (theme === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);
}
