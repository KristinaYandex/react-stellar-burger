import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { updateTokenReducer } from './update-token';
import { getUserReducer } from "./get-user";
import { updateUserReducer } from "./update-user";
import { feedReducer } from "./feed.ws";
import { feedReducerProfile } from "./feed-profile.ws";
import { ordersReducer } from "./get-order";
import { logoutReducer } from "./logout";

export const rootReducer = combineReducers({
   burgerIngredientsReducer: burgerIngredientsReducer,
   burgerConstructorReducer: burgerConstructorReducer,
   ingredientDetailsReducer: ingredientDetailsReducer,
   orderDetailsReducer: orderDetailsReducer,
   forgotPasswordReducer: forgotPasswordReducer,
   resetPasswordReducer: resetPasswordReducer,
   registerReducer: registerReducer,
   loginReducer: loginReducer,
   updateTokenReducer: updateTokenReducer, 
   getUserReducer: getUserReducer,
   updateUserReducer: updateUserReducer,
   feedReducer: feedReducer,
   feedReducerProfile: feedReducerProfile,
   ordersReducer: ordersReducer,
   logoutReducer: logoutReducer
})

export type TStore = ReturnType<typeof rootReducer>