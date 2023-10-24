import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,

  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,

  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './actions';

const initialState = {
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
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST: {
      return {
        ...state,
        isRegistrRequest: true,
        isRegistrSuccess: false,
        isRegistrError: false,
      }
    }
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistrRequest: false,
        isRegistrSuccess: true,
        isRegistrError: false,

        isLoginSuccess: true,

        user: action.user
      }
    }
    case AUTH_REGISTER_ERROR: {
      return {
        ...state,
        isRegistrRequest: false,
        isRegistrSuccess: false,
        isRegistrError: true,
      }
    }
    case AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        isLoginRequest: true,
        isLoginSuccess: false,
        isLoginError: false,
      }
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: true,
        isLoginError: false,

        user: action.user,
      }
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: false,
        isLoginError: true
      }
    }
    case AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutSuccess: false,
        isLogoutError: false,
      }
    }
    case AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: true,
        isLogoutError: false,

        isLoginSuccess: false,
      }
    }
    case AUTH_LOGOUT_ERROR: {
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: false,
        isLogoutError: true,
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isForgotPasswordRequest: true,
        isForgotPasswordSuccess: false,
        isForgotPasswordError: false,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isForgotPasswordRequest: false,
        isForgotPasswordSuccess: true,
        isForgotPasswordError: false,
      }
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        isForgotPasswordRequest: false,
        isForgotPasswordSuccess: false,
        isForgotPasswordError: true,
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isResetPasswordRequest: true,
        isResetPasswordSuccess: false,
        isResetPasswordError: false,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetPasswordRequest: false,
        isResetPasswordSuccess: true,
        isResetPasswordError: false,
      }
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        isResetPasswordRequest: false,
        isResetPasswordSuccess: false,
        isResetPasswordError: true,
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        isGetUserRequest: true,
        isGetUserSuccess: false,
        isGetUserError: false,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserSuccess: true,
        isGetUserError: false,

        isLoginSuccess: true,

        user: action.user
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserSuccess: false,
        isGetUserError: true,
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isUpdateUserRequest: true,
        isUpdateUserSuccess: false,
        isUpdateUserError: false,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUpdateUserRequest: false,
        isUpdateUserSuccess: true,
        isUpdateUserError: false,

        user: action.user,
      }
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isUpdateUserRequest: false,
        isUpdateUserSuccess: false,
        isUpdateUserError: true,
      }
    }
    default: {
      return state;
    }
  }
};