import { createUser } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
  
export const CREATE_USER_FEED = "CREATE_USER_FEED";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";

export function registerFeed(emailUser, passwordUser, nameUser) {
  return function(dispatch) {
    dispatch({
      type: CREATE_USER_FEED
    })
    createUser(emailUser, passwordUser, nameUser) 
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: CREATE_USER_SUCCESS,
            user: res.user
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: CREATE_USER_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: CREATE_USER_FAILED
        })
      })
  }
} 