import * as React from 'react';
import Image from 'next/image';
import { H2, P, Small } from '@/atoms/Typography';
import { useToggleDarkMode } from '@/lib/useDarkMode';
import classNames from 'classnames';

export const BlogSummaryCard = ({ meta }) => {
  const { isDarkMode } = useToggleDarkMode();

  console.log('HERE ', isDarkMode);
  return (
    <li
      key={meta.title}
      className={classNames(
        'card card-side bg-base-100 mb-8 sm:flex-row flex-col',
        {
          'shadow-xl': isDarkMode,
        }
      )}>
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
      <div className="card-body py-0 px-0 sm:px-8">
        <H2 className="card-title">{meta.title}</H2>
        <P className="my-4">{meta.summary}</P>
        <div className="flex mb-1">
          <Small>12 views</Small>
          <Small>6 min read</Small>
          <Small>Jan 31, 2022</Small>
        </div>
      </div>
    </li>
  );
};
