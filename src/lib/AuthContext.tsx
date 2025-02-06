import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { publicClient } from './supabaseClient';
import { promiseDelay } from './utils';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Initialize with actual function stubs to prevent "not a function" errors
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {
    throw new Error('Not implemented');
  },
  signUp: async () => {
    throw new Error('Not implemented');
  },
  signOut: async () => {
    throw new Error('Not implemented');
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    const { error } = await publicClient.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    await promiseDelay(500);

    try {
      const { error } = await publicClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return 'Sign-in successful!';
    } catch (error: any) {
      throw new Error(`Sign-in failed: ${error.message}`);
    }
  };

  const signOut = async () => {
    const { error } = await publicClient.auth.signOut();
    if (error) throw error;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await publicClient.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);

        const {
          data: { subscription },
        } = publicClient.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
