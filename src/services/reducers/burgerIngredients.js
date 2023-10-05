import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/burgerIngredients';

const initialState = {
  item: {}
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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