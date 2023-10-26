import { fetchRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

const GET_INGREDIENTS_ENDPOINT = 'ingredients';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetchRequest(GET_INGREDIENTS_ENDPOINT)
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
          payload: 'Ошибка загрузки данных'
        })
      })
  };
}