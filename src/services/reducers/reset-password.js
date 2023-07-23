import { RESET_PASSWORD_FEED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from "../actions/reset-password";
  
let initialState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_FEED: {
      return {
        ...state,
        resetPasswordRequest: true, //Запрос начал выполняться
        resetPasswordFailed: false, //Статус наличия ошибок
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { 
        ...state, 
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return { 
        ...state, 
        resetPasswordRequest: false, 
        resetPasswordFailed: true
      };
    }
    default: {
      return state
    }
  }
}