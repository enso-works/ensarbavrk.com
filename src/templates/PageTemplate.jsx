import * as React from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';
import style from './PageTemplate.module.scss';
import { CommandPalette } from '@/molecules/CommandPalette';

export const PageTemplate = ({ children }) => {
  return (
    <main className={style.container}>
      <CommandPalette />
      <NavBar />
      {children}
      {/* Footer */}
    </main>
  );
};
