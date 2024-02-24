import { forgotPassword } from "../../utils/api";
import { AppThunk, AppDispatch } from "../../utils/store-types";
  
export const FORGOT_PASSWORD_FEED: "FORGOT_PASSWORD_FEED" = "FORGOT_PASSWORD_FEED";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

export interface IForgotPasswordFeedAction {
  readonly type: typeof FORGOT_PASSWORD_FEED;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

const forgotPasswordFeedAction = (): IForgotPasswordFeedAction => ({
  type: FORGOT_PASSWORD_FEED
});

const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type:FORGOT_PASSWORD_SUCCESS
});

const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED
});

export type TForgotPasswordActions = 
  | IForgotPasswordFeedAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction


export const forgotPasswordFeedThunk: AppThunk  = (emailUser: string, onSuccess) => (dispatch: AppDispatch) => {
  dispatch(forgotPasswordFeedAction())
  forgotPassword(emailUser) 
    .then((res) => {
      if (res && res.success) {
        dispatch(forgotPasswordSuccessAction())
        onSuccess()
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(forgotPasswordFailedAction())
      }
    })
    .catch(() => {
      dispatch(forgotPasswordFailedAction())
    })
} 