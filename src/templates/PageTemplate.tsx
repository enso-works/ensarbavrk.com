import * as React from 'react';
import { useEffect } from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';
import { Footer } from '@/organisms/Footer';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Sidebar } from '@/organisms/Sidebar';
import { AppHeader } from '@/organisms/AppHeader';

const publicRoutes = ['/login', '/register', '/forgot-password'];
const appRoutes = ['/dashboard'];

interface PageTemplateProps extends React.PropsWithChildren {}

const AppTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export const PageTemplate = ({ children }: PageTemplateProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user && publicRoutes.includes(router.pathname)) {
        router.replace('/dashboard');
        return;
      }
    }
  }, [user, loading, router]);

  if (loading || (user && publicRoutes.includes(router.pathname))) {
    return null;
  }

  const isAuthPage = publicRoutes.includes(router.pathname);

  if (appRoutes.includes(router.pathname)) {
    return <AppTemplate>{children}</AppTemplate>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <main
        className={classNames(
          { 'min-h-screen': isAuthPage },
          'max-w-[40.5rem] w-full justify-center p-8 max-sm:p-2'
        )}>
        <NavBar />
        {children}
      </main>
      <Footer />
    </div>
  );
};
