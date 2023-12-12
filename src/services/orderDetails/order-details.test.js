import {orderReducer} from './reducers';
import * as types from './constants';

describe('order reducer', () => {
  it('should handle CREATE_ORDER_REQUEST', () => {
    expect(
      orderReducer(undefined, {
        type: types.CREATE_ORDER_REQUEST
      })
    ).toEqual({
        info : {
          success: false,
          name: null,
          number: null,
          ingredients: [],
        },
        error: null,
        isRequest: true,
        isFailed: false,
      })
  })

  it('should handle CREATE_ORDER_SUCCESS', () => {
    expect(
      orderReducer(undefined, {
        type: types.CREATE_ORDER_SUCCESS,
        success: true,
        name: 'name',
        number: 0,
        ingredients: [ 'bun', 'ingredient', 'bun' ]
      })
    ).toEqual({
        info : {
          success: true,
          name: 'name',
          number: 0,
          ingredients: [ 'bun', 'ingredient', 'bun' ],
        },
        error: null,
        isRequest: false,
        isFailed: false,
      })
  })

  it('should handle CREATE_ORDER_ERROR', () => {
    expect(
      orderReducer(undefined, {
        type: types.CREATE_ORDER_ERROR,
        error: 'error'
      })
    ).toEqual({
        info : {
          success: false,
          name: null,
          number: null,
          ingredients: []
        },
        error: 'error',
        isRequest: false,
        isFailed: true,
      })
  })

  it('should handle RESET_ORDER_DATA', () => {
    expect(orderReducer(undefined, {
      type: types.RESET_ORDER_DATA
    })).toEqual({
      info: {
        success: false,
        name: null,
        number: null,
        ingredients: []
      },
      error: null,
      isRequest: false,
      isFailed: false,
    })
  })

  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      info: {
        success: false,
        name: null,
        number: null,
        ingredients: []
      },
      error: null,
      isRequest: false,
      isFailed: false,
    })
  })
})