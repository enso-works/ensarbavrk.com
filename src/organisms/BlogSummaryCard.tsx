import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';
import Link from 'next/link';
import { CalendarDays, Clock, Eye } from 'lucide-react';
import { PostWithViews } from '@/lib/postsApi';

interface BlogSummaryCardV2Props {
  post: PostWithViews;
}

export const BlogSummaryCardV2: React.FC<BlogSummaryCardV2Props> = ({
  post,
}: BlogSummaryCardV2Props) => (
  <Link
    key={post.slug}
    href={`/posts/${post.slug}`}
    className="group block mb-8">
    <article className="overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg px-4 py-6">
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <Small className="text-textSecondary">{post.meta.publishedAt}</Small>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <Small className="text-textSecondary">{post.readingTime.time}</Small>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <View className="text-textSecondary" views={post.views.views} />
        </div>
      </div>
      <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
        {post.meta.title}
      </h3>
      <p className="text-muted-foreground">{post.meta.summary}</p>
    </article>
  </Link>
);

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
