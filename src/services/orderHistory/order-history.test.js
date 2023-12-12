import { WebsocketStatus } from '../../types/data';
import {orderHistoryReducer} from './reducers';
import * as types from './actions';

describe('order history reducer', () => {
  it('should handle wsConnecting', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsConnecting
      })
    ).toEqual({
      status: WebsocketStatus.CONNECTING,
      orders: [],
      error: ''
    })
  })

  it('should handle wsOpen', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsOpen
      })
    ).toEqual({
      status: WebsocketStatus.ONLINE,
      orders: [],
      error: ''
    })
  })

  it('should handle wsClose', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsClose
      })
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      error: ''
    })
  })

  it('should handle wsError', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsError,
        payload: 'error'
      })
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      error: 'error'
    })
  })

  it('should handle wsMessage', () => {
    expect(
      orderHistoryReducer(undefined, {
        type: types.wsMessage,
        payload: {
          orders: [ 'order', 'order' ],
          error: ''
        }
      })
    ).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [ 'order', 'order' ],
      error: ''
    })
  })

  it('should return the initial state', () => {
    expect(orderHistoryReducer(undefined, {})).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      error: ''
    })
  })


})