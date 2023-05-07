import { forwardRef } from "react"
import burgerComponents from "./burger-components.module.css";
import IngredientBurger from "../ingredient-burger/ingredient-burger";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details"

function BurgerComponents({ingredients, openModal}, ref) {

  return (
    <>
      <div className={burgerComponents.ingredient_list} ref={ref}>
        {ingredients.map((ingredient) => (
          <IngredientBurger 
          key={ingredient._id} 
          ingredient={ingredient} 
          onClick={() => {
            openModal(<IngredientDetails ingredient={ingredient}/>)
          }} 
          />
        ))}
      </div>
    </>
  );
}

BurgerComponents.propTypes = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}

export default forwardRef(BurgerComponents);
