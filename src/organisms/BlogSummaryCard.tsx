import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';
import Link from 'next/link';
import { PostWithViews } from '@/lib/postsApi';
import { PostMeta } from '@/molecules/PostMeta';

interface BlogSummaryCardV2Props {
  post: PostWithViews;
  navLink?: string;
}

export const BlogSummaryCardV2: React.FC<BlogSummaryCardV2Props> = ({
  post,
  navLink
}: BlogSummaryCardV2Props) =>{
  const href =  navLink ? navLink: `/posts/${post.slug}`
  return(
  <Link
    key={post.slug}
    href={href}
    className="group block mb-8">
    <article className="overflow-hidden rounded-xl bg-card transition-all hover:shadow-lg p-8">
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <PostMeta postWithViews={post} />
      </div>
      <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
        {post.meta.title}
      </h3>
      <p className="text-muted-foreground">{post.meta.summary}</p>
    </article>
  </Link>
)}

export const BlogSummaryCard: React.FC<BlogSummaryCardV2Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <li
        key={post.meta.title}
        className={
          'bg-base-100 mb-8 sm:flex-row flex-col-reverse my-12 hover:shadow-lg transition-shadow'
        }>
        <div className="card-body py-0 px-0 sm:mt-0 mt-6">
          <Small className="text-textSecondary">{post.meta.publishedAt}</Small>
          <H2 className="card-title font-bold">{post.meta.title}</H2>
          <P className="my-4 text-textSecondary">{post.meta.summary}</P>
          <div className="mb-1 flex">
            <Small className="flex-grow-0 mr-4">{post.readingTime.time}</Small>
            <View views={post.views.views} />
          </div>
        </div>
        <Image
          style={{
            objectFit: 'cover',
            height: '220px',
            minWidth: '220px',
          }}
          className="sm:w-60 w-full sm:rounded-r-xl rounded-xl sm:rounded-l-none"
          src={post.meta.image}
          alt={post.meta.alt || ''}
          width={120}
          height={120}
        />
      </li>
    </Link>
  );
};

interface ViewProps {
  className?: string;
  views: number;
}

const View: React.FC<ViewProps> = ({ className = 'flex-grow-0', views }) => {
  return (
    <Small className={className}>
      {views < 2 ? `${views} view` : `${views} views`}
    </Small>
  );
};
