import * as React from 'react';
import { Children } from 'react';

export const IF = ({ predicate, children }) => {
  return <>{predicate ? <>{Children.only(children)}</> : []}</>;
};

export const IF_Else = ({ predicate, children }) => {
  if (Children.count(children) !== 2) {
    throw new Error('IF_Else expects exactly two children');
  }
  return predicate ? (
    <>{Children.only(children[0])}</>
  ) : (
    <>{Children.only(children[1])}</>
  );
};
