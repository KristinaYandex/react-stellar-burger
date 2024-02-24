import { getUser } from "../../utils/api";
import { AppThunk, AppDispatch } from "../../utils/store-types";
import { TUser } from "../../utils/types";
  
export const GET_USER_FEED: "GET_USER_FEED" = "GET_USER_FEED";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export interface IGetUserFeedAction {
  readonly type: typeof GET_USER_FEED;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

const getUserFeedAction = (): IGetUserFeedAction => ({
  type: GET_USER_FEED
});

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user
});

const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED
});

export type TGetUserActions = 
  | IGetUserFeedAction
  | IGetUserSuccessAction
  | IGetUserFailedAction

export const getUserFeedThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserFeedAction())
  getUser() 
    .then((res) => {
      if (res && res.success) {
        dispatch(getUserSuccessAction(res.user))
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(getUserFailedAction())
      }
    })
    .catch(() => {
      dispatch(getUserFailedAction())
    })
} 