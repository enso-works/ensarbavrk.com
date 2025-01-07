import { useEffect, useState } from 'react';

const DARK_MODE_KEY = 'blog-theme';
const LIGHT_MODE_CLASS_NAME = 'light';
const DARK_MODE_CLASS_NAME = 'dark';

const switchDarkModeClasses = (classValue: string) => {
  if (typeof window === 'undefined') return;

  if (![DARK_MODE_CLASS_NAME, LIGHT_MODE_CLASS_NAME].includes(classValue)) {
    console.error('Invalid class value provided:', classValue);
    return;
  }

  const root = window.document.documentElement;
  const classToRemove =
    classValue === DARK_MODE_CLASS_NAME
      ? LIGHT_MODE_CLASS_NAME
      : DARK_MODE_CLASS_NAME;

  try {
    if (root.classList.contains(classToRemove)) {
      root.classList.remove(classToRemove);
    }

    if (!root.classList.contains(classValue)) {
      root.classList.add(classValue);
    }

    root.style.setProperty('color-scheme', classValue);
    localStorage.setItem(DARK_MODE_KEY, classValue);
  } catch (error) {
    console.error('Error switching dark mode classes:', error);
  }
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
    setupTransitionClass();
  }, []);
};
