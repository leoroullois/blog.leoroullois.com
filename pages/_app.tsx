import type {AppProps} from 'next/app';

import Layout from '@layout/layout';

import '@styles/globals.css';
import '@styles/prism-code-highlight.css';

const App = ({Component, pageProps}: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
