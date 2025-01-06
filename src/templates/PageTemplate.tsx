import * as React from 'react';
import { useEffect } from 'react';
import { NavBar } from '@/organisms/nav-bar/NavBar';
import { Footer } from '@/molecules/Footer';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const publicRoutes = ['/login', '/register', '/forgot-password'];

interface PageTemplateProps extends React.PropsWithChildren {
  requireAuth?: boolean;
}

export const PageTemplate = ({
  children,
  requireAuth = false,
}: PageTemplateProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Only run checks after auth is initialized
      // Redirect to login if accessing protected route without auth
      if (requireAuth && !user) {
        router.replace('/login');
        return;
      }

      // Redirect to dashboard if accessing auth pages while logged in
      if (user && publicRoutes.includes(router.pathname)) {
        router.replace('/dashboard');
        return;
      }
    }
  }, [user, loading, router, requireAuth]);

  // Show nothing while redirecting or checking auth
  if (
    loading ||
    (user && publicRoutes.includes(router.pathname)) ||
    (!user && requireAuth)
  ) {
    return null;
  }

  // Don't render nav/footer on auth pages
  const isAuthPage = publicRoutes.includes(router.pathname);

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
