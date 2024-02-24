import { createUser } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { getUserSuccessAction } from "./get-user";
import { AppThunk, AppDispatch } from "../../utils/store-types";
import { TUser } from "../../utils/types";
  
export const CREATE_USER_FEED: "CREATE_USER_FEED" = "CREATE_USER_FEED";
export const CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS" = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED: "CREATE_USER_FAILED" = "CREATE_USER_FAILED";

export interface ICreateUserFeedAction {
  readonly type: typeof CREATE_USER_FEED;
}

export interface ICreateUserSuccessAction {
  readonly type: typeof CREATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface ICreateUserFailedAction {
  readonly type: typeof CREATE_USER_FAILED;
}

const createUserFeedAction = (): ICreateUserFeedAction => ({
  type: CREATE_USER_FEED
});

const createUserSuccessAction = (user: TUser): ICreateUserSuccessAction => ({
  type: CREATE_USER_SUCCESS,
  user
});

const createUserFailedAction = (): ICreateUserFailedAction => ({
  type: CREATE_USER_FAILED
});

export type TCreateUserActions = 
  | ICreateUserFeedAction
  | ICreateUserSuccessAction
  | ICreateUserFailedAction

export const registerFeedThunk: AppThunk = (emailUser: string, passwordUser: string, nameUser: string) => (dispatch: AppDispatch) => {
  dispatch(createUserFeedAction())
  createUser(emailUser, passwordUser, nameUser) 
    .then((res) => {
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split('Bearer ')[1], {});
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(createUserSuccessAction(res.user))
        dispatch(getUserSuccessAction(res.user))
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(createUserFailedAction())
      }
    })
    .catch(() => {
      dispatch(createUserFailedAction())
    })
} 