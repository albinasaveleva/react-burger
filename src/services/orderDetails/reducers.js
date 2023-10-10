import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  CLEAR_ORDER_DATA
} from './actions';

const initialState = {
  info: {
    success: null,
    name: null,
    number: null,
    ingredients: []
  },
  errors: null,
  isRequest: false,
  isFailed: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        info : {
          success: null,
          name: null,
          number: null,
          ingredients: null,
        },
        errors: null,
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
        errors: null,
        isRequest: false,
        isFailed: false,
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        info : {
          success: null,
          name: null,
          number: null,
          ingredients: null,
        },
        errors: action.error,
        isRequest: false,
        isFailed: true
      }
    }
    case CLEAR_ORDER_DATA: {
      return initialState
    }
    default: {
      return state;
    }
  };
};