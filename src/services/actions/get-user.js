import { getUser } from "../../utils/api";
import { updateTokenFeed } from "../../services/actions/update-token";
  
export const GET_USER_FEED = "GET_USER_FEED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export function getUserFeed() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_FEED
    })
    getUser() 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: GET_USER_FAILED
          })
        }
      })
      .catch(() => {
        if (localStorage.getItem("refreshToken")) {
          dispatch(updateTokenFeed());
          dispatch(getUserFeed());
        } else {
          dispatch({
            type: GET_USER_FAILED
          })
        }
      })
  }
} 