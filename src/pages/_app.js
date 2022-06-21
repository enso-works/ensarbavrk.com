import '../templates/globals.css';
import { PageTemplate } from '../templates/PageTemplate';
import { DarkModeInitializerScript, useDarkMode } from '@/lib/useDarkMode';
import { KeyboardEventProvider } from '@/lib/keyboardService';

const App = ({ Component, pageProps }) => {
  useDarkMode();
  return (
    <KeyboardEventProvider>
      <PageTemplate>
        <DarkModeInitializerScript />
        <Component {...pageProps} />
      </PageTemplate>
    </KeyboardEventProvider>
  );
};

export default App;
