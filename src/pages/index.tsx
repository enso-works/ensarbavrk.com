import Head from 'next/head';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';
import { getAllPosts, Post } from '@/lib/postsApi';
import Link from 'next/link';

import { AboutImage } from '@/molecules/AboutImage';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';
import { getViewCountForAllPosts } from '@/lib/viewCount';
import { BlogSummaryCardV2 } from '@/organisms/BlogSummaryCard';
import { PostWithViews } from '@/lib/postsApi';
import { BlogHero } from '@/organisms/BlogHero';

export default function Home({ posts }: { posts: PostWithViews[] }) {
  useGoogleAnalytics();
  return (
    <div>
      <Head>
        <title>Enso&apos;s digital garden</title>
        <meta name="description" content="Ensar Bavrk Enso blog. Brain dump." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogHero />

      

      <div className="mt-9">
        <BlogPageHeading />
        <ul className={'mb-9 '}>
          {posts.map((post) => {
            return (
              <BlogSummaryCardV2
                key={post.meta.title}
                post={post}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const data = await getViewCountForAllPosts();

  const mappedPosts = posts.map((post) => {
    const views = data?.length
      ? data.find((v) => v.slug.includes(post.slug))
      : { views: 0, slug: post.slug };
    return { ...post, views };
  });

  return {
    props: {
      posts: mappedPosts,
    },
  };
}
