import { forwardRef } from "react"
import burgerComponents from "./burger-components.module.css";
import IngredientBurger from "../ingredient-burger/ingredient-burger";
import { useHistory, useLocation } from 'react-router-dom';
import { TIngredient, TBurgerComponent } from "../../utils/types";

const BurgerComponents = forwardRef<HTMLInputElement, TBurgerComponent>(({ingredients}, ref) => {
  const location = useLocation();
  const history = useHistory();

  const openModal = (item: TIngredient) => {
    history.replace(`/ingredients/${item._id}`, {background: location})
  }

  return (
    <div className={burgerComponents.ingredient_list} ref={ref}>
      {ingredients.map((ingredient: TIngredient) => (
        <IngredientBurger 
          key={ingredient._id} 
          ingredient={ingredient} 
          onClick={() => openModal(ingredient)} 
        />
      ))}
    </div>
  );
})


export default BurgerComponents;
