import { publicClient } from '@/lib/supabaseClient';

export const commentService = {
  async fetchComments(postSlug: string) {
    const { data, error } = await publicClient
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        profiles:user_id (id, username, avatar_url)
      `)
      .eq('post_slug', postSlug)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createComment(content: string, postSlug: string, userId: string) {
    const { data, error } = await publicClient
      .from('comments')
      .insert({
        content,
        post_slug: postSlug,
        user_id: userId,
      })
      .select(`
        id,
        content,
        created_at,
        profiles:user_id (id, username, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  subscribeToComments(postSlug: string, callback: () => void) {
    return publicClient
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_slug=eq.${postSlug}`,
        },
        callback
      )
      .subscribe();
  }
};