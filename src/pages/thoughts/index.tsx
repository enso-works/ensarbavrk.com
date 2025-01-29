import Head from 'next/head';
import { getAllPosts, PostWithViews } from '@/lib/postsApi';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';
import { getViewCountForAllPosts } from '@/lib/viewCount';
import { BlogSummaryCardV2 } from '@/organisms/BlogSummaryCard';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';

export default function FreeThoughts({ posts }: { posts: PostWithViews[] }) {
  return (
    <div>
      <Head>
        <title>💭 Free Thoughts - Enso&apos;s digital garden</title>
        <meta
          name="description"
          content="A stream of consciousness, random ideas, and unfiltered thoughts from Enso's mind to yours."
        />
        <meta
          property="og:title"
          content="💭 Free Thoughts - Enso's digital garden"
        />
        <meta
          property="og:description"
          content="A stream of consciousness, random ideas, and unfiltered thoughts from Enso's mind to yours."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="relative mb-16">
          <div className="relative  dark:bg-gray-900 flex items-top justify-start space-x-6 p-8">
            <div className="space-y-4">
              <BlogPageHeading firstLine="Free" secondLine="Thoughts" />
              <p className="text-muted-foreground text-lg">
                A collection of unfiltered thoughts and ideas.
                <span className="block mt-2 text-sm">
                  No structure, no rules - unfiltered thoughts.
                </span>
              </p>
            </div>
          </div>
        </div>

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
  const posts = getAllPosts('./src/content/thoughts');
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
