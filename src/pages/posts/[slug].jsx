import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getSlugs, postFromSlug } from '@/lib/postsApi';
import { H1, H2, P, Small } from '@/atoms/Typography';
import Image from 'next/image';
import * as React from 'react';
import { SyntaxHighLight } from '@/atoms/SyntaxHighLight';
import { getViewCount } from '@/lib/viewCount';
import { BlockQuote } from '@/atoms/BlockQuote';

const MDX_H1 = ({ children, ...rest }) => (
  <H1 {...rest} className="bg-red-500">
    {children}
  </H1>
);
const MDX_H2 = ({ children, ...rest }) => (
  <H2 {...rest} className="my-12 max-w-readable">
    {children}
  </H2>
);

const MDX_P = ({ children, ...rest }) => (
  <P {...rest} className="max-w-readable leading-8 ">
    {children}
  </P>
);

const components = {
  H1: MDX_H1,
  H2: MDX_H2,
  P: MDX_P,
  p: MDX_P,
  Small,
  BlockQuote,
  code: ({ children, className }) => {
    return className ? (
      <SyntaxHighLight className={className}>{children}</SyntaxHighLight>
    ) : (
      <code className="language-text">{children}</code>
    );
  },
  pre: ({ children }) => {
    return <div className="mockup-code my-12">{children}</div>;
  },
};

export default function Post({ source, meta }) {
  return (
    <div className="flex flex-1 flex-col min-w-full">
      <Image
        style={{
          objectFit: 'contain',
        }}
        src={meta.image}
        quality="85"
        loading="lazy"
        className={'rounded-2xl my-20'}
        width={899}
        height={420}
        alt="enso with his cat"
      />
      <H1 className="mb-12">{meta.title}</H1>

      <MDXRemote {...source} components={components} />
    </div>
  );
}
export async function getStaticPaths() {
  const slugs = getSlugs();

  // Generate the paths for each post
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  // Return the paths and fallback setting
  return {
    paths,
    fallback: false, // Can also be true or 'blocking'
  };
}
export async function getStaticProps({ params }) {
  const { content, meta } = postFromSlug(params.slug);
  const data = await getViewCount();
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      development: true,
    },
  });

  return {
    props: {
      source: mdxSource,
      meta,
    },
  };
}
