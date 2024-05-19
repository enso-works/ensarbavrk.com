import { publicClient } from '@/lib/supabaseClient';

export const getViewCount = async (slug) => {
  const { data, error } = await publicClient
    .from('analytics')
    .select('views')
    .eq('slug', slug);

  return data;
};

export const getViewCountForAllPosts = async (slug) => {
  const { data, error } = await publicClient
    .from('analytics')
    .select('views, slug, updated_at');

  return data;
};
