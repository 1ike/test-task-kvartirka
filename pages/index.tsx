import { useCallback, useEffect, useContext } from 'react';
import type { NextPage } from 'next';

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
  } = useContext(AsteroidsContext);

  const fetchAsteroids = useCallback(
    () => {
      API.fetchAsteroids({ startDate })
        .then((result) => {
          const newAsteroids = Object.keys(result).sort().reduce((acc, key) => {
            return acc.concat(result[key]);
          }, asteroids);

          setStartDate!(addDaysToNewDate(startDate));
          setAsteroids!(newAsteroids);
        }).catch((error) => console.log('error = ', error));
    },
    [asteroids, setAsteroids, startDate, setStartDate],
  );

  useEffect(() => {
    fetchAsteroids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
      />
      <button type="button" onClick={fetchAsteroids}>fetchAsteroids</button>
    </div>
  );
};

export default Home;
