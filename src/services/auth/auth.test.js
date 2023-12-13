import {authReducer, initialState} from './reducers';
import * as types from './constants';

describe('auth reducer', () => {
  const testData = {
    email: 'email',
    name: 'name'
  }

  it('should handle AUTH_REGISTER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_REGISTER_REQUEST
    })).toEqual({
      ...initialState,

      isRegistrRequest: true,
    })
  })
  it('should handle AUTH_REGISTER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_REGISTER_SUCCESS,
      user: testData
    })).toEqual({
      ...initialState,

      isRegistrSuccess: true,    
      isLoginSuccess: true,   
      user: testData
    })
  })
  it('should handle AUTH_REGISTER_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_REGISTER_ERROR
    })).toEqual({
      ...initialState,

      isRegistrError: true,
    })
  })

  it('should handle AUTH_LOGIN_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGIN_REQUEST
    })).toEqual({
      ...initialState,
    
      isLoginRequest: true,
    })
  })
  it('should handle AUTH_LOGIN_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGIN_SUCCESS,
      user: testData
    })).toEqual({
      ...initialState,

      isLoginSuccess: true,    
      user: testData
    })
  })
  it('should handle AUTH_LOGIN_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGIN_ERROR
    })).toEqual({
      ...initialState,

      isLoginError: true,
    })
  })

  it('should handle AUTH_LOGOUT_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGOUT_REQUEST
    })).toEqual({
      ...initialState,

      isLogoutRequest: true,
    })
  })
  it('should handle AUTH_LOGOUT_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGOUT_SUCCESS
    })).toEqual({
      ...initialState,

      isLogoutSuccess: true,
    })
  })
  it('should handle AUTH_LOGOUT_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGOUT_ERROR
    })).toEqual({
      ...initialState,

      isLogoutError: true,
    })
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.FORGOT_PASSWORD_REQUEST
    })).toEqual({
      ...initialState,

      isForgotPasswordRequest: true,
    })
  })
  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.FORGOT_PASSWORD_SUCCESS
    })).toEqual({
      ...initialState,

      isForgotPasswordSuccess: true,
    })
  })
  it('should handle FORGOT_PASSWORD_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.FORGOT_PASSWORD_ERROR
    })).toEqual({
      ...initialState,

      isForgotPasswordError: true,
    })
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.RESET_PASSWORD_REQUEST
    })).toEqual({
      ...initialState,

      isResetPasswordRequest: true,
    })
  })
  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.RESET_PASSWORD_SUCCESS
    })).toEqual({
      ...initialState,

      isResetPasswordSuccess: true,
    })
  })
  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.RESET_PASSWORD_ERROR
    })).toEqual({
      ...initialState,

      isResetPasswordError: true,
    })
  })

  it('should handle GET_USER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.GET_USER_REQUEST
    })).toEqual({
      ...initialState,

      isGetUserRequest: true,
    })
  })
  it('should handle GET_USER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.GET_USER_SUCCESS,
      user: testData
    })).toEqual({
      ...initialState,

      isLoginSuccess: true,
      isGetUserSuccess: true,
      user: testData
    })
  })
  it('should handle GET_USER_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.GET_USER_ERROR
    })).toEqual({
      ...initialState,

      isGetUserError: true,
    })
  })

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.UPDATE_USER_REQUEST
    })).toEqual({
      ...initialState,

      isUpdateUserRequest: true,
    })
  })
  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.UPDATE_USER_SUCCESS,
      user: testData
    })).toEqual({
      ...initialState,

      isLoginSuccess: true,
      isUpdateUserSuccess: true,   
      user: testData
    })
  })
  it('should handle UPDATE_USER_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.UPDATE_USER_ERROR
    })).toEqual({
      ...initialState,

      isUpdateUserError: true,
    })
  })

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState)
  })
})