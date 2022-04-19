import * as React from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';
import style from './PageTemplate.module.scss';

export const PageTemplate = ({ children }) => {
  return (
    <main className={style.container}>
      <NavBar />
      {children}
      {/* Footer */}
    </main>
  );
};
