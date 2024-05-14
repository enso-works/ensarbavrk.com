import * as React from 'react';
import { Command } from '@/atoms/command/Command';
import { Signature } from '@/atoms/icons';
import styles from './Navbar.module.scss';
import { ChangeLightMode } from '@/molecules/ChangeLightMode';

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.signature}>
        <Command.Link pathTo={'/'}>
          <Signature />
        </Command.Link>
      </div>
      <ChangeLightMode />
    </nav>
  );
};
