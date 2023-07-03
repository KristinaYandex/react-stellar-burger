import { GET_USER_FEED, GET_USER_SUCCESS, GET_USER_FAILED } from "../actions/get-user";
  
let initialState = {
  user: null,
  getUserRequest: false,
  getUserFailed: false,
}

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FEED: {
      return {
        ...state,
        getUserRequest: true, //Запрос начал выполняться
        getUserFailed: false, //Статус наличия ошибок
      };
    }
    case GET_USER_SUCCESS: {
      return { 
        ...state, 
        user: action.user,
        getUserRequest: false,
        getUserFailed: false,
      };
    }
    case GET_USER_FAILED: {
      return { 
        ...state, 
        getUserRequest: false, 
        getUserFailed: true
      };
    }
    default: {
      return state
    }
  }
}