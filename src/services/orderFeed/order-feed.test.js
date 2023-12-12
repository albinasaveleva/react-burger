import { WebsocketStatus } from '../../types/data';
import {orderFeedReducer} from './reducers';
import * as types from './actions';

describe('order feed reducer', () => {
  it('should handle wsConnecting', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsConnecting
      })
    ).toEqual({
      status: WebsocketStatus.CONNECTING,
      orders: [],
      total: 0,
      totalToday: 0,
      error: ''
    })
  })

  it('should handle wsOpen', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsOpen
      })
    ).toEqual({
      status: WebsocketStatus.ONLINE,
      orders: [],
      total: 0,
      totalToday: 0,
      error: ''
    })
  })

  it('should handle wsClose', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsClose
      })
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      total: 0,
      totalToday: 0,
      error: ''
    })
  })

  it('should handle wsError', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsError,
        payload: 'error'
      })
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      total: 0,
      totalToday: 0,
      error: 'error'
    })
  })

  it('should handle wsMessage', () => {
    expect(
      orderFeedReducer(undefined, {
        type: types.wsMessage,
        payload: {
          orders: [ 'order', 'order' ],
          total: 1,
          totalToday: 1,
          error: ''
        }
      })
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [ 'order', 'order' ],
      total: 1,
      totalToday: 1,
      error: ''
    })
  })

  it('should return the initial state', () => {
    expect(orderFeedReducer(undefined, {})).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      total: 0,
      totalToday: 0,
      error: ''
    })
  })
})