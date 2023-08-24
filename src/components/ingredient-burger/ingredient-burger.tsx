import { useMemo } from 'react';
import { useSelector } from '../../utils/store-types'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientBurgerStyle from "./ingredient-burger.module.css";
import { useDrag } from "react-dnd";
import { getBun, getMainAndSauce } from "../../services/selectors/burger-constructor";
import { FunctionComponent } from 'react';
import { IIngredient } from "../../utils/types";

interface TStringFunc extends IIngredient {
  onClick: (item: IIngredient) => void;
} 

const IngredientBurger: FunctionComponent<TStringFunc> = ({ingredient, onClick}) => {

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient
  })

  const bun = useSelector(getBun);
  const mainAndSauce = useSelector(getMainAndSauce);

  const counterMainAndSauce = useMemo(() => {
    return mainAndSauce.filter(item => item._id === ingredient._id).length
  }, [mainAndSauce, ingredient._id])

  const counterBun = useMemo((): number => {
    if (bun !== null && bun._id === ingredient._id) {
      return 2;
    }
    return 0;
  }, [bun, ingredient._id])

  return (
    <div className={ingredientBurgerStyle.ingredient} onClick={() => onClick} ref={dragRef}>
      {ingredient.type === "bun" ? (
        <Counter count={counterBun} size="default" extraClass="m-1" />
      ) : (
        <Counter count={counterMainAndSauce} size="default" extraClass="m-1" />
      )}
      <img src={ingredient.image} alt="Ингредиент" />
        <div className={ingredientBurgerStyle.ingredient_price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${ingredientBurgerStyle.text} text text_type_main-default`}>{ingredient.name}</p>
    </div>
  );
}

export default IngredientBurger;