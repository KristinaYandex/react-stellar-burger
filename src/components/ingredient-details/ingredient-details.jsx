import ingredientDetails from "./ingredient-details.module.css";
import {ingredientPropType} from "../../utils/prop-types";

function IngredientDetails({ingredient}) {
  return (
    <div className={ingredientDetails.container}>
      <img src={ingredient.image_large} alt={ingredient.name}></img>
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <ul className={ingredientDetails.list}>
        <li className={ingredientDetails.value}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li className={ingredientDetails.value}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li className={ingredientDetails.value}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li className={ingredientDetails.value}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}
  
IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
}

export default IngredientDetails;