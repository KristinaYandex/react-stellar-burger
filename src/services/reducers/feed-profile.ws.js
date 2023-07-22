import { wsConnectingProfile, wsOpenProfile, wsCloseProfile, wsMessageProfile, wsErrorProfile } from "../../services/actions/feed-profile.ws";
import { WebsocketStatus } from '../../utils/feed-status';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: undefined
};
  
export const feedReducerProfile = (state = initialState, action) => {
  switch (action.type) {
    case wsConnectingProfile.type:
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.CONNECTING
      };

    case wsOpenProfile.type:
      return {
        ...state,
        error: undefined,
        status: WebsocketStatus.ONLINE
      };
    
    case wsCloseProfile.type:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: undefined,
      };
  
    case wsErrorProfile.type:
      return {
        ...state,
        error: action.payload
      };
  
          // Обработка происходит, когда с сервера возвращаются данные
          // В orders передадим данные, которые пришли с сервера
    case wsMessageProfile.type:
      return {
        ...state,
        error: undefined,
        ...action.payload
    };
    default:
      return state;
    }
  }; 