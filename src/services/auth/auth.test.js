import {authReducer} from './reducers';
import * as actions from './actions';
import * as types from './constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('auth reducer', () => {
  beforeEach(()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        { result: 'OK' }
      ),
      ok: true,
    })
  });

  afterEach(()=>{
    jest.resetAllMocks();
  });

  it('should fire actions after register', ()=>{
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ data: null });

    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({result: 'OK'}),
    }));

    const expectedActions = [
      {type: types.AUTH_REGISTER_REQUEST},
      {type: types.AUTH_REGISTER_SUCCESS, user: { email: 'email', name: 'name' }},
      {type: types.AUTH_REGISTER_ERROR}
    ];

    return store.dispatch(actions.registerRequest({ email: 'email', password: 'password', name: 'name' })).then(()=>{
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginError: false,
    
      isLogoutRequest: false,
      isLogoutSuccess: false,
      isLogoutError: false,
    
      isForgotPasswordRequest: false,
      isForgotPasswordSuccess: false,
      isForgotPasswordError: false,
    
      isResetPasswordRequest: false,
      isResetPasswordSuccess: false,
      isResetPasswordError: false,
    
      isGetUserRequest: false,
      isGetUserSuccess: false,
      isGetUserError: false,
    
      isUpdateUserRequest: false,
      isUpdateUserSuccess: false,
      isUpdateUserError: false,
    
      user: null
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