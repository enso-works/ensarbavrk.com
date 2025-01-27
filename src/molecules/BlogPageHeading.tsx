import * as React from 'react';
import { H1 } from '@/atoms/Typography';
import classNames from 'classnames';

interface BlogPageHeadingProps {
  firstLine?: string;
  secondLine?: string;
  className?: string;
}

export const BlogPageHeading = ({ firstLine = 'Recent', secondLine = 'writings', className }: BlogPageHeadingProps) => {
  return (
    <H1 className={classNames('mb-9', className)}>
      {firstLine}
      <br /> {secondLine}<span className="text-primary">.</span>
    </H1>
  );
};
