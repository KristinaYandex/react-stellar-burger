import { AUTHORIZATION_USER_FEED, AUTHORIZATION_USER_SUCCESS, AUTHORIZATION_USER_FAILED, TAuthorizationUserActions } from "../actions/login";
import { TUser } from "../../utils/types";

type TLogin = {
  authorizationUserRequest: boolean;
  authorizationUserFailed: boolean;
  user: TUser | null;
} 
  
let initialState: TLogin = {
  user: null,
  authorizationUserRequest: false,
  authorizationUserFailed: false
}

export const loginReducer = (state = initialState, action: TAuthorizationUserActions): TLogin => {
  switch (action.type) {
    case AUTHORIZATION_USER_FEED: {
      return {
        ...state,
        authorizationUserRequest: true, //Запрос начал выполняться
        authorizationUserFailed: false, //Статус наличия ошибок
      };
    }
    case AUTHORIZATION_USER_SUCCESS: {
      return { 
        ...state, 
        user: action.user,
        authorizationUserRequest: false,
        authorizationUserFailed: false
      };
    }
    case AUTHORIZATION_USER_FAILED: {
      return { 
        ...state, 
        authorizationUserRequest: false, 
        authorizationUserFailed: true
      };
    }
    default: {
      return state
    }
  }
}