import { BURGER_API_URL } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';

const ORDER_ENDPOINT = 'orders';
const url = `${BURGER_API_URL}/${ORDER_ENDPOINT}`;

const checkIngredients = (buns, ingredients) => {
  return buns && ingredients.length > 0 ? true : false
}

export function createOrder(buns, ingredients) {
  return checkIngredients(buns, ingredients) 
    ? function(dispatch) {
      const body = [ buns._id, ...ingredients.map(item => item._id), buns._id ];

      dispatch({
        type: CREATE_ORDER_REQUEST
      });

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: body })
      })
        .then(checkReponse)
        .then(({success, name, order}) => {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            success: success,
            name: name,
            number: order.number,
            ingredients: body
          })
        })
        .catch(dispatch({
          type: CREATE_ORDER_FAILED,
          error: 'Ошибка при отправке заказа'
        }))
    }
    : function(dispatch) {
      dispatch({
        type: CREATE_ORDER_FAILED,
        error: 'Недостаточно ингредиентов для заказа'
      });
    }
}