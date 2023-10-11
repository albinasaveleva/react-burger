import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './actions';

const initialState = {
  list: [],
  error: null,
  isRequest: false,
  isFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        list: [],
        error: null,
        isRequest: true,
        isFailed: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isRequest: false,
        isFailed: false
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        error: action.payload,
        isRequest: false,
        isFailed: true
      };
    }
    default: {
      return state;
    }
  };
};