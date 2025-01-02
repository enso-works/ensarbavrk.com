import { publicClient } from '@/lib/supabaseClient';
import { log } from 'console';

export const getViewCount = async (slug: string) => {
  const { data, error } = await publicClient
    .from('analytics')
    .select('views')
    .eq('slug', slug);

  return data;
};

export const getViewCountForAllPosts = async (slug: string) => {
  const { data, error } = await publicClient
    .from('analytics')
    .select('views, slug, updated_at');

  return data;
};
