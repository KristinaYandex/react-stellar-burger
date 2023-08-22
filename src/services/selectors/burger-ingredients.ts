import { TStore } from "../reducers/index"

export const getIngredients = (store: TStore) => store.burgerIngredientsReducer.ingredients;
export const getIngredientsRequest = (store: TStore) => store.burgerIngredientsReducer.ingredientsRequest;
export const getIngredientsFailed = (store: TStore) => store.burgerIngredientsReducer.ingredientsFailed;