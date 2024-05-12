import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';

export const BlogSummaryCard = ({ meta }) => {
  return (
    <li key={meta.title} className="flex mb-9">
      <Image
        style={{
          objectFit: 'cover', // cover, contain, none
          width: '240px',
          height: '240px',
          minWidth: '240px',
          borderRadius: '16px',
        }}
        src={meta.image}
        alt={meta.alt || ''}
        width={240}
        height={240}
      />
      <div className="flex flex-col ml-9">
        <H2 className="mb-6">{meta.title}</H2>
        <P className="mb-3">{meta.summary}</P>
        <div className="flex">
          <Small>12 views</Small>
          <Small>6 min read</Small>
          <Small>Jan 31, 2022</Small>
        </div>
      </div>
    </li>
  );
};
