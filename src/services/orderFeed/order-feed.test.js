import { WebsocketStatus } from '../../types/data';
import {orderFeedReducer, initialState} from './reducers';
import * as types from './actions';

describe('order feed reducer', () => {
  const testData ={
    orders: [ 'order', 'order' ],
    total: 1,
    totalToday: 1,
    error: 'error'
  };

  it('should handle wsConnecting', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsConnecting
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    })
  })

  it('should handle wsOpen', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsOpen
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    })
  })

  it('should handle wsClose', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsClose
      })
    ).toEqual(initialState)
  })

  it('should handle wsError', () => {
    expect(
      orderFeedReducer(undefined, {
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
      orderFeedReducer(undefined, {
        type: types.wsMessage,
        payload: {
          orders: testData.orders,
          total: testData.total,
          totalToday: testData.totalToday,
          error: ''
        }
      })
    ).toEqual({
      ...initialState,
      orders: testData.orders,
      total: testData.total,
      totalToday: testData.totalToday,
      error: ''
    })
  })

  it('should return the initial state', () => {
    expect(orderFeedReducer(undefined, {})).toEqual(initialState)
  })
})