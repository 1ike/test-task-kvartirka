import { useContext } from 'react';

import styles from './CardWithDestroyButton.module.scss';
import Card, { CardProps } from '../Card';
import { AsteroidsContext } from '../../app/contexts/Asteroids';
import { Asteroid } from '../../app/types';


const Button = ({ asteroid }: { asteroid: Asteroid }) => {
  const { addDoomedAsteroid } = useContext(AsteroidsContext);

  const addToBlackList = () => addDoomedAsteroid!(asteroid);

  return (
    <button
      type="button"
      onClick={addToBlackList}
      className={styles.button}
    >
      уничтожить
    </button>
  );
};

const CardWithDestroyButton = (props: CardProps) => {
  return (
    <div>
      <Card {...props} />
      <Button asteroid={props.asteroid} />
    </div>
  );
};

export default CardWithDestroyButton;
