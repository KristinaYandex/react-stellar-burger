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
    };
    default:
      return state;
    }
  };