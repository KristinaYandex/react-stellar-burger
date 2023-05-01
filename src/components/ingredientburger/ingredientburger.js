import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientBurgerStyle from "./ingredientburger.module.css";
import {ingredientPropType} from "../../utils/prop-types.js"

const IngredientBurger = ({ingredient}) => {
  return (
    <div className={ingredientBurgerStyle.ingredient}>
      <Counter />
      <img src={ingredient.image} alt="Ингредиент" />
        <div className={ingredientBurgerStyle.ingredient_price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${ingredientBurgerStyle.text} text text_type_main-default`}>{ingredient.name}</p>
    </div>
  );
}

IngredientBurger.propType = {
  ingredient: ingredientPropType.isRequired
}

export default IngredientBurger;


    