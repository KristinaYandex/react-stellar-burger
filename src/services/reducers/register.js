import { CREATE_USER_FEED, CREATE_USER_SUCCESS, CREATE_USER_FAILED } from "../actions/register";
  
let initialState = {
  email: null,
  name: null,
  password: null,
  createUserRequest: false,
  createUserFailed: false,
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_FEED: {
      return {
        ...state,
        createUserRequest: true, //Запрос начал выполняться
        createUserFailed: false, //Статус наличия ошибок
      };
    }
    case CREATE_USER_SUCCESS: {
      return { 
        ...state, 
        email: action.user.email,
        name: action.user.name,
        password: action.user.password,
        createUserRequest: false,
        createUserFailed: false,
      };
    }
    case CREATE_USER_FAILED: {
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