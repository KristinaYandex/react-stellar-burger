import { FORGOT_PASSWORD_FEED, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, TForgotPasswordActions } from "../actions/forgot-password";
  
type TForgotPassword = {
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  success: boolean;
} 

let initialState: TForgotPassword = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  success: false
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): TForgotPassword => {
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
        success: true,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false
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