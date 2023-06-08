import { postIngredients } from "../../utils/api";
  
export const CREATE_ORDER_FEED = "CREATE_ORDER_FEED";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export function createOrderFeed(arrayIngredients) {
  return function(dispatch) {
    dispatch({
      type: CREATE_ORDER_FEED
    })
    postIngredients(arrayIngredients) 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            orderNumber: res.order
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: CREATE_ORDER_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: CREATE_ORDER_FAILED
        })
      })
  }
} 