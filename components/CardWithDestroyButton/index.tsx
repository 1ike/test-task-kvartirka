import styles from './CardWithDestroyButton.module.scss';
import Card, { CardProps } from '../Card';


const CardWithDestroyButton = (props: CardProps) => {
  const addToBlackList = () => console.log('addToBlackList with id = ', props.asteroid.id);

  return (
    <div>
      <Card {...props} />
      <button
        type="button"
        onClick={addToBlackList}
        className={styles.button}
      >
        уничтожить
      </button>
    </div>
  );
};

export default CardWithDestroyButton;
