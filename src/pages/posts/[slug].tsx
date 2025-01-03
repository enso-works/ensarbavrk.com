import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getSlugs, postFromSlug, PostWithViews } from '@/lib/postsApi';
import { H1, H2, P, Small } from '@/atoms/Typography';
import Image from 'next/image';
import * as React from 'react';
import { SyntaxHighLight } from '@/atoms/SyntaxHighLight';
import { getViewCount } from '@/lib/viewCount';
import { BlockQuote } from '@/atoms/BlockQuote';
import { Eye } from 'lucide-react';
import { Clock } from 'lucide-react';
import { CalendarDays } from 'lucide-react';

interface MDXComponentProps {
  children: React.ReactNode;
  [key: string]: any;
}

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

interface PreProps {
  children: React.ReactNode;
}

const MDX_H1 = ({ children, ...rest }: MDXComponentProps) => (
  <H1 {...rest} className="bg-red-500">
    {children}
  </H1>
);

const MDX_H2 = ({ children, ...rest }: MDXComponentProps) => {
  return (
    <H2 {...rest} className="my-12 max-w-readable">
      {React.isValidElement(children) ? children.props.children : children}
    </H2>
  );
};

const MDX_P = ({ children, ...rest }: MDXComponentProps) => (
  <P {...rest} className="max-w-readable leading-8 ">
    {children}
  </P>
);

const MDX_Code = ({ children, className }: CodeProps) => {
  return className ? (
    <SyntaxHighLight className={className}>{children}</SyntaxHighLight>
  ) : (
    <code className="language-text">{children}</code>
  );
};

const MDX_Pre = ({ children }: PreProps) => {
  return <div className="mockup-code my-12">{children}</div>;
};

const components = {
  H1: MDX_H1,
  h1: MDX_H1,
  H2: MDX_H2,
  h2: MDX_H2,
  MDX_H2,
  P: MDX_P,
  p: MDX_P,
  Small,
  BlockQuote,
  code: MDX_Code,
  pre: MDX_Pre,
};

interface PostProps {
  source: any;
  postWithViews: PostWithViews;
}

export default function Post({ source, postWithViews }: PostProps) {
  return (
    <div className="flex flex-1 flex-col min-w-full">
      <Image
        style={{
          objectFit: 'contain',
        }}
        src={postWithViews.meta.image}
        quality="85"
        loading="lazy"
        className={'rounded-2xl my-20'}
        width={899}
        height={420}
        alt="enso with his cat"
      />

      <H1 className="mb-4">{postWithViews.meta.title}</H1>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-12">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>{postWithViews.meta.publishedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{postWithViews.readingTime.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{postWithViews.views.views.toLocaleString()} views</span>
        </div>
      </div>

      <MDXRemote {...source} components={components} />
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
