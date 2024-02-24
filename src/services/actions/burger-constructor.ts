import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENT: 'SORT_INGREDIENT' = 'SORT_INGREDIENT';
export const СLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TIngredient;
  readonly _id: string;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly _id: string;
}

export interface ISortIngredient {
  readonly type: typeof SORT_INGREDIENT;
  readonly id: string;
  readonly swappableId: string;
}

export interface IClearIngredient {
  readonly type: typeof СLEAR_CONSTRUCTOR;
}

export type TConstructorActions = 
  | IAddIngredient
  | IDeleteIngredient
  | ISortIngredient
  | IClearIngredient

export const addIngredient = (item: TIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT,
  item,
  _id: uuidv4()
})

export const deleteIngredient = (_id: string): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
   _id
})

export const sortIngredient = (id: string, swappableId: string): ISortIngredient => ({
  type: SORT_INGREDIENT,
  id, 
  swappableId
})

export const clearConstructor = (): IClearIngredient => ({
  type: СLEAR_CONSTRUCTOR
})
