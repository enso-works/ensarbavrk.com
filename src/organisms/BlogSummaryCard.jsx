import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';
import Link from 'next/link';
import { EventMap, trackGAEvent } from '@/lib/ga4';

export const BlogSummaryCard = ({ meta, slug, views }) => {
  return (
    <Link
      href={`/posts/${slug}`}
      onClick={() => {
        trackGAEvent(...EventMap.BLOG);
      }}>
      <li
        key={meta.title}
        className={
          'card card-side bg-base-100 mb-8 sm:flex-row flex-col-reverse my-12'
        }>
        <div className="card-body py-0 px-0 sm:mt-0 mt-6">
          <Small className="text-textSecondary">Jan 31, 2022</Small>
          <H2 className="card-title font-bold">{meta.title}</H2>
          <P className="my-4 text-secondary text-textSecondary">
            {meta.summary}
          </P>
          <div className="mb-1 flex">
            <Small className="flex-grow-0 mr-4">{meta?.readingTime}</Small>
            <Small className="flex-grow-0 ">{views.views} views</Small>
          </div>
        </div>
        <Image
          style={{
            objectFit: 'cover', // cover, contain, none
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
