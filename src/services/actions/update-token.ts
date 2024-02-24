import { updateToken } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { AppThunk, AppDispatch } from "../../utils/store-types";
  
export const UPDATE_TOKEN_FEED: "UPDATE_TOKEN_FEED" = "UPDATE_TOKEN_FEED";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

export interface IUpdateTokenFeedAction {
  readonly type: typeof UPDATE_TOKEN_FEED;
}

export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

const updateTokenFeedAction = (): IUpdateTokenFeedAction => ({
  type: UPDATE_TOKEN_FEED
});

const updateTokenSuccessAction = (): IUpdateTokenSuccessAction => ({
  type: UPDATE_TOKEN_SUCCESS
});

const updateTokenFailedAction = (): IUpdateTokenFailedAction => ({
  type: UPDATE_TOKEN_FAILED
});

export type TUpdateTokenActions = 
  | IUpdateTokenFeedAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction

export const updateTokenFeedThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(updateTokenFeedAction())
  updateToken() 
    .then((res) => {
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split('Bearer ')[1], {});
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(updateTokenSuccessAction())
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(updateTokenFailedAction())
      }
    })
    .catch(() => {
      dispatch(updateTokenFailedAction())
    })
} 