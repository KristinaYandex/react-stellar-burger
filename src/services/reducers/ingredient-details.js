import { OPEN_INGREDIENT, CLOSE_INGREDIENT } from "../actions/ingredient-details";

let initialState = {
  ingredientDetails: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
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