import { CREATE_ORDER_FEED, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED } from "../actions/order-details";

let initialState = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orderNumber: null
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_FEED: {
      console.debug("action:", action)
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