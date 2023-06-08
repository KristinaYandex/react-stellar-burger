import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, sortIngredient } from '../../services/actions/burger-constructor';
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import constructorIngredientStyle from './constructor-ingredient.module.css'

const ConstructorIngredient = (props) => {
  const { name, price, image, id, dragInfo } = props
  const dispatch = useDispatch()
  
  const [, dragFromRef] = useDrag({
    type: "ConstructorIngredientRow",
    item: dragInfo,
  })

  const [, dropToRef] = useDrop({
    accept: "ConstructorIngredientRow",
    drop({ swappableId }) {
      dispatch(sortIngredient(id, swappableId))
    },
  });

  return (
    <div className={constructorIngredientStyle.ingredient} ref={dropToRef}>
      <div className={constructorIngredientStyle.icon} ref={dragFromRef}>
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => dispatch(deleteIngredient(id))}
      />
    </div>
  )
}

export default ConstructorIngredient