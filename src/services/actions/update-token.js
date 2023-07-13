import { updateToken } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
  
export const UPDATE_TOKEN_FEED = "UPDATE_TOKEN_FEED";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export function updateTokenFeed() {
  return function(dispatch) {
    dispatch({
      type: UPDATE_TOKEN_FEED
    })
    updateToken() 
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split('Bearer ')[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: UPDATE_TOKEN_SUCCESS
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: UPDATE_TOKEN_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: UPDATE_TOKEN_FAILED
        })
      })
  }
} 