import Link from 'next/link';

import styles from './Cards.module.scss';
import { Asteroids } from '../../app/types';
import { CardProps, CardOptions } from '../Card';


interface Props {
  asteroids: Asteroids,
  component: React.ComponentType<CardProps>,
  options?: CardOptions,
  containerStyles?: string,
  onCardClick?: () => void,
}

function Cards({
  asteroids, options, component: SpecificCard, containerStyles, onCardClick,
}: Props) {
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <div className={containerStyles}>
      <div className={styles.cards}>
        {asteroids.map((asteroid) => (
          <Link href={`/${asteroid.id}`} key={asteroid.id}>
            <div onClick={onCardClick}>
              <SpecificCard
                asteroid={asteroid}
                options={options}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cards;
