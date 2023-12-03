import { TIngredient } from '../../types/data';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_BURGER_CONSTRUCTOR,
  SORT_INGREDIENTS,
} from './constants';

interface IAddBunAction {
  type: typeof ADD_BUN;
  payload: TIngredient;
}
interface IAddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: TIngredient;
}
interface IDeleteIngredientAction {
  type: typeof DELETE_INGREDIENT;
  payload: TIngredient;
}
interface ISortIngredientsAction {
  type: typeof SORT_INGREDIENTS;
  payload: Array<TIngredient>;
}
interface IResetBurgerConstructorAction {
  type: typeof RESET_BURGER_CONSTRUCTOR;
}

export type TBurgetConstructorActions = 
  | IAddBunAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | ISortIngredientsAction
  | IResetBurgerConstructorAction;

const addBunAction = (item: TIngredient): IAddBunAction => ({
  type: ADD_BUN,
  payload: item
});
const addIngredientAction = (item: TIngredient): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: item
});
const deleteIngredientAction = (item: TIngredient): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  payload: item,
});
const sortIngredientsAction = (sortedIngredients: Array<TIngredient>): ISortIngredientsAction => ({
  type: SORT_INGREDIENTS,
  payload: sortedIngredients,
});
const resetBurgerConstructorAction = (): IResetBurgerConstructorAction => ({
  type: RESET_BURGER_CONSTRUCTOR,
});

export const addBun = (item: TIngredient) => addBunAction(item);
export const addIngredient = (item: TIngredient) => addIngredientAction(item);
export const deleteIngredient = (item: TIngredient) => deleteIngredientAction(item);
export const sortIngredients = (sortedIngredients: Array<TIngredient>) => sortIngredientsAction(sortedIngredients);
export const resetBurgerConstructor = () => resetBurgerConstructorAction();