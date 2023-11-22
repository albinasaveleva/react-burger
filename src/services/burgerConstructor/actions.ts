export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';
export const RESET_BURGER_CONSTRUCTOR: 'RESET_BURGER_CONSTRUCTOR' = 'RESET_BURGER_CONSTRUCTOR';

export const addBun = (item) => ({
  type: ADD_BUN,
  payload: item
});

export const addIngredient = (item) => ({
  type: ADD_INGREDIENT,
  payload: item,
});

export const deleteIngredient = (item) => ({
  type: DELETE_INGREDIENT,
  payload: item,
});

export const sortIngredients = (sortedIngredients) => ({
  type: SORT_INGREDIENTS,
  payload: sortedIngredients
});

export const resetBurgerConstructor = () => ({
  type: RESET_BURGER_CONSTRUCTOR
});