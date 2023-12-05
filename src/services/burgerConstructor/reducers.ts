import { nanoid } from 'nanoid';

import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  RESET_BURGER_CONSTRUCTOR
} from './constants';
import { TBurgerConstructorState } from '../../types/data';
import { TBurgetConstructorActions } from './actions';

const initialState: TBurgerConstructorState = {
  buns: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action: TBurgetConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_BUN: {
      const newItem = {...action.payload, constructorId: action.payload._id};

      return {
        ...state,
        buns: newItem,
      };
    }
    case ADD_INGREDIENT: {
      const newItem = {...action.payload, constructorId: nanoid()};

      return {
        ...state,
        ingredients: [...state.ingredients, newItem]
      };
    }
    case DELETE_INGREDIENT: {
      const filteredIngredients = state.ingredients.filter(ingredient => ingredient.constructorId !== action.payload.constructorId)

      return {
        ...state,
        ingredients: filteredIngredients
      }
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload
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