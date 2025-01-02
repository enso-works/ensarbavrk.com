import * as React from 'react';
import { Children } from 'react';

interface WithPredicateProps {
  predicate: boolean;
  children: React.ReactNode | [React.ReactNode, React.ReactNode];
}

export const IF = ({ predicate, children }: WithPredicateProps) => {
  return <>{predicate ? Children.only(children) : []}</>;
};

export const IF_Else = ({ predicate, children }: WithPredicateProps) => {
  if (!Array.isArray(children) || Children.count(children) !== 2) {
    throw new Error('IF_Else expects exactly two children');
  }
  return predicate ? (
    <>{Children.only(children[0])}</>
  ) : (
    <>{Children.only(children[1])}</>
  );
};
