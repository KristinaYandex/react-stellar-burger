import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, sortIngredient } from '../../services/actions/burger-constructor';
import { useDispatch } from '../../utils/store-types'
import { useDrag, useDrop } from 'react-dnd';
import constructorIngredientStyle from './constructor-ingredient.module.css';
import { FunctionComponent } from 'react';

interface IMovieProps {
  name: string;
  price: number; 
  image: string; 
  id: string; 
  dragInfo: {
    swappableId: string;
  }  
}

const ConstructorIngredient: FunctionComponent<IMovieProps> = ({name, price, image, id, dragInfo}) => {
    /*const { name, price, image, id, dragInfo } = this.props;*/
    const dispatch = useDispatch();
  
  const [, dragFromRef] = useDrag({
    type: "ConstructorIngredientRow",
    item: dragInfo
  })

  const [, dropToRef] = useDrop({
    accept: "ConstructorIngredientRow",
    drop( swappableId: string ) {
      dispatch(sortIngredient(id, swappableId))
    },
  });

  return (
    <div ref={dropToRef}>
      <div className={constructorIngredientStyle.ingredient} ref={dragFromRef}>
        <div className={constructorIngredientStyle.icon}>
          <DragIcon type="primary"/>
        </div>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => dispatch(deleteIngredient(id))}
        />
      </div>
    </div>
  )
}

export default ConstructorIngredient