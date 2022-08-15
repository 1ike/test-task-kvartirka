import Card, { CardProps } from './Card';
import DestroyButton from './DestroyButton';


const CardWithDestroyButton = (props: CardProps) => {
  return (
    <div>
      <Card {...props} />
      <DestroyButton asteroid={props.asteroid} />
    </div>
  );
};

export default CardWithDestroyButton;
