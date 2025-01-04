import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getSlugs, postFromSlug, PostWithViews } from '@/lib/postsApi';
import { H1 } from '@/atoms/Typography';
import Image from 'next/image';
import * as React from 'react';
import { getViewCount } from '@/lib/viewCount';
import { components } from '@/atoms/Typography';
import { PostMeta } from '@/molecules/PostMeta';

interface PostProps {
  source: any;
  postWithViews: PostWithViews;
}

export default function Post({ source, postWithViews }: PostProps) {
  return (
    <div className="flex flex-1 flex-col min-w-full items-center">
      <div className="flex flex-col justify-center max-w-[50rem]">
        <Image
          style={{
            objectFit: 'contain',
          }}
          src={postWithViews.meta.image}
          quality="85"
          loading="lazy"
          className={'rounded-2xl mt-20 mb-6'}
          width={899}
          height={420}
          alt="enso with his cat"
        />
        <PostMeta postWithViews={postWithViews} />
        <article className="max-w-[680px] mx-auto px-4 py-12">
          <H1 className="mb-4">{postWithViews.meta.title}</H1>
          <MDXRemote {...source} components={components} />
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
    },
  };
}
