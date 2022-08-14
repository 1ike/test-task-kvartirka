import styles from './CardWithDestroyButton.module.scss';
import Card, { CardProps } from '../Card';


const CardWithDestroyButton = (props: CardProps) => {
  const addToBlackList = () => console.log('addToBlackList with id = ', props.asteroid.id);

  return (
    <>
      <Card {...props} />
      <button
        type="button"
        onClick={addToBlackList}
        className={styles.button}
      >
        уничтожить
      </button>
    </>
  );
};

export default CardWithDestroyButton;
