import {orderReducer, initialState} from './reducers';
import * as types from './constants';

describe('order reducer', () => {
  const testData = [ 'bun', 'ingredient', 'bun' ];
  
  it('should handle CREATE_ORDER_REQUEST', () => {
    expect(
      orderReducer(undefined, {
        type: types.CREATE_ORDER_REQUEST
      })
    ).toEqual({
        ...initialState,
        isRequest: true,
      })
  })

  it('should handle CREATE_ORDER_SUCCESS', () => {
    expect(
      orderReducer(undefined, {
        type: types.CREATE_ORDER_SUCCESS,
        success: true,
        name: 'name',
        number: 0,
        ingredients: testData
      })
    ).toEqual({
        ...initialState,
        info : {
          success: true,
          name: 'name',
          number: 0,
          ingredients: testData,
        },
      })
  })

  it('should handle CREATE_ORDER_ERROR', () => {
    expect(
      orderReducer(undefined, {
        type: types.CREATE_ORDER_ERROR,
        error: 'error'
      })
    ).toEqual({
        ...initialState,
        error: 'error',
        isFailed: true,
      })
  })

  it('should handle RESET_ORDER_DATA', () => {
    expect(orderReducer(undefined, {
      type: types.RESET_ORDER_DATA
    })).toEqual(initialState)
  })

  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState)
  })
})