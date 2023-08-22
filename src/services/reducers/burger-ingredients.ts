import { GET_INGREDIENTS_FEED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../actions/burger-ingredients";
import { TBurgerIngredientsActions } from "../../services/actions/burger-ingredients";
import { TIngredient } from "../../utils/types";

type TBurgerIngredients = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: ReadonlyArray<TIngredient>;
} 

let initialState: TBurgerIngredients = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: []
}

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredients => {
  switch (action.type) {
    case GET_INGREDIENTS_FEED: {
      return {
        ...state,
        ingredientsRequest: true, //Запрос начал выполняться
        ingredientsFailed: false, //Статус наличия ошибок
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        ingredients: action.ingredients, 
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
        ...state, 
        ingredients: [],
        ingredientsFailed: true, 
        ingredientsRequest: false 
      };
    }
    default: {
      return state
    }
  }
} 