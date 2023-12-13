import { WebsocketStatus } from '../../types/data';
import {orderHistoryReducer, initialState} from './reducers';
import * as types from './actions';

describe('order history reducer', () => {
  const testData = {
    orders: [ 'order', 'order' ],
    error: 'error'
  };

  it('should handle wsConnecting', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsConnecting
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    })
  })

  it('should handle wsOpen', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsOpen
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    })
  })

  it('should handle wsClose', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsClose
      })
    ).toEqual(initialState)
  })

  it('should handle wsError', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsError,
        payload: testData.error
      })
    ).toEqual({
      ...initialState,
      error: testData.error
    })
  })

  it('should handle wsMessage', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsMessage,
        payload: {
          orders: testData.orders,
          error: ''
        }
      })
    ).toEqual({
      ...initialState,
      orders: testData.orders,
      error: ''
    })
  })

  it('should return the initial state', () => {
    expect(orderHistoryReducer(undefined, {})).toEqual(initialState)
  })


})