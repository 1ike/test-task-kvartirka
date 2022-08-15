import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from './Order.module.scss';
import { AsteroidsContext } from '../../app/contexts/Asteroids';
import Card from '../../components/Card';
import Cards from '../../components/Cards';
import { APP_NAME } from '../../app/config';


const title = 'Кандидаты на уничтожение';

const Order: NextPage = () => {
  const {
    doomedAsteroids, destroyDoomedAsteroids,
  } = useContext(AsteroidsContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${title} — ${APP_NAME}`}</title>
      </Head>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{title}</h1>
      </div>
      <Cards
        asteroids={doomedAsteroids}
        component={Card}
      />
      {doomedAsteroids.length === 0 ? <p>Кандидатов на уничтожение нет.</p> : (
        <button
          type="button"
          onClick={destroyDoomedAsteroids}
          className={styles.button}
        >
          уничтожить все эти астероиды
        </button>
      )}
    </div>
  );
};

export default Order;
