import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED
} from './actions';

const orderInitialState = {
  info: null,
  errors: null,
  isRequest: false,
  isFailed: false,
}

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isRequest: true,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        info: action.info,
        isRequest: false,
        isFailed: false,
        errors: null
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        isRequest: false,
        isFailed: true,
        errors: true
      }
    }
    default: {
      return state;
    }
  };
};