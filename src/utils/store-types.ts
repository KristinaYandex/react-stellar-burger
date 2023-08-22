import  generalStore from '../services/store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Dispatch } from 'redux';
import { TConstructorActions } from '../services/actions/burger-constructor';
import { TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import { TForgotPasswordActions } from '../services/actions/forgot-password';
import { TGetOrdersActions } from '../services/actions/get-order';
import { TGetUserActions } from '../services/actions/get-user';
import { TAuthorizationUserActions } from '../services/actions/login';
import { TLogoutUserActions } from '../services/actions/logout';
import { TCreateOrderActions } from '../services/actions/order-details';
import { TCreateUserActions } from '../services/actions/register';
import { TResetPasswordActions } from '../services/actions/reset-password';
import { TUpdateTokenActions } from '../services/actions/update-token';
import { TUpdateUserActions } from '../services/actions/update-user';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Типизация всех экшенов приложения
type TApplicationActions = 
 | TConstructorActions
 | TBurgerIngredientsActions
 | TForgotPasswordActions
 | TGetOrdersActions
 | TGetUserActions
 | TAuthorizationUserActions
 | TLogoutUserActions
 | TCreateOrderActions
 | TCreateUserActions
 | TResetPasswordActions
 | TUpdateTokenActions
 | TUpdateUserActions

//Описание всех ветвей состояния редьюсеров
export type RootState = ReturnType<typeof generalStore.getState>;

// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 

//Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>;
