import { updateUser } from "../../utils/api";
  
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
        dispatch({
          type: UPDATE_USER_FAILED
        })
      })
  }
} 