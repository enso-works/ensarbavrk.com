import Head from 'next/head';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';
import { getAllPosts, PostWithViews } from '@/lib/postsApi';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';
import { getViewCountForAllPosts } from '@/lib/viewCount';
import { BlogSummaryCardV2 } from '@/organisms/BlogSummaryCard';

export default function FreeThoughts({ posts }: { posts: PostWithViews[] }) {
  useGoogleAnalytics();
  return (
    <div>
      <Head>
        <title>Free Thoughts - Enso&apos;s digital garden</title>
        <meta name="description" content="Unfiltered thoughts and musings from Enso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Free Thoughts</h1>
        <p className="text-muted-foreground mb-12">
          A collection of unfiltered thoughts, ideas, and musings.
        </p>

        <ul className="mb-9">
          {posts.map((post) => (
            <BlogSummaryCardV2 key={post.meta.title} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts('thoughts'); // We'll add this parameter to getAllPosts
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