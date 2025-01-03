import { publicClient } from '@/lib/supabaseClient';
import { log } from 'console';

export const getViewCount = async (
  slug: string
): Promise<{ views: number }[]> => {
  const { data } = await publicClient
    .from('analytics')
    .select('views')
    .eq('slug', slug);

  return data ?? [];
};

export const getViewCountForAllPosts = async () => {
  const { data } = await publicClient
    .from('analytics')
    .select('views, slug, updated_at');

  return data;
};
