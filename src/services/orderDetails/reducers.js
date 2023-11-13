import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  RESET_ORDER_DATA
} from './actions';

const initialState = {
  info: {
    success: false,
    name: null,
    number: null,
    ingredients: []
  },
  error: null,
  isRequest: false,
  isFailed: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        info : {
          success: false,
          name: null,
          number: null,
          ingredients: null,
        },
        error: null,
        isRequest: true,
        isFailed: false,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        info : {
          success: action.success,
          name: action.name,
          number: action.number,
          ingredients: action.ingredients,
        },
        error: null,
        isRequest: false,
        isFailed: false,
      }
    }
    case CREATE_ORDER_ERROR: {
      return {
        info : {
          success: false,
          name: null,
          number: null,
          ingredients: null,
        },
        error: action.error,
        isRequest: false,
        isFailed: true
      }
    }
    case RESET_ORDER_DATA: {
      return initialState
    }
    default: {
      return state;
    }
  };
};