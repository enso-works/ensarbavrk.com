import * as React from 'react';
import { IF_Else } from '@/atoms/Conditionals';
import { Command } from '@/atoms/command/Command';
import { CommandIcon, MoonIcon, Signature, SunIcon } from '@/atoms/icons';
import { useToggleDarkMode } from '@/lib/useDarkMode';
import styles from './Navbar.module.scss';
import { useContext } from 'react';
import { CommandEventTypes, KeyboardEventContext } from '@/lib/keyboardService';

export const NavBar = () => {
  const [toggle, isDarkMode] = useToggleDarkMode();
  const { resetKeyPress } = useContext(KeyboardEventContext);

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
          <IF_Else predicate={isDarkMode}>
            <SunIcon />
            <MoonIcon />
          </IF_Else>
        </Command.ButtonInList>
        <Command.ButtonInList
          onClick={() => {
            resetKeyPress(CommandEventTypes.COMMAND_PLATE_OPEN_PRESS);
          }}>
          <CommandIcon />
        </Command.ButtonInList>
      </ul>
    </nav>
  );
};
