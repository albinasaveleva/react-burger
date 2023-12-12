import {burgerIngredientsReducer} from './reducers';
import * as types from './constants';

describe('burger ingredients reducer', () => {
  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(burgerIngredientsReducer(undefined, {
      type: types.GET_INGREDIENTS_REQUEST
    })).toEqual({
      list: [],
      error: null,
      isRequest: true,
      isFailed: false,
    })
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(burgerIngredientsReducer(undefined, {
      type: types.GET_INGREDIENTS_SUCCESS,
      payload: [ 'ingredient', 'ingredient', 'ingredient' ]
    })).toEqual({
      list: [ 'ingredient', 'ingredient', 'ingredient' ],
      error: null,
      isRequest: false,
      isFailed: false,
    })
  })

  it('should handle GET_INGREDIENTS_ERROR', () => {
    expect(burgerIngredientsReducer(undefined, {
      type: types.GET_INGREDIENTS_ERROR,
      payload: 'error'
    })).toEqual({
      list: [],
      error: 'error',
      isRequest: false,
      isFailed: true,
    })
  })

  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      list: [],
      error: null,
      isRequest: false,
      isFailed: false,
    })
  })
})