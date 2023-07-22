import { getOrderNumber } from "../../utils/api";
  
export const GET_ORDER_FEED = "GET_ORDER_FEED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getHiddenOrders(orderNum) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_FEED
    })
    getOrderNumber(orderNum) 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orders: res.orders
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: GET_ORDER_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED
        })
      })
  }
} 