import { ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT } from "../actions/burger-constructor";
import arrayMove from '../../utils/array-move';

export const initialState = {
  bun: null,
  mainAndSauce: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
        };
      } 
      return {
        ...state,
        mainAndSauce: [
          ...state.mainAndSauce,
          action.payload,
        ],
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        mainAndSauce: state.mainAndSauce.filter(
          ({id}) => id !== action.payload
        ),
      };
    }
    case SORT_INGREDIENT: {
      const { id, swappableId } = action.payload

      const fromIndex = state.mainAndSauce.findIndex((item) => item.id === swappableId)
      const toIndex = state.mainAndSauce.findIndex((item) => item.id === id)

      return {
        ...state,
        mainAndSauce: arrayMove(state.mainAndSauce, fromIndex, toIndex),
      }
    }
    default: {
      return state;
    }
  }
}