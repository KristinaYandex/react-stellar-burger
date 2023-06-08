import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';
export const SUM_INGREDIENT = 'SUM_INGREDIENT';

export function addIngredient(item) {
  return {
    type: ADD_INGREDIENT,
    payload: {...item, id: uuidv4()}
  }
}

export function deleteIngredient(_id) {
  return {
    type: DELETE_INGREDIENT,
    payload: _id
  }
}

export function sortIngredient(id, swappableId) {
  return {
    type: SORT_INGREDIENT,
    payload: { id, swappableId }
  }
}
