import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';

import styles from '../styles/Home.module.scss';
import API from '../app/API';
import { Asteroids } from '../app/types';
import { addDaysToNewDate } from '../app/shared';


const Home: NextPage = () => {
  const [asteroids, setAsteroids] = useState<Asteroids>([]);
  const [startDate, setStartDate] = useState(new Date());

  const fetchAsteroids = useCallback(
    () => {
      API.fetchAsteroids({ startDate })
        .then((result) => {
          const newAsteroids = Object.keys(result).sort().reduce((acc, key) => {
            return acc.concat(result[key]);
          }, asteroids);

          setStartDate(addDaysToNewDate(startDate));
          setAsteroids(newAsteroids);
        }).catch((error) => console.log('error = ', error));
    },
    [asteroids, startDate],
  );

  useEffect(() => {
    fetchAsteroids();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {asteroids.map((asteroid) => (
        <div key={asteroid.id}>
          {asteroid.id}
          <br />
          {asteroid.close_approach_data[0].close_approach_date_full}
          <br />
          <br />
        </div>
      ))}
      <button type="button" onClick={fetchAsteroids}>fetchAsteroids</button>
    </div>
  );
};

export default Home;
