import type { AppProps } from 'next/app';
import '../templates/globals.css';
import { PageTemplate } from '../templates/PageTemplate';
import { useDarkMode } from '@/lib/useDarkMode';
import { AuthProvider } from '@/lib/AuthContext';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }: AppProps) => {
  useDarkMode();
  return (
    <AuthProvider>
      <PageTemplate>
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </PageTemplate>
    </AuthProvider>
  );
};

export default App;
