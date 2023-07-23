import { logOutOfSystem } from "../../utils/api";
import { deleteCookie } from "../../utils/cookie";
import { GET_USER_SUCCESS } from "./get-user";
  
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
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          dispatch({
            type: LOGOUT_SUCCESS,
          })
          dispatch({
            type: GET_USER_SUCCESS,
            user: null
          })
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