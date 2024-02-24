import { updateUser } from "../../utils/api";
import { AppThunk, AppDispatch } from "../../utils/store-types";
import { TUser } from "../../utils/types";
  
export const UPDATE_USER_FEED: "UPDATE_USER_FEED" = "UPDATE_USER_FEED";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export interface IUpdateUserFeedAction {
  readonly type: typeof UPDATE_USER_FEED;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

const updateUserFeedAction = (): IUpdateUserFeedAction => ({
  type: UPDATE_USER_FEED
});

const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user
});

const updateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED
});

export type TUpdateUserActions = 
  | IUpdateUserFeedAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction

  export const updateUserFeedThunk: AppThunk = (emailUser: string, nameUser: string) => (dispatch: AppDispatch) => {
  dispatch(updateUserFeedAction())
  updateUser(emailUser, nameUser) 
    .then((res) => {
      if (res && res.success) {
        dispatch(updateUserSuccessAction(res.user))
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(updateUserFailedAction())
      }
    })
    .catch(() => {
      dispatch(updateUserFailedAction())
    })
} 