import { authorizationUser } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
  
export const AUTHORIZATION_USER_FEED = "AUTHORIZATION_USER_FEED";
export const AUTHORIZATION_USER_SUCCESS = "AUTHORIZATION_USER_SUCCESS";
export const AUTHORIZATION_USER_FAILED = "AUTHORIZATION_USER_FAILED";

export function authorizationFeed(emailUser, passwordUser) {
  return function(dispatch) {
    dispatch({
      type: AUTHORIZATION_USER_FEED
    })
    authorizationUser(emailUser, passwordUser) 
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split('Bearer ')[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: AUTHORIZATION_USER_SUCCESS,
            user: res.user
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: AUTHORIZATION_USER_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: AUTHORIZATION_USER_FAILED
        })
      })
  }
} 
