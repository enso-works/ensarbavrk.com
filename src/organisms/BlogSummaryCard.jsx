import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';

export const BlogSummaryCard = ({ meta }) => {
  return (
    <li key={meta.title} className="flex mb-9">
      <Image
        src={meta.image}
        alt={meta.alt || ''}
        width={380}
        height={200}
        objectFit={'cover'}
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
