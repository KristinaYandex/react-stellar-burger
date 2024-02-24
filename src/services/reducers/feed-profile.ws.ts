import { wsConnectingProfile, wsOpenProfile, wsCloseProfile, wsMessageProfile, wsErrorProfile, TFeedProfileActions } from "../../services/actions/feed-profile.ws";
import { WebsocketStatus } from '../../utils/feed-status';
import { TOrder } from "../../utils/types";

type TOrderProfile = {
  status: string;
  orders: ReadonlyArray<TOrder>;
  error: undefined | string;
} 

const initialState: TOrderProfile = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: undefined
};
  
export const feedReducerProfile = (state = initialState, action: TFeedProfileActions ): TOrderProfile => {
  switch (action.type) {
    case 'FEED_WS_CONNECTING_PROFILE': 
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.CONNECTING
      };

    case 'FEED_WS_OPEN_PROFILE': 
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.ONLINE
      };
    
    case 'FEED_WS_CLOSE_PROFILE':
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: undefined,
      };
  
    case 'FEED_WS_ERROR_PROFILE':
      return {
        ...state,
        error: "error" in action ? action.error : ""
      };
  
      // Обработка происходит, когда с сервера возвращаются данные
      // В orders передадим данные, которые пришли с сервера
    case 'FEED_WS_GET_MESSAGE_PROFILE':
      const data = typeof action === 'object' ? action.payload : {}
      return {
        ...state,
        error: undefined,
        ...data
      };
    default:
      return state;
    }
  }; 