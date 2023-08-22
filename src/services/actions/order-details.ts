import { postIngredients } from "../../utils/api";
import { clearConstructor } from "./burger-constructor";
import { AppThunk, AppDispatch } from "../../utils/store-types";
import { TBurgerComponent, TOrder } from "../../utils/types";
  
export const CREATE_ORDER_FEED: "CREATE_ORDER_FEED" = "CREATE_ORDER_FEED";
export const CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS"  = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED" = "CREATE_ORDER_FAILED";

export interface ICreateOrderFeedAction {
  readonly type: typeof CREATE_ORDER_FEED;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly orderNumber: TOrder
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

const createOrderFeedAction = (): ICreateOrderFeedAction => ({
  type: CREATE_ORDER_FEED
});

const createOrderSuccessAction  = (orderNumber: TOrder): ICreateOrderSuccessAction  => ({
  type: CREATE_ORDER_SUCCESS,
  orderNumber
});

const createOrderFailedAction = (): ICreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED
});

export type TCreateOrderActions = 
  | ICreateOrderFeedAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction

export const createOrderFeedThunk: AppThunk =  (arrayIngredients: TBurgerComponent[]) => (dispatch: AppDispatch) => {
  dispatch(createOrderFeedAction())
  postIngredients(arrayIngredients) 
    .then((res) => {
      if (res && res.success) {
        dispatch(createOrderSuccessAction(res.order))
        dispatch(clearConstructor())
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(createOrderFailedAction())
      }
    })
    .catch(() => {
      dispatch(createOrderFailedAction())
      dispatch(clearConstructor())
    })
} 