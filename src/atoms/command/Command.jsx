import * as React from 'react';
import NextLink from 'next/link';
import styles from './Command.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { IF_Else } from '@/atoms/Conditionals';

const cx = classNames.bind(styles);

const Button = ({ onClick, className, active, children }) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        'command',
        {
          active: active,
        },
        className
      )}>
      {children}
    </button>
  );
};

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

const Link = ({ pathTo, className = 'command', children }) => {
  const { asPath } = useRouter();

  return (
    <NextLink
      className={cx(className, {
        active: asPath === pathTo,
      })}
      href={pathTo}>
      {children}
    </NextLink>
  );
};

const LinkInList = forwardRef(
  ({ pathTo, cb = null, className, onFocus, children }, ref) => {
    return (
      <li onFocus={onFocus} tabIndex="-1" ref={ref} onClick={cb}>
        <IF_Else predicate={typeof pathTo === 'string'}>
          <Link pathTo={pathTo} className={className}>
            {children}
          </Link>
          <div
            role="button"
            className={className}
            onClick={() => pathTo()}>
            {children}
          </div>
        </IF_Else>
      </li>
    );
  }
);

LinkInList.displayName = 'LinkInList';

export const Command = {
  Link,
  LinkInList,
  Button,
  ButtonInList,
};
