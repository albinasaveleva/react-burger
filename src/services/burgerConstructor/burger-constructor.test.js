import {burgerConstructorReducer, initialState} from './reducers';
import * as types from './constants';

describe('burger constructor reducer', () => {
  const testData = {
    _id: '_id',
    name: 'name',
    type: 'type',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large',
    __v: 0,
    constructorId: 'constructorId',
  };
  
  it('should handle ADD_BUN', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: types.ADD_BUN,
        payload: testData
      })
    ).toEqual({
      ...initialState,
      buns: testData,
    })
  })

  it('should handle ADD_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: types.ADD_INGREDIENT,
        payload: testData
      })
    ).toEqual({
      ...initialState,
      ingredients: [ testData ]
    })
  })

  it('should handle DELETE_INGREDIENT', () => {
    expect(
      burgerConstructorReducer({
        buns: null,
        ingredients: [ testData ]
      }, {
        type: types.DELETE_INGREDIENT,
        payload: testData
      })
    ).toEqual(initialState)
  })

  it('should handle SORT_INGREDIENTS', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: types.SORT_INGREDIENTS,
        payload: [ testData ]
      })
    ).toEqual({
      ...initialState,
      ingredients: [ testData ]
    })
  })

  it('should handle RESET_BURGER_CONSTRUCTOR', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: types.RESET_BURGER_CONSTRUCTOR
      })
    ).toEqual(initialState)
  })

  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
  })
})