import {authReducer} from './reducers';
import * as types from './constants';

const test = {
  email: 'email',
  name: 'name'
}

describe('auth reducer', () => {
  it('should handle AUTH_REGISTER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_REGISTER_REQUEST
    })).toEqual({
      isRegistrRequest: true,
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
  it('should handle AUTH_REGISTER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_REGISTER_SUCCESS,
      user: test
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: true,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: true,
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
    
      user: test
    })
  })
  it('should handle AUTH_REGISTER_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_REGISTER_ERROR
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: true,
    
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

  it('should handle AUTH_LOGIN_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGIN_REQUEST
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: true,
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
  it('should handle AUTH_LOGIN_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGIN_SUCCESS,
      user: test
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: true,
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
    
      user: test
    })
  })
  it('should handle AUTH_LOGIN_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGIN_ERROR
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginError: true,
    
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

  it('should handle AUTH_LOGOUT_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGOUT_REQUEST
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginError: false,
    
      isLogoutRequest: true,
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
  it('should handle AUTH_LOGOUT_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGOUT_SUCCESS
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginError: false,
    
      isLogoutRequest: false,
      isLogoutSuccess: true,
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
  it('should handle AUTH_LOGOUT_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.AUTH_LOGOUT_ERROR
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginError: false,
    
      isLogoutRequest: false,
      isLogoutSuccess: false,
      isLogoutError: true,
    
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

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.FORGOT_PASSWORD_REQUEST
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginError: false,
    
      isLogoutRequest: false,
      isLogoutSuccess: false,
      isLogoutError: false,
    
      isForgotPasswordRequest: true,
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
  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.FORGOT_PASSWORD_SUCCESS
    })).toEqual({
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
      isForgotPasswordSuccess: true,
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
  it('should handle FORGOT_PASSWORD_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.FORGOT_PASSWORD_ERROR
    })).toEqual({
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
      isForgotPasswordError: true,
    
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

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.RESET_PASSWORD_REQUEST
    })).toEqual({
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
    
      isResetPasswordRequest: true,
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
  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.RESET_PASSWORD_SUCCESS
    })).toEqual({
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
      isResetPasswordSuccess: true,
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
  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.RESET_PASSWORD_ERROR
    })).toEqual({
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
      isResetPasswordError: true,
    
      isGetUserRequest: false,
      isGetUserSuccess: false,
      isGetUserError: false,
    
      isUpdateUserRequest: false,
      isUpdateUserSuccess: false,
      isUpdateUserError: false,
    
      user: null
    })
  })

  it('should handle GET_USER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.GET_USER_REQUEST
    })).toEqual({
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
    
      isGetUserRequest: true,
      isGetUserSuccess: false,
      isGetUserError: false,
    
      isUpdateUserRequest: false,
      isUpdateUserSuccess: false,
      isUpdateUserError: false,
    
      user: null
    })
  })
  it('should handle GET_USER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.GET_USER_SUCCESS,
      user: test
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: true,
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
      isGetUserSuccess: true,
      isGetUserError: false,
    
      isUpdateUserRequest: false,
      isUpdateUserSuccess: false,
      isUpdateUserError: false,
    
      user: test
    })
  })
  it('should handle GET_USER_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.GET_USER_ERROR
    })).toEqual({
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
      isGetUserError: true,
    
      isUpdateUserRequest: false,
      isUpdateUserSuccess: false,
      isUpdateUserError: false,
    
      user: null
    })
  })

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(authReducer(undefined, {
      type: types.UPDATE_USER_REQUEST
    })).toEqual({
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
    
      isUpdateUserRequest: true,
      isUpdateUserSuccess: false,
      isUpdateUserError: false,
    
      user: null
    })
  })
  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(authReducer(undefined, {
      type: types.UPDATE_USER_SUCCESS,
      user: test
    })).toEqual({
      isRegistrRequest: false,
      isRegistrSuccess: false,
      isRegistrError: false,
    
      isLoginRequest: false,
      isLoginSuccess: true,
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
      isUpdateUserSuccess: true,
      isUpdateUserError: false,
    
      user: test
    })
  })
  it('should handle UPDATE_USER_ERROR', () => {
    expect(authReducer(undefined, {
      type: types.UPDATE_USER_ERROR
    })).toEqual({
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
      isUpdateUserError: true,
    
      user: null
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
})