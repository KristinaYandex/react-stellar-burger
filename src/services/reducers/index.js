import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients.js';
import { burgerConstructorReducer } from './burger-constructor.js';
import { ingredientDetailsReducer } from './ingredient-details.js';
import { orderDetailsReducer } from './order-details.js';
import { forgotPasswordReducer } from './forgot-password.js';
import { resetPasswordReducer } from './reset-password.js';
import { registerReducer } from './register.js';
import { loginReducer } from './login.js';
import { updateTokenReducer } from './update-token.js';
import { getUserReducer } from "./get-user.js";
import { updateUserReducer } from "./update-user";
import { feedReducer } from "./feed.ws";
<<<<<<< HEAD
import { feedReducerProfile } from "./feed-profile.ws";
import { ordersReducer } from "./get-order";
=======
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7

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
<<<<<<< HEAD
   feedReducer: feedReducer,
   feedReducerProfile: feedReducerProfile,
   ordersReducer: ordersReducer 
=======
   feedReducer: feedReducer
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
})