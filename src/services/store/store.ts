import { combineReducers } from 'redux';
import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import type {} from 'redux-thunk/extend-redux';

import { burgerIngredientsReducer } from '../burgerIngredients/reducers';
import { burgerConstructorReducer } from '../burgerConstructor/reducers';
import { orderReducer } from '../orderDetails/reducers';
import { authReducer } from '../auth/reducers';
import { orderFeedReducer } from '../orderFeed/reducers';
import { orderHistoryReducer } from '../orderHistory/reducers';

import { socketMiddleware } from '../middleware/socket-middleware';

import { TWSOrderFeedActions, wsOrderFeedActions } from '../orderFeed/actions';
import { TWSOrderHistoryActions, wsOrderHistoryActions } from '../orderHistory/actions';
import { TAuthActions } from '../auth/actions';
import { TBurgetConstructorActions } from '../burgerConstructor/actions';
import { TBurgerIngredientsActions } from '../burgerIngredients/actions';
import { TOrderDetailsStateActions } from '../orderDetails/actions';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const orderFeedMiddleware = socketMiddleware(wsOrderFeedActions);
const orderHistoryMiddleware = socketMiddleware(wsOrderHistoryActions);

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderReducer,
  auth: authReducer,
  orderFeed: orderFeedReducer,
  orderHistory: orderHistoryReducer,
});

export const store = configureStore({ 
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(orderFeedMiddleware, orderHistoryMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = 
  | TAuthActions
  | TBurgetConstructorActions
  | TBurgerIngredientsActions
  | TOrderDetailsStateActions
  | TWSOrderFeedActions
  | TWSOrderHistoryActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>

export type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk) => TReturnType;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
