import * as React from 'react';
import { H1 } from '@/atoms/Typography';

export const BlogPageHeading = ({}) => {
  return (
    <H1 className="mb-9 px-4">
      Recent
      <br /> writings<span className="text-primary">.</span>
    </H1>
  );
};
