import * as React from 'react';
import Link from 'next/link';
import styles from './BlogLink.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const BlogLink = ({ pathTo, children }) => {
  const { asPath } = useRouter();

  return (
    <Link href={pathTo}>
      <a
        className={cx('blog-link', {
          active: asPath === pathTo,
        })}>
        {children}
      </a>
    </Link>
  );
};
