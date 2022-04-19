import * as React from 'react';
import { getAllPosts } from '../../lib';
import Image from 'next/image';
import { BlogPageHeading } from '@/molecules/BlogPageHeading';
import { BlogSummaryCard } from '@/organisms/BlogSummaryCard';

export default function Index({ posts }) {
  return (
    <div>
      <BlogPageHeading />
      <ul>
        {posts.map((post) => {
          return <BlogSummaryCard key={post.meta.title} meta={post.meta} />;
        })}
      </ul>
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
