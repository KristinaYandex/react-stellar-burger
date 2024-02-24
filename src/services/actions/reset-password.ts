import { resetPassword } from "../../utils/api";
import { AppThunk, AppDispatch } from "../../utils/store-types";

export const RESET_PASSWORD_FEED: "RESET_PASSWORD_FEED" = "RESET_PASSWORD_FEED";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export interface IResetPasswordFeedAction {
  readonly type: typeof RESET_PASSWORD_FEED;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

const resetPasswordFeedAction = (): IResetPasswordFeedAction => ({
  type: RESET_PASSWORD_FEED
});

const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS
});

const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED
});

export type TResetPasswordActions = 
  | IResetPasswordFeedAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction

  export const resetPasswordFeedThunk: AppThunk =(passwordUser: string, tokenUser: string) => (dispatch: AppDispatch) => {
  dispatch(resetPasswordFeedAction())
  resetPassword(passwordUser, tokenUser) 
    .then((res) => {
      if (res && res.success) {
        dispatch(resetPasswordSuccessAction())
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(resetPasswordFailedAction())
      }
    })
    .catch(() => {
      dispatch(resetPasswordFailedAction())
    })
} 