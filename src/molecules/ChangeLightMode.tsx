import styles from '@/organisms/nav-bar/Navbar.module.scss';
import { MoonIcon, SunIcon } from '@/atoms/icons';
import { Command } from '@/atoms/command/Command';
import * as React from 'react';
import { useToggleDarkMode } from '@/lib/useDarkMode';
import { useState, useEffect } from 'react';

export const ChangeLightMode = () => {
  const { toggle, isDarkMode } = useToggleDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }

  return (
    <Command.Button className={styles.button} onClick={toggle}>
      <label className="swap swap-rotate">
        <input type="checkbox" checked={isDarkMode} onChange={toggle} />
        <MoonIcon className={mounted ? 'swap-off' : 'swap-on'} />
        <SunIcon className={mounted ? 'swap-on' : 'swap-off'} />
      </label>
    </Command.Button>
  );
};
