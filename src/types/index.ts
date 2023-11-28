import { store } from '../services/store/store';
 
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TAuthActions } from '../services/auth/actions'; 
import { TBurgetConstructorActions } from '../services/burgerConstructor/actions'; 
import { TBurgerIngredientsActions } from '../services/burgerIngredients/actions'; 
import { TIngredientDetailsActions } from '../services/ingredientDetails/actions';
import { TOrderDetailsStateActions } from '../services/orderDetails/actions';

type TApplicationActions = 
  | TAuthActions
  | TBurgetConstructorActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TOrderDetailsStateActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;