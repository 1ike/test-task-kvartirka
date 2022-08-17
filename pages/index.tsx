import {
  useCallback, useEffect, useContext, useState,
} from 'react';
import type { NextPage } from 'next';
import { useInView } from 'react-intersection-observer';

import styles from '../styles/Home.module.scss';
import API from '../app/API';
import { addDaysToNewDate } from '../app/shared';
import { AsteroidsContext } from '../app/contexts/Asteroids';
import Settings from '../components/Settings';
import CardWithDestroyButton from '../components/CardWithDestroyButton';
import Cards from '../components/Cards';


const Home: NextPage = () => {
  const {
    asteroids, setAsteroids, startDate, setStartDate, filteredAsteroids, missDistanceDisplay,
    scrollPosition, setScrollPosition,
  } = useContext(AsteroidsContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView();

  const fetchAsteroids = useCallback(
    () => {
      setLoading(true);
      setError(null);
      API.fetchAsteroids({ startDate })
        .then((result) => {
          const newAsteroids = Object.keys(result).sort().reduce((acc, key) => {
            return acc.concat(result[key]);
          }, asteroids);

          setStartDate!(addDaysToNewDate(startDate));
          setAsteroids!(newAsteroids);
        }).catch((e: Error) => {
          console.error('error = ', e);
          setError(e.message);
        }).finally(() => setLoading(false));
    },
    [asteroids, setAsteroids, startDate, setStartDate],
  );

  useEffect(() => {
    if (inView && !loading) {
      fetchAsteroids();
    }
  }, [inView, loading, fetchAsteroids]);


  useEffect(() => {
    window.scrollTo({
      top: scrollPosition,
    });
  }, [scrollPosition]);

  const onCardClick = useCallback(
    () => setScrollPosition!(window.scrollY || window.pageYOffset),
    [setScrollPosition],
  );


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Ближайшие подлёты</h1>
        <Settings />
      </div>
      <Cards
        asteroids={filteredAsteroids}
        component={CardWithDestroyButton}
        options={{ missDistanceDisplay }}
        onCardClick={onCardClick}
      />
      <div ref={ref} />

      {loading && <p>Загрузка...</p>}
      {error && (
        <>
          <p>{`Error: ${error}`}</p>
          <button type="button" onClick={fetchAsteroids}>Попробовать подгрузить еще</button>
        </>
      )}
      {!loading && filteredAsteroids.length === 0 && <p>Не найдено подходящих астероидов.</p>}

    </div>
  );
};

export default Home;
