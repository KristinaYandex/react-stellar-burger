import { forwardRef } from "react"
import burgerComponents from "./burger-components.module.css";
import IngredientBurger from "../ingredient-burger/ingredient-burger";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';

const BurgerComponents = forwardRef(({ingredients}, ref) => {
  const history = useHistory();

  const openModal = (item) => {
    history.replace(`/ingredients/${item._id}`, {background: true})
  }

  return (
    <div className={burgerComponents.ingredient_list} ref={ref}>
      {ingredients.map((ingredient) => (
        <IngredientBurger 
          key={ingredient._id} 
          ingredient={ingredient} 
          onClick={() => openModal(ingredient)} 
        />
      ))}
    </div>
  );
})

BurgerComponents.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerComponents;
