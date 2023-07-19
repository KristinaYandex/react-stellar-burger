import { wsConnecting, wsOpen, wsClose, wsMessage, wsError } from "../../services/actions/feed.ws";
import { WebsocketStatus } from '../../utils/feed-status';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: undefined,
  total: null,
  totalToday: null
};
  
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case wsConnecting:
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.CONNECTING
      };

    case wsOpen:
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.ONLINE
      };
    
    case wsClose:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: undefined,
      };
  
    case wsError:
      return {
        ...state,
        error: action.payload
      };
  
          // Обработка происходит, когда с сервера возвращаются данные
          // В orders передадим данные, которые пришли с сервера
    case wsMessage:
      return {
        ...state,
        error: undefined,
        ...action.payload
    };
    default:
      return state;
    }
  }; 

/*import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_GET_FEED_MESSAGE, WS_CONNECTION_ERROR } from "../../services/actions/feed.ws";

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
      return {
        ...state,
        error: undefined,
        ...action.payload
    };
    default:
      return state;
    }
  }; */