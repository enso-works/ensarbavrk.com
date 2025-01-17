import { ThumbsUp, Heart, Laugh } from 'lucide-react';
import { useState, useEffect } from 'react';
import { publicClient } from '@/lib/supabaseClient';
import Cookies from 'js-cookie';
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
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [animatingReaction, setAnimatingReaction] = useState<string | null>(
    null
  );

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
      const { data: reactionCounts } = await publicClient
        .from('reactions')
        .select('reaction_type')
        .eq('slug', slug);

      const counts = {
        like: 0,
        love: 0,
        laugh: 0,
      };

      if (reactionCounts) {
        reactionCounts.forEach((item) => {
          const type = item.reaction_type as keyof typeof counts;
          if (counts[type] !== undefined) {
            counts[type]++;
          }
        });
      }

      setReactions(counts);
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  // Generate or get client identifier
  useEffect(() => {
    let clientId = Cookies.get('reaction_client_id');
    if (!clientId) {
      clientId = crypto.randomUUID();
      Cookies.set('reaction_client_id', clientId, { expires: 365 });
    }

    // Load user's previous reactions
    loadUserReactions(clientId);
  }, [slug]);

  const loadUserReactions = async (clientId: string) => {
    const { data } = await publicClient
      .from('reactions')
      .select('reaction_type')
      .eq('slug', slug)
      .eq('client_identifier', clientId);

    if (data) {
      setUserReactions(new Set(data.map((r) => r.reaction_type)));
    }
  };

  const handleReaction = async (reactionType: string) => {
    const clientId = Cookies.get('reaction_client_id');
    if (!clientId) return;

    try {
      setAnimatingReaction(reactionType);
      
      if (userReactions.has(reactionType)) {
        // Optimistically update the UI
        setReactions(prev => ({
          ...prev,
          [reactionType]: Math.max(0, prev[reactionType] - 1)
        }));
        setUserReactions(prev => {
          const next = new Set(prev);
          next.delete(reactionType);
          return next;
        });

        // Then update the server
        await publicClient.from('reactions').delete().match({
          client_identifier: clientId,
          slug,
          reaction_type: reactionType,
        });
      } else {
        // Optimistically update the UI
        setReactions(prev => ({
          ...prev,
          [reactionType]: prev[reactionType] + 1
        }));
        setUserReactions(prev => {
          const next = new Set(prev);
          next.add(reactionType);
          return next;
        });

        // Then update the server
        await publicClient.from('reactions').insert({
          client_identifier: clientId,
          slug,
          reaction_type: reactionType,
        });
      }

      // Fetch the latest counts to ensure consistency
      fetchReactions();
    } catch (error) {
      console.error('Error handling reaction:', error);
      // Revert optimistic updates on error
      fetchReactions();
      setUserReactions(prev => {
        const next = new Set(prev);
        if (next.has(reactionType)) {
          next.delete(reactionType);
        } else {
          next.add(reactionType);
        }
        return next;
      });
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
          active={userReactions.has('like')}
          isAnimating={animatingReaction === 'like'}
          label="Like"
        />
        <ReactionButton
          icon={<Heart className="w-5 h-5" />}
          count={reactions.love}
          onClick={() => handleReaction('love')}
          active={userReactions.has('love')}
          isAnimating={animatingReaction === 'love'}
          label="Love"
        />
        <ReactionButton
          icon={<Laugh className="w-5 h-5" />}
          count={reactions.laugh}
          onClick={() => handleReaction('laugh')}
          active={userReactions.has('laugh')}
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
  active: boolean;
  isAnimating: boolean;
  label: string;
}

function ReactionButton({
  icon,
  count,
  onClick,
  active,
  isAnimating,
  label,
}: ReactionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group flex flex-col items-center gap-1 p-3 rounded-xl transition-colors relative
        ${
          active
            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
        }`}
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
