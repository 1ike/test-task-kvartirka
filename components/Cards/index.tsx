import styles from './Cards.module.scss';
import { Asteroids } from '../../app/types';
import { CardProps, CardOptions } from '../Card';


interface Props {
  asteroids: Asteroids,
  component: React.ComponentType<CardProps>,
  options?: CardOptions,
  containerStyles?: string,
}

function Cards({
  asteroids, options, component: SpecificCard, containerStyles,
}: Props) {
  return (
    <div className={containerStyles}>
      <div className={styles.cards}>
        {asteroids.map((asteroid) => (
          <SpecificCard
            key={asteroid.id}
            asteroid={asteroid}
            options={options}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
