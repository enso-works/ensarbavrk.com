import { useEffect, useState } from 'react';
import Script from 'next/script';

const DARK_MODE_KEY = 'blog-theme';
const LIGHT_MODE_CLASS_NAME = 'light';
const DARK_MODE_CLASS_NAME = 'dark';

const initDarkMode = () => `
  (function() {
    try {
      const darkMode = localStorage.getItem('blog-theme');
      const root = document.documentElement;
      const isUserPrefDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Remove any existing theme class first
      root.classList.remove('light', 'dark');
      
      if(['dark', 'light'].includes(darkMode)) {
        root.classList.add(darkMode);
        root.style.setProperty('color-scheme', darkMode);
      } else {
        const initialTheme = isUserPrefDarkMode ? 'dark' : 'light';
        root.classList.add(initialTheme);
        root.style.setProperty('color-scheme', initialTheme);
        localStorage.setItem('blog-theme', initialTheme);
      }
    } catch (e) {
      // Fallback if localStorage is not available
      document.documentElement.classList.add('light');
    }
  })();
`;

export const DarkModeInitializerScript = () => {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initDarkMode(),
        }}
      />
      <Script
        id="dark-mode-initializer"
        strategy="beforeInteractive"
        src={`data:text/javascript;base64,${Buffer.from(
          initDarkMode()
        ).toString('base64')}`}
      />
    </>
  );
};

const isSystemDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const switchDarkModeClasses = (classValue: string) => {
  const root = window.document.documentElement;

  root.classList.remove(
    classValue === DARK_MODE_CLASS_NAME
      ? LIGHT_MODE_CLASS_NAME
      : DARK_MODE_CLASS_NAME
  );
  root.classList.add(classValue);
};

const setupTransitionClass = () => {
  const documentDiv = document.querySelector('#__next');
  if (documentDiv && !documentDiv.classList.contains('transition')) {
    documentDiv.classList.add('transition', 'ease-in', 'duration-200');
  }
};

export const useToggleDarkMode = () => {
  const [shouldToggle, setToggle] = useState<boolean | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      return root.classList.contains(DARK_MODE_CLASS_NAME);
    }
    return false;
  });

  useEffect(() => {
    if (shouldToggle !== null) {
      const storedMode = window.localStorage.getItem(DARK_MODE_KEY);
      const newModeSelected =
        storedMode === DARK_MODE_CLASS_NAME
          ? LIGHT_MODE_CLASS_NAME
          : DARK_MODE_CLASS_NAME;

      try {
        window.localStorage.setItem(DARK_MODE_KEY, newModeSelected);
        switchDarkModeClasses(newModeSelected);
        setIsDarkMode(newModeSelected === DARK_MODE_CLASS_NAME);
      } catch (e) {
        console.error(e);
      }
    } else {
      const root = window.document.documentElement;
      setIsDarkMode(root.classList.contains(DARK_MODE_CLASS_NAME));
    }
  }, [shouldToggle]);

  return {
    toggle: () => {
      setToggle((prev) => !prev);
    },
    isDarkMode,
  };
};

export const useDarkMode = () => {
  useEffect(() => {
    const storageEvent = (event: StorageEvent) => {
      const { newValue } = event;
      if (
        !newValue ||
        ![DARK_MODE_CLASS_NAME, LIGHT_MODE_CLASS_NAME].includes(newValue)
      ) {
        window.localStorage.setItem(
          DARK_MODE_KEY,
          isSystemDarkMode() ? DARK_MODE_CLASS_NAME : LIGHT_MODE_CLASS_NAME
        );
        switchDarkModeClasses(
          isSystemDarkMode() ? DARK_MODE_CLASS_NAME : LIGHT_MODE_CLASS_NAME
        );
      } else {
        switchDarkModeClasses(newValue);
      }
    };
    window.addEventListener('storage', storageEvent);
    setupTransitionClass();
    return () => window.removeEventListener('storage', storageEvent);
  }, []);
};
