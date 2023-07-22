<<<<<<< HEAD
import { wsConnecting, wsOpen, wsClose, wsMessage, wsError } from "../../services/actions/feed.ws";
import { WebsocketStatus } from '../../utils/feed-status';

const initialState = {
  status: WebsocketStatus.OFFLINE,
=======
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_GET_FEED_MESSAGE, WS_CONNECTION_ERROR } from "../../services/actions/feed.ws";

const initialState = {
  wsConnected: false,
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
  orders: [],
  error: undefined,
  total: null,
  totalToday: null
};
  
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
<<<<<<< HEAD
    case wsConnecting.type:
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.CONNECTING
      };

    case wsOpen.type:
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.ONLINE
      };
    
    case wsClose.type:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: undefined,
      };
  
    case wsError.type:
      return {
        ...state,
        error: action.payload
      };
  
          // Обработка происходит, когда с сервера возвращаются данные
          // В orders передадим данные, которые пришли с сервера
    case wsMessage.type:
      return {
        ...state,
        error: undefined,
        ...action.payload
=======
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
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
    };
    default:
      return state;
    }
<<<<<<< HEAD
  };
=======
  }; 
>>>>>>> 6a42ab79d79aa1b014865e0c12d214d22067bbf7
