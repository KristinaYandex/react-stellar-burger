import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsReducer } from "./burger-ingredients.js";
import { burgerConstructorReducer } from "./burger-constructor.js";
import { ingredientDetailsReducer } from "./ingredient-details.js";
import { orderDetailsReducer } from "./order-details.js";

export const rootReducer = combineReducers({
   burgerIngredientsReducer: burgerIngredientsReducer,
   burgerConstructorReducer: burgerConstructorReducer,
   ingredientDetailsReducer: ingredientDetailsReducer,
   orderDetailsReducer: orderDetailsReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store