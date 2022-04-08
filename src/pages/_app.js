import '../templates/globals.css';
import { PageTemplate } from '../templates/PageTemplate';
import { useDarkMode } from '../lib/useDarkMode';

const App = ({ Component, pageProps }) => {
  useDarkMode();
  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
};

export default App;
