import Image from 'next/image';

import styles from './Card.module.scss';
import { Asteroid } from '../../app/types';
import peacefull from './images/peacefull.svg';
import dangerous from './images/dangerous.svg';
import { MissDistanceDisplay } from '../../app/contexts/Asteroids';


const formatDate = (date: Date) => date
  .toLocaleDateString('ru', { year: 'numeric', month: 'long', day: 'numeric' })
  .slice(0, -3);


export interface CardOptions {
  missDistanceDisplay: MissDistanceDisplay
}
export interface CardProps {
  asteroid: Asteroid,
  options?: CardOptions,
}

const Card = ({
  asteroid,
  options: { missDistanceDisplay } = { missDistanceDisplay: MissDistanceDisplay.kilometers },
}: CardProps) => {
  const approachDate = new Date(asteroid.close_approach_data[0].close_approach_date);

  const isDangerous = asteroid.is_potentially_hazardous_asteroid;

  const estimatedDiameter = Math.ceil(asteroid.estimated_diameter.meters.estimated_diameter_max);

  const missDistanceData = asteroid.close_approach_data[0].miss_distance;
  const missDistance = missDistanceDisplay === MissDistanceDisplay.lunar
    ? `${Number(missDistanceData.lunar)} лунных орбит`
    : `${Math.ceil(Number(missDistanceData.kilometers))} км`;

  return (
    <div className={styles.card}>
      <span>{formatDate(approachDate)}</span>
      <div className={styles.body}>
        <Image
          src={isDangerous ? dangerous : peacefull}
          alt="Степень опасности астероида."
        />
        <div>
          Астероид
          {' '}
          {asteroid.name.slice(1, -1)}
          <br />
          Ø
          {' '}
          {estimatedDiameter}
          {' '}
          м
          <br />
          ↔
          {' '}
          {missDistance}
          <br />
          {isDangerous ? 'Опасен' : 'Не опасен'}
        </div>
        <br />
      </div>
    </div>
  );
};

export default Card;
