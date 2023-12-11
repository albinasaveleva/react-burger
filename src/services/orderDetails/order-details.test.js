import {orderReducer} from './reducers'
// import * as types from './constants'

describe('order reducer', () => {
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