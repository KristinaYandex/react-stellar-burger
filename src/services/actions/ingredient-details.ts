import { TIngredient } from "../../utils/types";

export const OPEN_INGREDIENT: "OPEN_INGREDIENT" = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT: "CLOSE_INGREDIENT" = "CLOSE_INGREDIENT";

export interface IVisibleIngredient {
  readonly type: typeof OPEN_INGREDIENT;
  readonly ingredientDetails: TIngredient;
}

export interface ICloseIngredient {
  readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientDetailsActions = 
  | IVisibleIngredient
  | ICloseIngredient

export const visibleIngredient = (ingredientDetails: TIngredient): IVisibleIngredient => ({
  type: OPEN_INGREDIENT,
  ingredientDetails
})

export const closeIngredient = (): ICloseIngredient => ({
  type: CLOSE_INGREDIENT
})