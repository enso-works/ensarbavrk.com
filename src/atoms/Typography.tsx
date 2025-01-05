import * as React from 'react';
import classNames from 'classnames';
import { SyntaxHighLight } from '@/atoms/SyntaxHighLight';
import { BlockQuote } from '@/atoms/BlockQuote';

interface TextProps extends React.PropsWithChildren {
  classes?: string;
  className?: string;
}

interface HeadingProps extends React.AllHTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

interface MDXComponentProps {
  children: React.ReactNode;
  [key: string]: any;
}

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

interface PreProps {
  children: React.ReactNode;
}

const Text = ({ classes, children, className }: TextProps) => (
  <p className={classNames(classes, className)}>{children}</p>
);

export const H1 = ({ children, ...props }: HeadingProps) => (
  <h1
    {...props}
    className={classNames(
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      props.className
    )}>
    {children}
  </h1>
);

export const H2 = ({ children, ...props }: HeadingProps) => (
  <h2
    {...props}
    className={classNames(
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      props.className
    )}>
    {children}
  </h2>
);

export const H3 = ({ children, ...props }: HeadingProps) => (
  <h3
    {...props}
    className={classNames(
      'scroll-m-20 text-2xl font-semibold tracking-tight',
      props.className
    )}>
    {children}
  </h3>
);

export const Small = ({ children, className }: TextProps) => (
  <Text classes={classNames('text-sm text-muted-foreground', className)}>
    {children}
  </Text>
);

export const P = ({ children, className }: TextProps) => (
  <Text classes={classNames('leading-7 [&:not(:first-child)]:mt-6', className)}>
    {children}
  </Text>
);

const MDX_H1 = ({ children, ...rest }: MDXComponentProps) => (
  <h1
    {...rest}
    className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {children}
  </h1>
);

const MDX_H2 = ({ children, ...rest }: MDXComponentProps) => {
  return (
    <h2
      {...rest}
      className="scroll-m-20 border-b pt-12 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {React.isValidElement(children) ? children.props.children : children}
    </h2>
  );
};

const MDX_LEAD = ({ children, ...rest }: MDXComponentProps) => {
  if (React.isValidElement(children) && (children.type === 'p' || children.type === P)) {
    return <p {...rest} className="text-xl text-muted-foreground mt-8">
      {children.props.children}
    </p>;
  }

  return (
    <p {...rest} className="text-xl text-muted-foreground mt-8">
      {children}
    </p>
  );
};

const MDX_P = ({ children, ...rest }: MDXComponentProps) => {
  if (React.isValidElement(children) && (children.type === 'p' || children.type === P)) {
    return <p {...rest} className="max-w-readable leading-8">
      {children.props.children}
    </p>;
  }
  
  return (
    <p {...rest} className="max-w-readable leading-8">
      {children}
    </p>
  );
};

const MDX_Code = ({ children, className }: CodeProps) => {
  return className ? (
    <SyntaxHighLight className={className}>{children}</SyntaxHighLight>
  ) : (
    <code className="language-text">{children}</code>
  );
};

const MDX_Pre = ({ children }: PreProps) => {
  return <div className="mockup-code my-12">{children}</div>;
};

export const components = {
  H1: MDX_H1,
  h1: MDX_H1,
  H2: MDX_H2,
  h2: MDX_H2,
  MDX_H2,
  P: MDX_P,
  p: MDX_P,
  Small,
  BlockQuote,
  code: MDX_Code,
  pre: MDX_Pre,
  Lead: MDX_LEAD,
};
