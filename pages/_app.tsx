import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import Layout from '../components/Layout';
import { AsteroidsProvider } from '../app/contexts/Asteroids';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AsteroidsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AsteroidsProvider>
  );
}

export default MyApp;
