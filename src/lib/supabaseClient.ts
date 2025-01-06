import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Public client for auth and regular operations
export const publicClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Private client creator function - only create when needed
export const createPrivateClient = () => {
  if (!supabaseServiceKey) {
    throw new Error('Missing Supabase service role key');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};

// Optional: If you need a singleton private client for server-side operations
export const getPrivateClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Private client should only be used on the server side');
  }
  return createPrivateClient();
};
