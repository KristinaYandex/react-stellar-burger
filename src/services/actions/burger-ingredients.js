import { getIngredients } from "../../utils/api";
  
export const GET_INGREDIENTS_FEED = "GET_INGREDIENTS_FEED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredientsFeed() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_FEED
    })
    getIngredients() 
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          })
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
} 