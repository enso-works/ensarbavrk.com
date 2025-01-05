import * as React from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';
import { Footer } from '@/molecules/Footer';

export const PageTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-1 min-w-full flex-col items-center">
      <main className="max-w-[40.5rem] w-full justify-center min-h-screen p-8 max-sm:p-2">
        <NavBar />
        {children}
      </main>
      <Footer />
    </div>
  );
};
