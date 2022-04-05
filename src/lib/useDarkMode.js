import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
  const [isEnabled, setEnabled] = useLocalStorage('dark-mode', undefined);

  useEffect(() => {}, [isEnabled]);

  useEffect(() => {
    if (isEnabled === undefined) {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setEnabled(prefersDarkMode);
    }
    const root = window.document.documentElement;
    root.classList.remove(isEnabled ? 'light' : 'dark');
    root.classList.add(isEnabled ? 'dark' : 'light');
    setEnabled(isEnabled);
  }, [isEnabled, setEnabled]);

  return [isEnabled, setEnabled];
}
