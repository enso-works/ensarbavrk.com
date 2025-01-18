import { ThumbsUp, Heart, Laugh } from 'lucide-react';
import { useState, useEffect } from 'react';
import { publicClient } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactionColumnProps {
  slug: string;
  reactions: {
    like: number;
    love: number;
    laugh: number;
  };
}

export function ReactionColumn({
  slug,
  reactions: initialReactions,
}: ReactionColumnProps) {
  const [reactions, setReactions] = useState(initialReactions);
  const [animatingReaction, setAnimatingReaction] = useState<string | null>(null);

  // Set up real-time subscription for reactions
  useEffect(() => {
    const channel = publicClient
      .channel('reactions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
          filter: `slug=eq.${slug}`,
        },
        () => {
          fetchReactions();
        }
      )
      .subscribe();

    return () => {
      publicClient.removeChannel(channel);
    };
  }, [slug]);

  // Update reactions when initialReactions changes
  useEffect(() => {
    setReactions(initialReactions);
  }, [initialReactions]);

  const fetchReactions = async () => {
    try {
      const { data } = await publicClient
        .from('reactions')
        .select('like_count, love_count, laugh_count')
        .eq('slug', slug)
        .single();

      if (data) {
        setReactions({
          like: data.like_count,
          love: data.love_count,
          laugh: data.laugh_count,
        });
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  const handleReaction = async (reactionType: 'like' | 'love' | 'laugh') => {
    try {
      setAnimatingReaction(reactionType);
      
      // Optimistically update UI
      setReactions(prev => ({
        ...prev,
        [reactionType]: prev[reactionType] + 1
      }));

      // Update the server
      const columnName = `${reactionType}_count`;
      const { error } = await publicClient.rpc('increment_reaction', {
        post_slug: slug,
        reaction_column: columnName
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error handling reaction:', error);
      // Revert optimistic update on error
      fetchReactions();
    } finally {
      setTimeout(() => setAnimatingReaction(null), 1000);
    }
  };

  return (
    <div className="mt-8 mb-4">
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
        Reactions
      </h3>
      <div className="flex flex-row gap-6 items-center justify-center p-4">
        <ReactionButton
          icon={<ThumbsUp className="w-5 h-5" />}
          count={reactions.like}
          onClick={() => handleReaction('like')}
          isAnimating={animatingReaction === 'like'}
          label="Like"
        />
        <ReactionButton
          icon={<Heart className="w-5 h-5" />}
          count={reactions.love}
          onClick={() => handleReaction('love')}
          isAnimating={animatingReaction === 'love'}
          label="Love"
        />
        <ReactionButton
          icon={<Laugh className="w-5 h-5" />}
          count={reactions.laugh}
          onClick={() => handleReaction('laugh')}
          isAnimating={animatingReaction === 'laugh'}
          label="Laugh"
        />
      </div>
    </div>
  );
}

interface ReactionButtonProps {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
  isAnimating: boolean;
  label: string;
}

function ReactionButton({
  icon,
  count,
  onClick,
  isAnimating,
  label,
}: ReactionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group flex flex-col items-center gap-1 p-3 rounded-xl transition-colors relative
        text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-100 dark:bg-blue-900/50"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <div className="relative">
        <motion.div
          animate={isAnimating ? { y: [-20, 0], scale: [1.2, 1] } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          {icon}
        </motion.div>
      </div>
      <motion.span
        className="text-sm font-medium"
        animate={isAnimating ? { scale: [1.2, 1] } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
        {count}
      </motion.span>
      <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
        {label}
      </span>
    </motion.button>
  );
}
