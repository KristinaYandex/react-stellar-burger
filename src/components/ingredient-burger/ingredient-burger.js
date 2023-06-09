import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientBurgerStyle from "./ingredient-burger.module.css";
import {ingredientPropType} from "../../utils/prop-types.js";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const IngredientBurger = ({ingredient, onClick}) => {

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient
})

  const getBun = (store) => store.burgerConstructorReducer.bun;
  const bun = useSelector(getBun);
  const getMainAndSauce = (store) => store.burgerConstructorReducer.mainAndSauce;
  const mainAndSauce = useSelector(getMainAndSauce);

  const counterMainAndSauce = useMemo(() => {
    return mainAndSauce.filter(item => item._id === ingredient._id).length
  }, [mainAndSauce, ingredient._id])

  const counterBun = useMemo(() => {
    if (bun !== null && bun._id === ingredient._id) {
      return 2;
    } else if (bun === null) {
      return 0;
    }
  }, [bun, ingredient._id])

  return (
    <div className={ingredientBurgerStyle.ingredient} onClick={onClick} ref={dragRef}>
      {ingredient.type === "bun" ? (
        <Counter count={counterBun} size="default" extraClass="m-1" />
      ) : (
        <Counter count={counterMainAndSauce} size="default" extraClass="m-1" />
      )}
      <img src={ingredient.image} alt="Ингредиент" />
        <div className={ingredientBurgerStyle.ingredient_price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${ingredientBurgerStyle.text} text text_type_main-default`}>{ingredient.name}</p>
    </div>
  );
}

IngredientBurger.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired
}

export default IngredientBurger;