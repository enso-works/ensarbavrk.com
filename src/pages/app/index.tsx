import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/AuthContext';

export default function RedirectHandler() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/app/dashboard');
      } else {
        router.replace('/app/login');
      }
    }
  }, [user, loading, router]);

  return null; // No UI needed
}
