import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from './Details.module.scss';
import { APP_NAME } from '../../app/config';
import API from '../../app/API';
import DestroyButton from '../../components/DestroyButton';
import { Asteroid } from '../../app/types';


export const getServerSideProps: GetServerSideProps = async (
  { params, req },
) => {
  let asteroid = null;
  let errorMessage = null;

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const serverUrl = req ? `${protocol}://${req.headers.host}` : '';

    asteroid = await API.fetchAsteroidById(params?.id as string, serverUrl);

    if (!asteroid) {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    errorMessage = (err as Error).message;
  }

  return {
    props: { asteroid, errorMessage },
  };
};

interface Props {
  asteroid: Asteroid | null,
  errorMessage: string | null,
}


const Details: NextPage<Props> = ({ asteroid, errorMessage }) => {
  const title = `Астероид ${asteroid?.name}`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${title} — ${APP_NAME}`}</title>
      </Head>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{title}</h1>
      </div>
      {errorMessage && <p>{`Error: ${errorMessage}`}</p>}
      {asteroid && (
        <>
          <h2 className={styles['section-title']}>Основные сведения:</h2>
          <ul>
            <li>{`Ø: ${Math.ceil(asteroid.estimated_diameter.meters.estimated_diameter_max)} м`}</li>
            <li>{`cтепень опасности астероида: ${asteroid.is_potentially_hazardous_asteroid ? 'Опасен' : 'Не опасен'}`}</li>
          </ul>

          <DestroyButton asteroid={asteroid} />

          <h2 className={styles['section-title']}>Список сближений:</h2>
          {asteroid.close_approach_data.map((approach) => {
            const closeApproachDateString = (new Date(approach.epoch_date_close_approach))
              .toLocaleString('ru', {
                month: 'long',
                year: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              });

            return (
              <ul key={approach.close_approach_date_full}>
                <h3 className={styles['approach-title']}>
                  {approach.close_approach_date}
                </h3>
                <li>{`скорость относительно Земли: ${parseInt(approach.relative_velocity.kilometers_per_hour, 10)} км/ч`}</li>
                <li>{`время максимального сближения с Землей: ${closeApproachDateString}`}</li>
                <li>{`летит по орбите вокруг: ${approach.orbiting_body}`}</li>
              </ul>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Details;
