import type {AppProps} from 'next/app';
import {Layout} from '../src/components/layout';
import '../styles/globals.css';
import '../styles/prism-code-highlight.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;