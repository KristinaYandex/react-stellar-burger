import { AUTHORIZATION_USER_FEED, AUTHORIZATION_USER_SUCCESS, AUTHORIZATION_USER_FAILED } from "../actions/login";
  
let initialState = {
  user: null,
  authorizationUserRequest: false,
  authorizationUserFailed: false
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_USER_FEED: {
      return {
        ...state,
        authorizationUserRequest: true, //Запрос начал выполняться
        authorizationUserFailed: false, //Статус наличия ошибок
      };
    }
    case AUTHORIZATION_USER_SUCCESS: {
      return { 
        ...state, 
        user: action.user,
        authorizationUserRequest: false,
        authorizationUserFailed: false
      };
    }
    case AUTHORIZATION_USER_FAILED: {
      return { 
        ...state, 
        authorizationUserRequest: false, 
        authorizationUserFailed: true
      };
    }
    default: {
      return state
    }
  }
}