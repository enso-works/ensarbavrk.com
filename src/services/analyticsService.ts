import { publicClient } from '@/lib/supabaseClient';
import { getPrivateClient } from '@/lib/supabaseClient';

export const analyticsService = {
  async getViewCount(slug: string) {
    const { data } = await publicClient
      .from('analytics')
      .select('views')
      .eq('slug', slug);

    return data ?? [];
  },

  async getViewCountForAllPosts() {
    const { data } = await publicClient
      .from('analytics')
      .select('views, slug, updated_at');

    return data;
  },

  async incrementViews(pageSlug: string) {
    return await getPrivateClient().rpc('increment_views', {
      page_slug: pageSlug,
    });
  }
};