import { WebsocketStatus } from '../../types/data'
import {orderFeedReducer} from './reducers'
// import * as types from './constants'

describe('order feed reducer', () => {
  it('should return the initial state', () => {
    expect(orderFeedReducer(undefined, {})).toEqual({
      status: WebsocketStatus.OFFLINE,
      orders: [],
      total: 0,
      totalToday: 0,
      error: ''
    })
  })

  // it('should handle ADD_TODO', () => {
  //   expect(
  //     reducer([], {
  //       type: types.ADD_TODO,
  //       text: 'Run the tests'
  //     })
  //   ).toEqual([
  //     {
  //       text: 'Run the tests',
  //       completed: false,
  //       id: 0
  //     }
  //   ])

  //   expect(
  //     reducer(
  //       [
  //         {
  //           text: 'Use Redux',
  //           completed: false,
  //           id: 0
  //         }
  //       ],
  //       {
  //         type: types.ADD_TODO,
  //         text: 'Run the tests'
  //       }
  //     )
  //   ).toEqual([
  //     {
  //       text: 'Run the tests',
  //       completed: false,
  //       id: 1
  //     },
  //     {
  //       text: 'Use Redux',
  //       completed: false,
  //       id: 0
  //     }
  //   ])
  // })
})