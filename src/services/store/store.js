import { combineReducers } from 'redux';

import { burgerIngredientsReducer } from '../burgerIngredients/reducers';
import { ingredientReducer } from '../ingredientDetails/reducers';
import { burgerConstructorReducer } from '../burgerConstructor/reducers';
import { orderReducer } from '../orderDetails/reducers';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderReducer
});