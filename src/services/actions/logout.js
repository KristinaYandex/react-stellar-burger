import { logOutOfSystem } from "../../utils/api";
import { deleteCookie } from "../../utils/cookie";
  
export const LOGOUT_FEED = "LOGOUT_FEED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export function logOutFeed(onSuccess) {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_FEED
    })
    logOutOfSystem() 
      .then((res) => {
        if (res && res.success) {
          deleteCookie("token");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: LOGOUT_SUCCESS,
          })
          console.debug("logout success!")
          onSuccess()
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: LOGOUT_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILED
        })
      })
  }
} 