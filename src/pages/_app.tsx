import type { AppProps } from 'next/app';
import '../templates/globals.css';
import { PageTemplate } from '../templates/PageTemplate';
import { DarkModeInitializerScript, useDarkMode } from '@/lib/useDarkMode';

const App = ({ Component, pageProps }: AppProps) => {
  useDarkMode();
  return (
    <PageTemplate>
      <DarkModeInitializerScript />
      <Component {...pageProps} />
    </PageTemplate>
  );
};

export default App;
