import * as React from 'react';
import { IF_Else } from '@/atoms/Conditionals';
import { Command } from '@/atoms/command/Command';
import { MoonIcon, Signature, SunIcon } from '@/atoms/icons';
import { useToggleDarkMode } from '@/lib/useDarkMode';
import styles from './Navbar.module.scss';

export const NavBar = () => {
  const [toggle, isDarkMode] = useToggleDarkMode();

  return (
    <nav className={styles.navbar}>
      <div className={styles.signature}>
        <Command.Link pathTo={'/'}>
          <Signature />
        </Command.Link>
      </div>
      <Command.Button className={styles.button} onClick={() => toggle()}>
        <IF_Else predicate={isDarkMode}>
          <MoonIcon />
          <SunIcon />
        </IF_Else>
      </Command.Button>
    </nav>
  );
};
