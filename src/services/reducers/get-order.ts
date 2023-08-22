import { GET_ORDER_FEED, GET_ORDER_SUCCESS, GET_ORDER_FAILED, TGetOrdersActions } from "../actions/get-order";
import { TOrder } from "../../utils/types";

type TForgotPassword = {
  orderDetailsRequest: boolean,
  orderDetailsFailed: boolean,
  orders: TOrder[];
} 

let initialState: TForgotPassword = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orders: []
}

export const ordersReducer = (state = initialState, action: TGetOrdersActions): TForgotPassword => {
  switch (action.type) {
    case GET_ORDER_FEED: {
      return {
        ...state,
        orderDetailsRequest: true, //Запрос начал выполняться
        orderDetailsFailed: false, //Статус наличия ошибок
      };
    }
    case GET_ORDER_SUCCESS: {
      return { 
        ...state, 
        orders: action.orders, 
        orderDetailsRequest: false,
        orderDetailsFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { 
        ...state, 
        orders: [],
        orderDetailsFailed: true, 
        orderDetailsRequest: false 
      };
    }
    default: {
      return state
    }
  }
} 