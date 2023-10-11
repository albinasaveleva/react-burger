import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './actions';

const initialState = {
  list: [],
  errors: [],
  isRequest: false,
  isFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isRequest: true,
        errors: []
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
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isRequest: false,
        isFailed: true,
        errors: [action.errors]
      };
    }
    default: {
      return state;
    }
  };
};