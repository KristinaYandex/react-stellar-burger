import { resetPassword } from "../../utils/api";

export const RESET_PASSWORD_FEED = "RESET_PASSWORD_FEED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export function resetPasswordFeed(passwordUser, tokenUser) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_FEED
    })
    resetPassword(passwordUser, tokenUser) 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: RESET_PASSWORD_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        })
      })
  }
} 