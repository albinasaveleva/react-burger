import { BURGER_API_URL } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const GET_INGREDIENTS_ENDPOINT = 'ingredients';
const url = `${BURGER_API_URL}/${GET_INGREDIENTS_ENDPOINT}`;

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(url)
      .then(checkReponse)
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          list: res.data
        })
      })
      .catch(dispatch({
        type: GET_INGREDIENTS_FAILED,
      }))
  };
}