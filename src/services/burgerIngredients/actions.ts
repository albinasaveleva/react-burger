import { getIngredientsApi } from "../../utils/burger-api";
import { TIngredient } from "../../types/data";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './constants';
import { AppDispatch } from "../store/store";

interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsRequestSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: Array<TIngredient>;
}
interface IGetIngredientsRequestErrorAction {
  type: typeof GET_INGREDIENTS_ERROR;
  payload: string;
}

export type TBurgerIngredientsActions = 
  | IGetIngredientsRequestAction
  | IGetIngredientsRequestSuccessAction
  | IGetIngredientsRequestErrorAction;

const getIngredientsRequestAction  = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});
const getIngredientsRequestSuccessAction = (data: Array<TIngredient>): IGetIngredientsRequestSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data
});
const getIngredientsRequestErrorAction  = (): IGetIngredientsRequestErrorAction => ({
  type: GET_INGREDIENTS_ERROR,
  payload: 'Ошибка загрузки данных'
});

export function getIngredients() {
  return function(dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());

    getIngredientsApi()
      .then(({data}) => {
        dispatch(getIngredientsRequestSuccessAction(data))
      })
      .catch(() => {
        dispatch(getIngredientsRequestErrorAction())
      })
  };
}