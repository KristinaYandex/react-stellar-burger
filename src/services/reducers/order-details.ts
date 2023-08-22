import { CREATE_ORDER_FEED, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, TCreateOrderActions } from "../actions/order-details";
import { TOrder } from "../../utils/types";

type TOrderDetails = {
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
  orderNumber: TOrder | null;
} 

let initialState: TOrderDetails = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orderNumber: null
}

export const orderDetailsReducer = (state = initialState, action: TCreateOrderActions): TOrderDetails => {
  switch (action.type) {
    case CREATE_ORDER_FEED: {
      return {
        ...state,
        orderDetailsRequest: true, //Запрос начал выполняться
        orderDetailsFailed: false, //Статус наличия ошибок
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return { 
        ...state, 
        orderNumber: action.orderNumber, 
        orderDetailsRequest: false,
        orderDetailsFailed: false,
      };
    }
    case CREATE_ORDER_FAILED: {
      return { 
        ...state, 
        orderNumber: null,
        orderDetailsFailed: true, 
        orderDetailsRequest: false 
      };
    }
    default: {
      return state
    }
  }
} 