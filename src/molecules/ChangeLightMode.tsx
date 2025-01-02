import styles from '@/organisms/nav-bar/Navbar.module.scss';
import { IF_Else } from '@/atoms/Conditionals';
import { MoonIcon, SunIcon } from '@/atoms/icons';
import { Command } from '@/atoms/command/Command';
import * as React from 'react';
import { useToggleDarkMode } from '@/lib/useDarkMode';

export const ChangeLightMode = () => {
  const { toggle } = useToggleDarkMode();

  return (
    <Command.Button className={styles.button} onClick={toggle}>
      <label className="swap swap-rotate">
        <input type="checkbox" onClick={toggle} />
        <MoonIcon className="swap-on" />
        <SunIcon className="swap-off" />
      </label>
    </Command.Button>
  );
};
