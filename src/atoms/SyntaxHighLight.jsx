import React from 'react';
import { Highlight } from 'prism-react-renderer';

export const SyntaxHighLight = ({ children, className }) => {
  const language = className
    ? className.replace(/language-/, '')
    : 'javascript';

  return (
    <Highlight code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={"max-w-80vw"}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className={'mx-6'}>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
