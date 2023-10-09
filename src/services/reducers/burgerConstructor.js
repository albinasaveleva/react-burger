import {
  ADD_BUNS,
  ADD_INGREDIENTS,
  SORT_INGREDIENTS
} from '../actions/burgerConstructor';

const initialState = {
  buns: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUNS: {
      return {
        ...state,
        buns: action.buns,
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredients]
      };
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    default: {
      return state;
    }
  };
};