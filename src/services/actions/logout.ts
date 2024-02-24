import { logOutOfSystem } from "../../utils/api";
import { deleteCookie } from "../../utils/cookie";
import { getUserSuccessAction } from "./get-user";
import { AppThunk, AppDispatch } from "../../utils/store-types";
  
export const LOGOUT_FEED: "LOGOUT_FEED" = "LOGOUT_FEED";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export interface ILogoutFeedAction {
  readonly type: typeof LOGOUT_FEED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

const logoutFeedAction = (): ILogoutFeedAction => ({
  type: LOGOUT_FEED
});

const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
});

const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
});

export type TLogoutUserActions = 
  | ILogoutFeedAction
  | ILogoutSuccessAction
  | ILogoutFailedAction

export const logOutFeedThunk: AppThunk = (onSuccess) => (dispatch: AppDispatch) => {
  dispatch(logoutFeedAction())
  logOutOfSystem() 
    .then((res) => {
      if (res && res.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(logoutSuccessAction())
        dispatch(getUserSuccessAction(res.user))
        onSuccess()
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(logoutFailedAction())
      }
    })
    .catch(() => {
      dispatch(logoutFailedAction())
    })
} 