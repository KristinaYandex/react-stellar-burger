import burgerComponents from "./burger-components.module.css";
import IngredientBurger from "../ingredient-burger/ingredient-burger";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";

function BurgerComponents({ingredient}) {

  return (
    <>
      <div className={burgerComponents.ingredient_list}>
        {ingredient.map((ingredient) => (
          <IngredientBurger ingredient={ingredient} />
        ))}
      </div>
    </>
  );
}

BurgerComponents.PropType = {
  ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}

export default BurgerComponents;
