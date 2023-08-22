import { getOrderNumber } from "../../utils/api";
import { TOrder } from "../../utils/types";
import { AppThunk, AppDispatch } from "../../utils/store-types";
  
export const GET_ORDER_FEED: "GET_ORDER_FEED" = "GET_ORDER_FEED";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export interface IGetOrderFeedAction {
  readonly type: typeof GET_ORDER_FEED;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orders: TOrder[];
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

const getOrderFeedAction = (): IGetOrderFeedAction => ({
  type: GET_ORDER_FEED
});

const getOrderSuccessAction = (orders: TOrder[]): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  orders
});

const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
});

export type TGetOrdersActions = 
  | IGetOrderFeedAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction

export const getHiddenOrdersThunk: AppThunk  = (orderNum: number) => (dispatch: AppDispatch) => {
  dispatch(getOrderFeedAction())
  getOrderNumber(orderNum) 
    .then((response) => response.json())
    .then((res) => {
      if (res && res.success) {
        dispatch(getOrderSuccessAction(res.orders)
        )
      } else {
          // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(getOrderFailedAction())
      }
    })
    .catch(() => {
      dispatch(getOrderFailedAction())
    })
} 