import {
  ADD_BUNS,
  ADD_INGREDIENTS
} from '../actions/burgerConstructor';

const initialState = {
  buns: null,
  ingredients: null
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
        ingredients: action.ingredients,
      };
    }
    default: {
      return state;
    }
  };
};