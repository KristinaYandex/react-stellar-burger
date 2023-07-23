import { GET_ORDER_FEED, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/get-order";

let initialState = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orders: []
}

export const ordersReducer = (state = initialState, action) => {
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