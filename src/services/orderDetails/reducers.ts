import { TOrderDetailsState } from '../../types/data';
import { TOrderDetailsStateActions } from './actions';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  RESET_ORDER_DATA
} from './constants';

const initialState: TOrderDetailsState = {
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

export const orderReducer = (state = initialState, action: TOrderDetailsStateActions): TOrderDetailsState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        info : {
          success: false,
          name: null,
          number: null,
          ingredients: [],
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
          ingredients: [],
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