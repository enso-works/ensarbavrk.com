import '../templates/globals.css';
import { PageTemplate } from '../templates/PageTemplate';
import { DarkModeInitializerScript, useDarkMode } from '../lib/useDarkMode';

const App = ({ Component, pageProps }) => {
  useDarkMode();
  return (
    <PageTemplate>
      <DarkModeInitializerScript />
      <Component {...pageProps} />
    </PageTemplate>
  );
};

export default App;
