import { TIngredientDetailsState } from '../../types/data';
import { TIngredientDetailsActions } from './actions';
import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from './constants';

const initialState: TIngredientDetailsState = {
  item: null
};

export const ingredientReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        item: action.payload
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