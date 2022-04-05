import * as React from 'react';
import NextLink from 'next/link';
import styles from './BlogLink.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ onClick, active, children }) => {
  return (
    <li
      className={cx('command', {
        active: active,
      })}>
      {children}
    </li>
  );
};

const Link = ({ pathTo, children }) => {
  const { asPath } = useRouter();

  return (
    <li>
      <NextLink href={pathTo}>
        <a
          className={cx('command', {
            active: asPath === pathTo,
          })}>
          {children}
        </a>
      </NextLink>
    </li>
  );
};

export const Command = {
  Link,
  Button,
};
