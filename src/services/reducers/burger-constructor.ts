import { ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT, СLEAR_CONSTRUCTOR, TConstructorActions } from "../actions/burger-constructor";
import arrayMove from '../../utils/array-move';
import { TIngredient } from "../../utils/types";

type TBurgerConstructor = {
  bun: TIngredient | null;
  mainAndSauce: TIngredient[];
} 

export const initialState: TBurgerConstructor = {
  bun: null,
  mainAndSauce: [],
}

export const burgerConstructorReducer = (state = initialState, action: TConstructorActions): TBurgerConstructor => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state,
          bun: action.item,
        };
      } 
      return {
        ...state,
        mainAndSauce: [
          ...state.mainAndSauce,
          action.item,
        ],
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        mainAndSauce: state.mainAndSauce.filter(
          ({_id}) => _id !== action._id
        ),
      };
    }
    case СLEAR_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        mainAndSauce: []
      };
    }
    case SORT_INGREDIENT: {
      const { id, swappableId } = action

      const fromIndex = state.mainAndSauce.findIndex((item) => item._id === swappableId)
      const toIndex = state.mainAndSauce.findIndex((item) => item._id === id)

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