import { useEffect } from 'react';
const systemMode = 'system';
const darkModeKey = 'dark-mode';
const lightModeClass = 'light';
const darkModeClass = 'dark';
const storageEvent = 'STORAGE_EVENT';

const switchDarkModeClasses = (classValue) => {
  const root = window.document.documentElement;
  root.classList.add(classValue);
  root.classList.remove(
    classValue === darkModeClass ? lightModeClass : darkModeClass
  );
};

const setupTransitionClass = (isDarkMode) => {
  const documentDiv = document.querySelector('#__next');
  if (
    !documentDiv.classList.contains('transition') &&
    isDarkMode !== systemMode
  ) {
    documentDiv.classList.add('transition', 'ease-in', 'duration-200');
  }
};

export const useToggleDarkMode = () => {
  return () => {
    const event = new Event(storageEvent);
    const darkMode = window.localStorage.getItem(darkModeKey);

    event.key = darkModeKey;
    event.value = darkMode;
    window.dispatchEvent(event);

    window.localStorage.setItem(
      darkModeKey,
      darkMode === darkModeClass ? lightModeClass : darkModeClass
    );
  };
};

export const useDarkMode = () => {
  useEffect(() => {
    // check if we heave transition class
    setupTransitionClass();
    //if we delete this key it should reset to the system
    const eventHandler = ({ kenewValue }) => {
      if (![darkModeClass, lightModeClass, systemMode].includes(kenewValue)) {
        window.localStorage.setItem(darkModeKey, systemMode);
      }

      if (kenewValue === systemMode) {
        const prefersDarkMode = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;

        window.localStorage.setItem(
          darkModeKey,
          prefersDarkMode ? darkModeClass : lightModeClass
        );
      }
    };
    //handler for user changed mode.
    window.addEventListener(
      storageEvent,
      ({ value }) => {
        switchDarkModeClasses(value);
      },
      false
    );
    window.addEventListener('storage', eventHandler);
    return () => window.removeEventListener('storage', eventHandler);
  }, []);
};
