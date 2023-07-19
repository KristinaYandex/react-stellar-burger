import { WS_PROFILE_CONNECTION_ERROR, WS_PROFILE_CONNECTION_SUCCESS, WS_PROFILE_CONNECTION_CLOSED, WS_PROFILE_GET_FEED_MESSAGE } from "../../services/actions/feed.ws";

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined
};
  
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_PROFILE_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
  
    case WS_PROFILE_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
  
    case WS_PROFILE_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
          // Обработка происходит, когда с сервера возвращаются данные
          // В orders передадим данные, которые пришли с сервера
    case WS_PROFILE_GET_FEED_MESSAGE:
      return {
        ...state,
        error: undefined,
        ...action.payload
    };
    default:
      return state;
    }
  }; 