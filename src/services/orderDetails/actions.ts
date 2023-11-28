import { createOrderApi } from "../../utils/burger-api";
import { TIngredient, TOrder } from "../../types/data";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  RESET_ORDER_DATA
} from './constants';

interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}
interface ICreateOrderRequestSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly success: boolean;
  readonly name: string;
  readonly number: number;
  readonly ingredients: string[];
}
interface ICreateOrderRequestErrorAction {
  readonly type: typeof CREATE_ORDER_ERROR;
  readonly error: string;
}
interface IResetOrderDataAction {
  readonly type: typeof RESET_ORDER_DATA;
}

export type TOrderDetailsStateActions = 
  | ICreateOrderRequestAction
  | ICreateOrderRequestSuccessAction
  | ICreateOrderRequestErrorAction
  | IResetOrderDataAction;

const createOrderRequestAction = ():ICreateOrderRequestAction => ({
  type: CREATE_ORDER_REQUEST,
});
const createOrderRequestSuccessAction = (success: boolean, name: string, number: number, body: string[]):ICreateOrderRequestSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  success: success,
  name: name,
  number: number,
  ingredients: body
});
const createOrderRequestErrorAction = (error: string):ICreateOrderRequestErrorAction => ({
  type: CREATE_ORDER_ERROR,
  error,
});
const ResetOrderDataAction = ():IResetOrderDataAction => ({
  type: RESET_ORDER_DATA,
});

const checkIngredients = (buns: null | TIngredient, ingredients: [] | TIngredient[]) => {
  return buns && ingredients.length > 0 ? true : false;
}

export function createOrder(buns: null | TIngredient, ingredients: [] | TIngredient[]) {
  return checkIngredients(buns, ingredients) 
    ? function(dispatch: any) {
      const body = [ (buns as TIngredient)._id, ...ingredients.map(item => item._id), (buns as TIngredient)._id ];

      dispatch(createOrderRequestAction());

      createOrderApi(body)
        .then(({success, name, order}) => {
          dispatch(createOrderRequestSuccessAction(success, name, (order as TOrder).number, body))
        })
        .catch(()=>{
          dispatch(createOrderRequestErrorAction('Ошибка при отправке заказа'))
        })
    }
    : function(dispatch: any) {
        dispatch(createOrderRequestErrorAction('Недостаточно ингредиентов для заказа'));
      }
}

export const clearOrderData = () => (ResetOrderDataAction());