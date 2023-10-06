import { BURGER_API_URL } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

const CREATE_ORDER_ENDPOINT = 'orders';
const url = `${BURGER_API_URL}/${CREATE_ORDER_ENDPOINT}`;

export function createOrder(body) {
  return function(dispatch) {
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
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          info: res
        })
      })
      .catch(dispatch({
        type: CREATE_ORDER_FAILED
      }))
  };
}