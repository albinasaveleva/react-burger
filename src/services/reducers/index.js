import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer
});