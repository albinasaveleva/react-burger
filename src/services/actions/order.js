export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

const url = 'https://norma.nomoreparties.space/api/orders';

export function createOrder(body) {//доработать
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
      .then(response => response.json())
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            info: res
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED
          });
        }
    });
  };
}