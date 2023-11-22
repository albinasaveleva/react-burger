export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export const addIngredienDetails = (item) => ({
  type: ADD_INGREDIENT_DETAILS,
  payload: item
});

export const deleteIngredientDetails = () => ({
  type: DELETE_INGREDIENT_DETAILS,
});