import {
  useCallback, useEffect, useContext, useState,
} from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useInView } from 'react-intersection-observer';

import styles from '../styles/Home.module.scss';
import API from '../app/API';
import { addDaysToNewDate } from '../app/shared';
import { AsteroidsContext, asteroidsInitial } from '../app/contexts/Asteroids';
import Settings from '../components/Settings';
import CardWithDestroyButton from '../components/CardWithDestroyButton';
import Cards from '../components/Cards';
import { Asteroids } from '../app/types';
import { NearEarthObjects } from './api/asteroids';


export const addAsteroidsFromResponseData = (
  data: NearEarthObjects,
  asteriods: Asteroids,
): Asteroids => Object.keys(data).sort().reduce((acc, key) => {
  return acc.concat(data[key]);
}, asteriods);


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let asteroidsData = null;
  let errorMessage = null;

  const startDate = new Date();

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const serverUrl = req ? `${protocol}://${req.headers.host}` : '';

    asteroidsData = await API.fetchAsteroids({ startDate }, serverUrl);

    if (!asteroidsData) {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    errorMessage = (err as Error).message;
  }

  return {
    props: {
      preloadedAsteroids: addAsteroidsFromResponseData(
        asteroidsData as NearEarthObjects,
        asteroidsInitial,
      ),
      preloadedStartDateString: addDaysToNewDate(startDate).toDateString(),
      errorMessage,
    },
  };
};

interface Props {
  preloadedAsteroids: Asteroids,
  preloadedStartDateString: string,
  preloadedErrorMessage: string,
}

const Home: NextPage<Props> = ({
  preloadedAsteroids, preloadedStartDateString, preloadedErrorMessage,
}) => {
  const {
    asteroids, setAsteroids, startDate, setStartDate, filteredAsteroids, missDistanceDisplay,
    scrollPosition, setScrollPosition,
  } = useContext(AsteroidsContext);

  const hasAsteroids = asteroids.length !== 0;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView();

  const fetchAsteroids = useCallback(
    () => {
      setLoading(true);
      setError(null);
      API.fetchAsteroids({ startDate })
        .then((result) => {
          const newAsteroids = addAsteroidsFromResponseData(result, asteroids);

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
    if (hasAsteroids && inView && !loading) {
      fetchAsteroids();
    }

    if (!hasAsteroids) {
      setAsteroids!(preloadedAsteroids);
      setStartDate!(new Date(preloadedStartDateString));
    }
  }, [
    hasAsteroids, inView, loading, fetchAsteroids,
    setAsteroids, preloadedAsteroids, setStartDate, preloadedStartDateString,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: scrollPosition,
    });
  }, [scrollPosition]);

  const onCardClick = useCallback(
    () => setScrollPosition!(window.scrollY || window.pageYOffset),
    [setScrollPosition],
  );

  const renderUpdateButton = () => (
    <button type="button" onClick={fetchAsteroids}>Попробовать подгрузить еще</button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Ближайшие подлёты</h1>
        <Settings />
      </div>
      <Cards
        asteroids={hasAsteroids ? filteredAsteroids : preloadedAsteroids}
        component={CardWithDestroyButton}
        options={{ missDistanceDisplay }}
        onCardClick={onCardClick}
      />
      <div ref={ref} />

      {
        !loading
        && hasAsteroids
        && filteredAsteroids.length === 0
        && <p>Не найдено подходящих астероидов.</p>
      }
      {loading && <p>Загрузка...</p>}
      {preloadedErrorMessage && (
        <>
          <p>{`Error: ${preloadedErrorMessage}`}</p>
          {renderUpdateButton()}
        </>
      )}
      {error && (
        <>
          <p>{`Error: ${error}`}</p>
          {renderUpdateButton()}
        </>
      )}
    </div>
  );
};

export default Home;
