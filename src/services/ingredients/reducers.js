import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from './actions';

const initialState = {
  list: [],
  errors: null,
  isRequest: false,
  isFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        list: action.list,
        isRequest: false,
        isFailed: false,

      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      };
    }
    default: {
      return state;
    }
  };
};