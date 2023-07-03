import { updateUser } from "../../utils/api";
import { updateTokenFeed } from "../../services/actions/update-token";
  
export const UPDATE_USER_FEED = "UPDATE_USER_FEED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export function updateUserFeed(emailUser, nameUser) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_FEED
    })
    updateUser(emailUser, nameUser) 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: UPDATE_USER_FAILED
          })
        }
      })
      .catch(() => {
        if (localStorage.getItem("refreshToken")) {
          dispatch(updateTokenFeed());
          dispatch(updateUserFeed(emailUser, nameUser));
        } else {
          dispatch({
            type: UPDATE_USER_FAILED
          })
        }
      })
  }
} 