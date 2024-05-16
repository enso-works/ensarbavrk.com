import Head from 'next/head';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';
import { BlogSummaryCard } from '@/organisms/BlogSummaryCard';
import { getAllPosts } from '@/lib/postsApi';

import { H1, P } from '@/atoms/Typography';
import { AboutImage } from '@/molecules/AboutImage';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';
export default function Home({ posts }) {
  useGoogleAnalytics();
  return (
    <div>
      <Head>
        <title>Enso&apos;s digital garden</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero bg-base-200 mt-9">
        <div className="hero-content flex-col lg:flex-row lg:gap-8 sm:gap-0">
          <div className="w-fit mask sm:mask-squircle mask-circle">
            <AboutImage />
          </div>
          <div>
            <H1 className="text-5xl font-bold mb-4 lg:text-left text-center">
              Hi, I&apos;m <span className={'text-primary'}>Enso.</span>
            </H1>
            <P className="text-textSecondary lg:text-left text-center">
              I build things and enjoy programming, designing, console logging,
              and all things outside!{' '}
              <span className="block">
                Currently making the{' '}
                <a href="https://uva.me/" className="text-primary mr-1">
                  @uva.me
                </a>
                app!
              </span>
            </P>
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
  return {
    props: {
      posts,
    },
  };
}
