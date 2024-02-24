import { authorizationUser } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { AppThunk, AppDispatch } from "../../utils/store-types";
import { TUser } from "../../utils/types";
  
export const AUTHORIZATION_USER_FEED: "AUTHORIZATION_USER_FEED" = "AUTHORIZATION_USER_FEED";
export const AUTHORIZATION_USER_SUCCESS: "AUTHORIZATION_USER_SUCCESS" = "AUTHORIZATION_USER_SUCCESS";
export const AUTHORIZATION_USER_FAILED: "AUTHORIZATION_USER_FAILED" = "AUTHORIZATION_USER_FAILED";

export interface IAuthorizationUserFeedAction {
  readonly type: typeof AUTHORIZATION_USER_FEED;
}

export interface IAuthorizationUserSuccessAction {
  readonly type: typeof AUTHORIZATION_USER_SUCCESS;
  readonly user: TUser;
}

export interface IAuthorizationUserFailedAction {
  readonly type: typeof AUTHORIZATION_USER_FAILED;
}

const authorizationUserFeedAction = (): IAuthorizationUserFeedAction => ({
  type: AUTHORIZATION_USER_FEED
});

const authorizationUserSuccessAction = (user: TUser): IAuthorizationUserSuccessAction => ({
  type: AUTHORIZATION_USER_SUCCESS,
  user
});

const authorizationUserFailedAction = (): IAuthorizationUserFailedAction => ({
  type: AUTHORIZATION_USER_FAILED
});

export type TAuthorizationUserActions = 
  | IAuthorizationUserFeedAction
  | IAuthorizationUserSuccessAction
  | IAuthorizationUserFailedAction

export const authorizationFeedThunk: AppThunk = (emailUser: string, passwordUser: string) => (dispatch: AppDispatch) => {
  dispatch(authorizationUserFeedAction())
  authorizationUser(emailUser, passwordUser) 
    .then((res) => {
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split('Bearer ')[1], {});
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(authorizationUserSuccessAction(res.user))
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(authorizationUserFailedAction())
      }
    })
    .catch(() => {
      dispatch(authorizationUserFailedAction())
    })
} 
