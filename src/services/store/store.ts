import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { burgerIngredientsReducer } from '../burgerIngredients/reducers';
import { ingredientReducer } from '../ingredientDetails/reducers';
import { burgerConstructorReducer } from '../burgerConstructor/reducers';
import { orderReducer } from '../orderDetails/reducers';
import { authReducer } from '../auth/reducers';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderReducer,
  auth: authReducer
});

export const store = configureStore({ 
  reducer: rootReducer 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;