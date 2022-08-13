import React from 'react';
import Head from 'next/head';

import Header from './Header';
import styles from './Layout.module.scss';
import { APP_NAME } from '../../app/config';


interface Props {
  children: React.ReactNode,
}

function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.content}>
        {children}
      </main>

      <footer className={styles.footer}>2022 © Все права и планета защищены</footer>
    </div>
  );
}

export default Layout;
