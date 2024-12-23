import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';
import Link from 'next/link';
import { CalendarDays, Clock, Eye } from 'lucide-react';

interface Post {
  slug: string;
  date: string;
  readingTime: string;
  views: number;
  title: string;
  description: string;
}

interface Meta {
    title: string;
    summary: string;
    readingTime: string;
    image: string;
    alt?: string;
  }

interface BlogSummaryCardProps {
    meta: Meta;
    slug: string;
    views: {
      views: number;
    };
  }
  

export const BlogSummaryCardV2: React.FC<BlogSummaryCardProps> = ({ slug, meta, views }: BlogSummaryCardProps) => (
  <Link key={slug} href={`/posts/${slug}`} className="group block mb-8">
    <article className="overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg px-4 py-6">
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>12.01.2022</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{meta.readingTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{views.views} views</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
        {meta.title}
      </h3>
      <p className="text-muted-foreground">{meta.summary}</p>
    </article>
  </Link>
);



export const BlogSummaryCard: React.FC<BlogSummaryCardProps> = ({
  meta,
  slug,
  views: { views },
}) => {
  return (
    <Link href={`/posts/${slug}`}>
      <li
        key={meta.title}
        className={'bg-base-100 mb-8 sm:flex-row flex-col-reverse my-12 hover:shadow-lg transition-shadow'}>
        <div className="card-body py-0 px-0 sm:mt-0 mt-6">
          <Small className="text-textSecondary">Jan 31, 2022</Small>
          <H2 className="card-title font-bold">{meta.title}</H2>
          <P className="my-4 text-textSecondary">{meta.summary}</P>
          <div className="mb-1 flex">
            <Small className="flex-grow-0 mr-4">{meta?.readingTime}</Small>
            <View views={views} />
          </div>
        </div>
        <Image
          style={{
            objectFit: 'cover',
            height: '220px',
            minWidth: '220px',
          }}
          className="sm:w-60 w-full sm:rounded-r-xl rounded-xl sm:rounded-l-none"
          src={meta.image}
          alt={meta.alt || ''}
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

const View: React.FC<ViewProps> = ({ className = 'flex-grow-0 ', views }) => {
  return (
    <Small className={className}>
      {views < 2 ? `${views} view` : `${views} views`}
    </Small>
  );
}; 