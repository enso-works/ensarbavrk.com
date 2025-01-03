import Head from 'next/head';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';
import { getAllPosts, Post } from '@/lib/postsApi';
import Link from 'next/link';

import { AboutImage } from '@/molecules/AboutImage';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';
import { getViewCountForAllPosts } from '@/lib/viewCount';
import { BlogSummaryCardV2 } from '@/organisms/BlogSummaryCard';
import { PostWithViews } from '@/lib/postsApi';

export default function Home({ posts }: { posts: PostWithViews[] }) {
  useGoogleAnalytics();
  return (
    <div>
      <Head>
        <title>Enso&apos;s digital garden</title>
        <meta name="description" content="Ensar Bavrk Enso blog. Brain dump." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <AboutImage className="rounded-full aspect-square w-48 h-48 md:mb-0 mb-6" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6">Hi, I'm Enso.</h1>
            <p className="text-xl text-muted-foreground mb-4">
              I build things and enjoy programming, designing, console logging,
              and all things outside!
            </p>
            <p className="text-lg">
              Currently making the{' '}
              <Link
                href="https://uva.me/"
                className="text-sky-500 hover:text-sky-600 transition-colors">
                @uva.me
              </Link>{' '}
              app!
            </p>
          </div>
        </div>
      </div>

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
