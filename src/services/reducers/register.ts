import { CREATE_USER_FEED, CREATE_USER_SUCCESS, CREATE_USER_FAILED, TCreateUserActions } from "../actions/register";
import { TUser } from "../../utils/types";

type TRegister = {
  createUserRequest: boolean;
  createUserFailed: boolean;
  user: TUser | null;
} 
  
let initialState: TRegister = {
  createUserRequest: false,
  createUserFailed: false,
  user: null
}

export const registerReducer = (state = initialState, action: TCreateUserActions): TRegister => {
  switch (action.type) {
    case CREATE_USER_FEED: {
      return {
        ...state,
        createUserRequest: true, //Запрос начал выполняться
        createUserFailed: false, //Статус наличия ошибок
      };
    }
    case CREATE_USER_SUCCESS: {
      return { 
        ...state, 
        user: action.user,
        createUserRequest: false,
        createUserFailed: false
      };
    }
    case CREATE_USER_FAILED: {
      return { 
        ...state, 
        createUserRequest: false, 
        createUserFailed: true
      };
    }
    default: {
      return state
    }
  }
}