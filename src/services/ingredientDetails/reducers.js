import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from './actions';

const initialState = {
  item: {}
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        item: action.item
      }
    }
    case DELETE_INGREDIENT_DETAILS: {
      return initialState;
    }
    default: {
      return state;
    }
  };
};