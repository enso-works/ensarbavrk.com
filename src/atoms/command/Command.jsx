import * as React from 'react';
import NextLink from 'next/link';
import styles from './Command.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { IF_Else } from '@/atoms/Conditionals';
import * as path from 'path';
import { keys } from '@/lib/keyboardService';

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

const Link = ({ pathTo, className = 'command', children }) => {
  const { asPath } = useRouter();

  return (
    <NextLink href={pathTo}>
      <a
        className={cx(className, {
          active: asPath === pathTo,
        })}>
        {children}
      </a>
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
            onClick={() => pathTo()}
            onKeyDown={(event) => {
              if (
                keys[event.key] === keys.Enter ||
                keys[event.key] === keys.Space
              ) {
                pathTo();
                event.preventDefault();
              }
            }}>
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
  ButtonInList,
};
