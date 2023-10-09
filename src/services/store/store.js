import { combineReducers } from 'redux';

import { ingredientsReducer } from '../ingredients/reducers';
import { ingredientDetailsReducer } from '../ingredientDetails/reducers';
import { burgerConstructorReducer } from '../burgerConstructor/reducers';
import { orderReducer } from '../order/reducers';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer
});