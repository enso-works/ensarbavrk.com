import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const darkMode = localStorage.getItem('blog-theme');
                  const root = document.documentElement;
                  const isDark = darkMode === 'dark' || (!darkMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  
                  root.classList.remove('light', 'dark');
                  root.classList.add(isDark ? 'dark' : 'light');
                  root.style.colorScheme = isDark ? 'dark' : 'light';
                } catch (e) {
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 