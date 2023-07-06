import { forwardRef } from "react"
import burgerComponents from "./burger-components.module.css";
import IngredientBurger from "../ingredient-burger/ingredient-burger";
import {ingredientPropType} from "../../utils/prop-types"
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { visibleIngredient } from "../../services/actions/ingredient-details";
import { useHistory } from 'react-router-dom';

const BurgerComponents = forwardRef(({ingredients}, ref) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const openModal = (item) => {
    dispatch(visibleIngredient(item));
    history.push(`/ingredients/${item._id}`);
    console.log("!");
  }

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
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerComponents;
