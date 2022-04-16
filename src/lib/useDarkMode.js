import { useEffect, useState } from 'react';
import Script from 'next/script';

const DARK_MODE_KEY = 'blog-theme';
const LIGHT_MODE_CLASS_NAME = 'light';
const DARK_MODE_CLASS_NAME = 'dark';

const isSystemDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const switchDarkModeClasses = (classValue) => {
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
  if (!documentDiv.classList.contains('transition')) {
    documentDiv.classList.add('transition', 'ease-in', 'duration-200');
  }
};

export const useToggleDarkMode = () => {
  const [shouldToggle, setToggle] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    ~(() => {
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        return root.classList.contains(DARK_MODE_CLASS_NAME);
      } else {
        return false;
      }
    })()
  );

  useEffect(() => {
    // if init mode avoid switching themes
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

  return [
    () => {
      setToggle((prev) => !prev);
    },
    isDarkMode,
  ];
};

export const useDarkMode = () => {
  useEffect(() => {
    const storageEvent = (event) => {
      const { newValue } = event;
      if (![DARK_MODE_CLASS_NAME, LIGHT_MODE_CLASS_NAME].includes(newValue)) {
        const newMode = isSystemDarkMode()
          ? DARK_MODE_CLASS_NAME
          : LIGHT_MODE_CLASS_NAME;
        window.localStorage.setItem(DARK_MODE_KEY, newMode);
        switchDarkModeClasses(newMode);
      } else {
        switchDarkModeClasses(newValue);
      }
    };
    window.addEventListener('storage', storageEvent);

    setupTransitionClass();
    return () => window.removeEventListener('storage', storageEvent);
  }, []);
};

const initDarkMode = () => `
  const darkMode = localStorage.getItem('blog-theme');
  const root = document.documentElement;
  const isUserPrefDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    .matches;
  
  if(['dark', 'light'].includes(darkMode)){
    root.classList.add(darkMode);
  } else {
    root.classList.add(isUserPrefDarkMode ? 'dark' : 'light');
  }
`;

export const DarkModeInitializerScript = () => {
  return (
    <Script
      id={'dark-mode-initializer'}
      strategy="beforeInteractive"
      src={`data:text/javascript;base64,${Buffer.from(initDarkMode()).toString(
        'base64'
      )}`}
    />
  );
};
