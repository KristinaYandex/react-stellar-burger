import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_GET_FEED_MESSAGE, WS_CONNECTION_ERROR } from "../../services/actions/feed.ws";

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  total: null,
  totalToday: null
};
  
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
  
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
  
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
          // Обработка происходит, когда с сервера возвращаются данные
          // В orders передадим данные, которые пришли с сервера
    case WS_GET_FEED_MESSAGE:
      const parsedData = JSON.parse(action.payload);
      return {
        ...state,
        error: undefined,
        orders: [...state.orders, ...parsedData.orders],
        total: action.payload,
        totalToday: action.payload
    };
    default:
      return state;
    }
  }; 