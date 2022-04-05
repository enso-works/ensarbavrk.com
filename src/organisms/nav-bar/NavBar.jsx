import * as React from 'react';
import { Command } from '../../atoms';
import { CommandIcon, Signature, SunIcon } from '../../atoms/icons';
import styles from './Navbar.module.scss';
import { useDarkMode } from '../../lib/useDarkMode';

export const NavBar = () => {
  const [enabled, setEnabled] = useDarkMode();
  return (
    <nav className={styles.navbar}>
      <Command.Link pathTo={'/'}>
        <Signature />
      </Command.Link>
      <ul>
        <Command.LinkInList pathTo={'/'}>Home</Command.LinkInList>
        <Command.LinkInList pathTo={'/blog'}>Blog</Command.LinkInList>
        <Command.LinkInList pathTo={'/login'}>Login</Command.LinkInList>
        <Command.LinkInList pathTo={'/about'}>About</Command.LinkInList>
        <Command.ButtonInList
          onClick={() => {
            setEnabled(!enabled);
          }}>
          <SunIcon />
        </Command.ButtonInList>
        <Command.ButtonInList>
          <CommandIcon />
        </Command.ButtonInList>
      </ul>
    </nav>
  );
};
