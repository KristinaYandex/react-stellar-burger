import { LOGOUT_FEED, LOGOUT_SUCCESS, LOGOUT_FAILED, TLogoutUserActions } from "../actions/logout";
import { TUser } from "../../utils/types";
  
type TLogout = {
  logoutRequest: boolean;
  logoutFailed: boolean;
  user: TUser | null;
} 

let initialState: TLogout = {
  user: { name: "", email: "" },
  logoutRequest: false,
  logoutFailed: false,
}

export const logoutReducer = (state = initialState, action: TLogoutUserActions): TLogout => {
  switch (action.type) {
    case LOGOUT_FEED: {
      return {
        ...state,
        logoutRequest: true, //Запрос начал выполняться
        logoutFailed: false, //Статус наличия ошибок
      };
    }
    case LOGOUT_SUCCESS: {
      return { 
        ...state, 
        user: null,
        logoutRequest: false,
        logoutFailed: false,
      };
    }
    case LOGOUT_FAILED: {
      return { 
        ...state, 
        logoutRequest: false, 
        logoutFailed: true
      };
    }
    default: {
      return state
    }
  }
}