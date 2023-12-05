import { TIngredient } from '../../types/data';
import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from './constants';

interface IAddIngredientDetailsAction {
  type: typeof ADD_INGREDIENT_DETAILS;
  payload: TIngredient;
}
interface IDeleteIngredientDetailsAction {
  type: typeof DELETE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = 
  | IAddIngredientDetailsAction
  | IDeleteIngredientDetailsAction;

const addIngredientDetailsAction = (item: TIngredient): IAddIngredientDetailsAction => ({
  type: ADD_INGREDIENT_DETAILS,
  payload: item,
});
const deleteIngredientDetailsAction = (): IDeleteIngredientDetailsAction => ({
  type: DELETE_INGREDIENT_DETAILS,
});

export const addIngredienDetails = (item: TIngredient) => addIngredientDetailsAction(item);
export const deleteIngredientDetails = () => deleteIngredientDetailsAction();