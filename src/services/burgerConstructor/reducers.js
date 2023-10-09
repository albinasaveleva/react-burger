import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  RESET_BURGER_CONSTRUCTOR
} from './actions';

const initialState = {
  buns: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        buns: action.buns,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredients]
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    case RESET_BURGER_CONSTRUCTOR: {
      return initialState
    }
    default: {
      return state;
    }
  };
};