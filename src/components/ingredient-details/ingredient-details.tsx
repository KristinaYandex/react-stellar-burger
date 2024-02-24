import ingredientDetailsStyle from "./ingredient-details.module.css";
import { useSelector } from '../../utils/store-types'
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/selectors/burger-ingredients";
import { FunctionComponent } from 'react';
import { IId } from "../../utils/types";

const IngredientDetails: FunctionComponent = () => {
  const {id} = useParams<IId>();

  const burgerIngredients = useSelector(getIngredients);
  
  const ingredient = burgerIngredients?.find((item) => item._id === id);

  if (!ingredient) return null

  return (
    <div className={ingredientDetailsStyle.container}>
      <img src={ingredient.image_large} alt={ingredient.name}></img>
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <ul className={ingredientDetailsStyle.list}>
        <li className={ingredientDetailsStyle.value}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li className={ingredientDetailsStyle.value}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li className={ingredientDetailsStyle.value}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li className={ingredientDetailsStyle.value}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;