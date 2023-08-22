import { wsConnecting, wsOpen, wsClose, wsMessage, wsError, TFeedActions } from "../actions/feed.ws";
import { WebsocketStatus } from '../../utils/feed-status';
import { TOrder } from "../../utils/types";

type TOrders = {
  status: string;
  orders: TOrder[];
  error: undefined | string;
  total: null | number;
  totalToday: null | number;
} 

const initialState: TOrders = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: undefined,
  total: null,
  totalToday: null
};
  
export const feedReducer = (state = initialState, action: TFeedActions): TOrders => {
  switch (action.type) {
    case 'FEED_WS_CONNECTING':
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.CONNECTING
      };

    case 'FEED_WS_OPEN':
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.ONLINE
      };
    
    case 'FEED_WS_CLOSE':
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: undefined,
      };
  
    case 'FEED_WS_ERROR':
      return {
        ...state,
        error: 'error' in action ? action.error : ''
      };
  
          // Обработка происходит, когда с сервера возвращаются данные
          // В orders передадим данные, которые пришли с сервера
    case 'FEED_WS_GET_MESSAGE':
      return {
        ...state,
        error: undefined,
        // @ts-ignore
        ...('payload' in action ? action.payload : {})
    };
    default:
      return state;
    }
  };