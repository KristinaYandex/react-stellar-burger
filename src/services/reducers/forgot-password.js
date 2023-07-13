import { FORGOT_PASSWORD_FEED, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from "../actions/forgot-password";
  
let initialState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_FEED: {
      return {
        ...state,
        forgotPasswordRequest: true, //Запрос начал выполняться
        forgotPasswordFailed: false, //Статус наличия ошибок
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return { 
        ...state, 
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return { 
        ...state, 
        forgotPasswordRequest: false, 
        forgotPasswordFailed: true
      };
    }
    default: {
      return state
    }
  }
}