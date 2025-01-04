import * as React from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';

export const PageTemplate = ({ children }) => {
  return (
    <div className="flex flex-1 min-w-full flex-col items-center">
      <main className="max-w-[60rem] w-full justify-center min-h-screen m-8 sm:m-2">
        <NavBar />
        {children}
      </main>
      <div className="bg-primary min-w-full h-1"></div>
    </div>
  );
};
