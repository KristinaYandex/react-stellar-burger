import { getIngredients } from "../../utils/api";
import { AppThunk, AppDispatch } from "../../utils/store-types";
import { TIngredient } from "../../utils/types";
  
export const GET_INGREDIENTS_FEED: "GET_INGREDIENTS_FEED" = "GET_INGREDIENTS_FEED";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsFeedAction {
  readonly type: typeof GET_INGREDIENTS_FEED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

const getIngredientsFeedAction = (): IGetIngredientsFeedAction => ({
  type: GET_INGREDIENTS_FEED
});

const getIngredientsSuccessAction = (ingredients: TIngredient[]): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});

const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export type TBurgerIngredientsActions = 
  | IGetIngredientsFeedAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction


export const getIngredientsFeedThunk: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsFeedAction())
    getIngredients() 
      .then((res) => {
        if (res && res.success) {
          dispatch(
            getIngredientsSuccessAction(res.data)
          )
          console.log(res.data);
        } else {
                // Если произошла ошибка, отправляем соответствующий экшен
          dispatch(getIngredientsFailedAction())
        }
      })
      .catch(() => {
        dispatch(getIngredientsFailedAction())
      })
} 