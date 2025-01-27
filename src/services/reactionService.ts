import { publicClient } from '@/lib/supabaseClient';

export const reactionService = {
  async fetchReactions(slug: string) {
    const { data } = await publicClient
      .from('reactions')
      .select('like_count, love_count, laugh_count')
      .eq('slug', slug)
      .single();

    return data;
  },

  async incrementReaction(postSlug: string, reactionColumn: string) {
    const { error } = await publicClient.rpc('increment_reaction', {
      post_slug: postSlug,
      reaction_column: reactionColumn
    });

    if (error) throw error;
  },

  subscribeToReactions(slug: string, callback: () => void) {
    return publicClient
      .channel('reactions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
          filter: `slug=eq.${slug}`,
        },
        callback
      )
      .subscribe();
  }
};