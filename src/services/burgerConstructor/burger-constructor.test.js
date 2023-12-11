import {burgerConstructorReducer} from './reducers'
// import * as types from './constants'

describe('burger constructor reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      buns: null,
      ingredients: []
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