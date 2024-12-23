import Head from 'next/head';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';
import { BlogSummaryCard } from '@/organisms/BlogSummaryCard';
import { getAllPosts } from '@/lib/postsApi';
import Link from 'next/link';

import { H1, P } from '@/atoms/Typography';
import { AboutImage } from '@/molecules/AboutImage';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';
import { getViewCountForAllPosts } from '@/lib/viewCount';
export default function Home({ posts }) {
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
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12 mb-24">
          <AboutImage className="rounded-full aspect-square w-48 h-48" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6">Hi, I'm Enso.</h1>
            <p className="text-xl text-muted-foreground mb-4">
              I build things and enjoy programming, designing, console logging,
              and all things outside!
            </p>
            <p className="text-lg">
              Currently making the{' '}
              <Link
                href="https://uva.me"
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
        <ul className={'mb-9'}>
          {posts.map((post) => {
            return (
              <BlogSummaryCard
                key={post.meta.title}
                meta={post.meta}
                slug={post.slug}
                views={post.views}
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
