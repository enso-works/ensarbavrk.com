import * as React from 'react';
import NextLink from 'next/link';
import styles from './Command.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ButtonInList = ({ onClick, active, children }) => {
  return (
    <li
      onClick={onClick}
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
    <NextLink href={pathTo}>
      <a
        className={cx('command', {
          active: asPath === pathTo,
        })}>
        {children}
      </a>
    </NextLink>
  );
};

const LinkInList = ({ pathTo, children }) => {
  return (
    <li>
      <Link pathTo={pathTo}> {children}</Link>
    </li>
  );
};

export const Command = {
  Link,
  LinkInList,
  ButtonInList,
};
