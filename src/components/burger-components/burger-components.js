import { forwardRef } from "react"
import burgerComponents from "./burger-components.module.css";
import IngredientBurger from "../ingredient-burger/ingredient-burger";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";

const BurgerComponents = forwardRef(({ingredients, openModal}, ref) => {
  return (
    <>
      <div className={burgerComponents.ingredient_list} ref={ref}>
        {ingredients.map((ingredient) => (
          <IngredientBurger 
          key={ingredient._id} 
          ingredient={ingredient} 
          onClick={() => {
            openModal(ingredient)
          }} 
          />
        ))}
      </div>
    </>
  );
})

BurgerComponents.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  openModal: PropTypes.func.isRequired
}

export default BurgerComponents;
