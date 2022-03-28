import '../src/templates/globals.css';
import { PageTemplate } from '../src/templates/PageTemplate';

const App = ({ Component, pageProps }) => {
  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
};

export default App;
