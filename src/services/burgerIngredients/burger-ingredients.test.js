import {burgerIngredientsReducer, initialState} from './reducers';
import * as types from './constants';

describe('burger ingredients reducer', () => {
  const testData = [ 'ingredient', 'ingredient', 'ingredient' ];

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(burgerIngredientsReducer(undefined, {
      type: types.GET_INGREDIENTS_REQUEST
    })).toEqual({
      ...initialState,
      isRequest: true,
    })
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(burgerIngredientsReducer(undefined, {
      type: types.GET_INGREDIENTS_SUCCESS,
      payload: testData
    })).toEqual({
      ...initialState,
      list: testData,
    })
  })

  it('should handle GET_INGREDIENTS_ERROR', () => {
    expect(burgerIngredientsReducer(undefined, {
      type: types.GET_INGREDIENTS_ERROR,
      payload: 'error'
    })).toEqual({
      ...initialState,
      error: 'error',
      isFailed: true,
    })
  })

  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
  })
})