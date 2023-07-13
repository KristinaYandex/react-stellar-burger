import { LOGOUT_FEED, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../actions/logout";
  
let initialState = {
  logoutRequest: false,
  logoutFailed: false,
}

export const loginReducer = (state = initialState, action) => {
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