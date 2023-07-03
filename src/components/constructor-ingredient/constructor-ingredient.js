import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, sortIngredient } from '../../services/actions/burger-constructor';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import constructorIngredientStyle from './constructor-ingredient.module.css';
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";

const ConstructorIngredient = (ConstructorIngredientRow) => {
  const { name, price, image, id, dragInfo } = ConstructorIngredientRow;
  const dispatch = useDispatch();
  
  const [, dragFromRef] = useDrag({
    type: "ConstructorIngredientRow",
    item: dragInfo
  })

  const [, dropToRef] = useDrop({
    accept: "ConstructorIngredientRow",
    drop({ swappableId }) {
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

ConstructorIngredient.propTypes = {
  props: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default ConstructorIngredient