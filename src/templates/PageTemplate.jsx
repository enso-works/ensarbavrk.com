import * as React from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';
import style from './PageTemplate.module.scss';

export const PageTemplate = ({ children }) => {
  return (
    <div className={style.container}>
      <main className={style.contentContainer}>
        <NavBar />
        {children}
      </main>
      <div className={style.footer}></div>
    </div>
  );
};
