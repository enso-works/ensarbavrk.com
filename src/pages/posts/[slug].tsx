import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getSlugs, postFromSlug, PostWithViews } from '@/lib/postsApi';
import { H1 } from '@/atoms/Typography';
import Image from 'next/image';
import * as React from 'react';
import { getViewCount } from '@/lib/viewCount';
import { components } from '@/atoms/Typography';
import { PostMeta } from '@/molecules/PostMeta';
import { ReactionColumn } from '@/molecules/ReactionColumn';
import { publicClient, getPrivateClient } from '@/lib/supabaseClient';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'react-hot-toast';
import { CommunityComment } from '@/organisms/CommunityComment';

interface PostProps {
  source: any;
  postWithViews: PostWithViews;
  initialReactions: ReactionCounts;
}

interface ReactionCounts {
  like: number;
  love: number;
  laugh: number;
}

export default function Post({
  source,
  postWithViews,
  initialReactions,
}: PostProps) {
  const [reactions, setReactions] =
    React.useState<ReactionCounts>(initialReactions);

  React.useEffect(() => {
    // Set up real-time subscription for reactions
    const channel = publicClient
      .channel('reactions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
          filter: `slug=eq.${postWithViews.slug}`,
        },
        () => {
          fetchReactions();
        }
      )
      .subscribe();

    return () => {
      publicClient.removeChannel(channel);
    };
  }, [postWithViews.slug]);

  const fetchReactions = async () => {
    try {
      const { data } = await publicClient
        .from('reactions')
        .select('like_count, love_count, laugh_count')
        .eq('slug', postWithViews.slug)
        .single();

      if (data) {
        setReactions({
          like: data.like_count ?? 0,
          love: data.love_count ?? 0,
          laugh: data.laugh_count ?? 0,
        });
      } else {
        setReactions({
          like: 0,
          love: 0,
          laugh: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };


  return (
    <div className="flex flex-1 flex-col min-w-full items-center">
      <div className="flex flex-row justify-center max-w-[65rem] gap-8">
        <article className="max-w-[680px] w-full mx-auto px-4 pb-12 pt-24">
          <H1 className="mb-4">{postWithViews.meta.title}</H1>
          <PostMeta postWithViews={postWithViews} />
          <div className="py-4 mb-6">
            <Image
              style={{
                objectFit: 'contain',
              }}
              src={postWithViews.meta.image}
              quality="85"
              loading="lazy"
              className="rounded-2xl"
              width={899}
              height={420}
              alt="enso with his cat"
            />
          </div>
          <MDXRemote {...source} components={components} />
          <ReactionColumn slug={postWithViews.slug} reactions={reactions} />
          <CommunityComment />
        </article>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = getSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = postFromSlug(params.slug);
  const data = await getViewCount(`/posts/${params.slug}`);
  const postWithViews = { ...post, views: { views: data[0]?.views } };

  const supabase = getPrivateClient();

  // Fetch initial reaction counts
  const { data: reactionData } = await supabase
    .from('reactions')
    .select('like_count, love_count, laugh_count')
    .eq('slug', params.slug)
    .single();

  const initialReactions: ReactionCounts = {
    like: reactionData?.like_count ?? 0,
    love: reactionData?.love_count ?? 0,
    laugh: reactionData?.laugh_count ?? 0,
  };

  const mdxSource = await serialize(post.content, {
    parseFrontmatter: true,
    mdxOptions: {
      development: true,
    },
  });

  return {
    props: {
      source: mdxSource,
      postWithViews,
      initialReactions,
    },
  };
}
