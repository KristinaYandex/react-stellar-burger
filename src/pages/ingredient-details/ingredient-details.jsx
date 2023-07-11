import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import ingredientDetailsStyle from "./ingredient-details.module.css";

export function IngredientDetailsPage() {
 
  return (
    <main>
      <div>
        <h2 className={ingredientDetailsStyle.heading}>Детали ингредиента</h2>
        <IngredientDetails />
      </div>
    </main>
  )
}
