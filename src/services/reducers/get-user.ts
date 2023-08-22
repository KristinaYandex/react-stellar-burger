import { GET_USER_FEED, GET_USER_SUCCESS, GET_USER_FAILED, TGetUserActions } from "../actions/get-user";
import { TUser } from "../../utils/types";
  
type TGetUserPassword = {
  getUserRequest: boolean;
  getUserFailed: boolean;
  user: TUser | null;
  isAuthChecked: boolean;
} 

let initialState: TGetUserPassword = {
  user: null,
  getUserRequest: false,
  getUserFailed: false,
  isAuthChecked: false
}

export const getUserReducer = (state = initialState, action: TGetUserActions): TGetUserPassword => {
  switch (action.type) {
    case GET_USER_FEED: {
      return {
        ...state,
        getUserRequest: true, //Запрос начал выполняться
        getUserFailed: false, //Статус наличия ошибок
        isAuthChecked: false,
      };
    }
    case GET_USER_SUCCESS: {
      return { 
        ...state, 
        user: action.user,
        getUserRequest: false,
        getUserFailed: false,
        isAuthChecked: true,
      };
    }
    case GET_USER_FAILED: {
      return { 
        ...state, 
        getUserRequest: false, 
        getUserFailed: true,
        isAuthChecked: true,
      };
    }
    default: {
      return state
    }
  }
}