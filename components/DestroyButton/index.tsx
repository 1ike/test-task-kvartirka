import { useContext } from 'react';

import styles from './DestroyButton.module.scss';
import { AsteroidsContext } from '../../app/contexts/Asteroids';
import { Asteroid } from '../../app/types';


const DestroyButton = ({ asteroid }: { asteroid: Asteroid }) => {
  const { addDoomedAsteroid } = useContext(AsteroidsContext);

  const addToBlackList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addDoomedAsteroid!(asteroid);
  };

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

export default DestroyButton;
