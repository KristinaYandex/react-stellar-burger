import { UPDATE_TOKEN_FEED, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED, TUpdateTokenActions } from "../actions/update-token";
  
type TUpdateToken = {
  updateTokenRequest: boolean;
  updateTokenFailed: boolean;
} 

let initialState: TUpdateToken = {
  updateTokenRequest: false,
  updateTokenFailed: false,
}

export const updateTokenReducer = (state = initialState, action: TUpdateTokenActions): TUpdateToken => {
  switch (action.type) {
    case UPDATE_TOKEN_FEED: {
      return {
        ...state,
        updateTokenRequest: true, //Запрос начал выполняться
        updateTokenFailed: false, //Статус наличия ошибок
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return { 
        ...state, 
        updateTokenRequest: false,
        updateTokenFailed: false,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return { 
        ...state, 
        updateTokenRequest: false, 
        updateTokenFailed: true
      };
    }
    default: {
      return state
    }
  }
}