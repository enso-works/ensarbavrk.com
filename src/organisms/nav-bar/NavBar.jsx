import * as React from 'react';
import { Command } from '../../atoms';
import { CommandIcon, MoonIcon, Signature, SunIcon } from '../../atoms/icons';
import styles from './Navbar.module.scss';
import { useToggleDarkMode } from '../../lib/useDarkMode';
import { useEffect, useState } from 'react';

export const NavBar = () => {
  const [toggle, isDarkMode] = useToggleDarkMode();

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
        <Command.ButtonInList onClick={() => toggle()}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </Command.ButtonInList>
        <Command.ButtonInList>
          <CommandIcon />
        </Command.ButtonInList>
      </ul>
    </nav>
  );
};
