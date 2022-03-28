import '../templates/globals.css';
import { PageTemplate } from '../templates/PageTemplate';

const App = ({ Component, pageProps }) => {
  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
};

export default App;
