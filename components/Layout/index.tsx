import React from 'react';
import Head from 'next/head'

import Header from './Header';
import styles from './Layout.module.scss';


interface Props {
  children: React.ReactNode,
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Armageddon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.content}>
        <Header />

        <main>
          {children}
        </main>
      </div>

      <footer className={styles.footer}>2022 © Все права и планета защищены</footer>
    </div>
  );
}

export default Layout;