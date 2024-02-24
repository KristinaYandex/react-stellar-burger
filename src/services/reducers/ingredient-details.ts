import { OPEN_INGREDIENT, CLOSE_INGREDIENT, TIngredientDetailsActions } from "../actions/ingredient-details";
import { TIngredient } from "../../utils/types";

type TIngredientDetails = {
  ingredientDetails: TIngredient | null;
}

let initialState: TIngredientDetails = {
  ingredientDetails: null
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case OPEN_INGREDIENT: {
      return {
        ...state,
        ingredientDetails: action.ingredientDetails
      }
    }
    case CLOSE_INGREDIENT: {
      return {
        ...state,
        ingredientDetails: null
      }
    }
    default: {
      return state;
    }
  }
}