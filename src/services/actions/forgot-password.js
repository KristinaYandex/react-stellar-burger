import { forgotPassword } from "../../utils/api";
  
export const FORGOT_PASSWORD_FEED = "FORGOT_PASSWORD_FEED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export function forgotPasswordFeed(emailUser) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_FEED
    })
    forgotPassword(emailUser) 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: FORGOT_PASSWORD_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        })
      })
  }
} 