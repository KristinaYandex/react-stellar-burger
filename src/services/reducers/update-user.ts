import { UPDATE_USER_FEED, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, TUpdateUserActions } from "../actions/update-user";
import { TUser } from "../../utils/types";
  
type TUpdateUser = {
  updateUserRequest: boolean;
  updateUserFailed: boolean;
  user: TUser | null;
} 

let initialState: TUpdateUser = {
  user: null,
  updateUserRequest: false,
  updateUserFailed: false
}

export const updateUserReducer = (state = initialState, action: TUpdateUserActions): TUpdateUser => {
  switch (action.type) {
    case UPDATE_USER_FEED: {
      return {
        ...state,
        updateUserRequest: true, //Запрос начал выполняться
        updateUserFailed: false, //Статус наличия ошибок
      };
    }
    case UPDATE_USER_SUCCESS: {
      return { 
        ...state, 
        user: action.user,
        updateUserRequest: false,
        updateUserFailed: false
      };
    }
    case UPDATE_USER_FAILED: {
      return { 
        ...state, 
        updateUserRequest: false, 
        updateUserFailed: true
      };
    }
    default: {
      return state
    }
  }
}