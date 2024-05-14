import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';
import Link from 'next/link';

export const BlogSummaryCard = ({ meta, slug }) => {
  return (
      <Link href={`/posts/${slug}`}>
    <li
      onClick={() => {}}
      key={meta.title}
      className={'card card-side bg-base-100 mb-8 sm:flex-row flex-col my-12'}>
        <Image
          style={{
            objectFit: 'cover', // cover, contain, none
            height: '240px',
            minWidth: '240px',
            borderRadius: '16px',
          }}
          className="sm:w-60 w-full"
          src={meta.image}
          alt={meta.alt || ''}
          width={240}
          height={240}
        />
        <div className="card-body py-0 px-0 sm:px-8 sm:mt-0 mt-6">
          <H2 className="card-title">{meta.title}</H2>
          <P className="my-4 text-secondary text-textSecondary">
            {meta.summary}
          </P>
          <div className="flex mb-1">
            <Small>12 views</Small>
            <Small>6 min read</Small>
            <Small>Jan 31, 2022</Small>
          </div>
        </div>
    </li>
      </Link>
  );
};
