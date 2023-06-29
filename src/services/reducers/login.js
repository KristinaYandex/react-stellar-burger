import { AUTHORIZATION_USER_FEED, AUTHORIZATION_USER_SUCCESS, AUTHORIZATION_USER_FAILED } from "../actions/login";
  
let initialState = {
  email: null,
  name: null,
  createUserRequest: false,
  createUserFailed: false,
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_USER_FEED: {
      return {
        ...state,
        createUserRequest: true, //Запрос начал выполняться
        createUserFailed: false, //Статус наличия ошибок
      };
    }
    case AUTHORIZATION_USER_SUCCESS: {
      return { 
        ...state, 
        email: action.user.email,
        name: action.user.name,
        createUserRequest: false,
        createUserFailed: false,
      };
    }
    case AUTHORIZATION_USER_FAILED: {
      return { 
        ...state, 
        createUserRequest: false, 
        createUserFailed: true
      };
    }
    default: {
      return state
    }
  }
}