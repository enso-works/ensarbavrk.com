import * as React from 'react';
import NextLink from 'next/link';
import styles from './Command.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { IF_Else } from '@/atoms/Conditionals';

const cx = classNames.bind(styles);

interface BaseCommandProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  active?: boolean;
  children: React.ReactNode;
}

interface ButtonProps extends BaseCommandProps {
  className?: string;
}

interface ButtonInListProps extends BaseCommandProps {
  className?: string;
}

interface LinkProps extends BaseCommandProps {
  pathTo: string;
  className?: string;
}

interface LinkInListProps extends BaseCommandProps {
  pathTo: string | (() => string);
  cb?: (event: React.MouseEvent<HTMLLIElement>) => void;
  className?: string;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
}

const Button = ({ onClick, className, active, children }: ButtonProps) => {
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

const ButtonInList = ({ onClick, active, children }: ButtonInListProps) => {
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

const Link = ({ pathTo, className = 'command', children }: LinkProps) => {
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

const LinkInList = forwardRef<HTMLLIElement, LinkInListProps>(
  ({ pathTo, cb, className, onFocus, children }, ref) => {
    return (
      <li onFocus={onFocus} tabIndex={-1} ref={ref} onClick={cb || undefined}>
        <IF_Else predicate={typeof pathTo === 'string'}>
          <Link
            pathTo={typeof pathTo === 'string' ? pathTo : ''}
            className={className}
            onClick={() => {
              if (typeof pathTo === 'function') pathTo();
            }}>
            {children}
          </Link>
          <div
            role="button"
            className={className}
            onClick={() => {
              if (typeof pathTo === 'function') pathTo();
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
  Button,
  ButtonInList,
};
