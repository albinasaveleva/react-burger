import { 
  forgotPasswordRequestApi,
  getUserApi,
  loginRequestApi, 
  logoutRequestApi, 
  registerRequestApi, 
  resetPasswordRequestApi,
  updateUserApi
} from "../../utils/burger-api";

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
  UPDATE_USER_ERROR
} from "./constants";

import { TUser } from "../../types/data";

import { setCookie, deleteCookie } from "../../utils/cookies";
import { AppDispatch, AppThunk } from '../../services/store/store';


const checkData = (condition: any) => {
  return condition ? true : false;
};

interface IAuthRegisterRequestAction {
  type: typeof AUTH_REGISTER_REQUEST;
}
interface IAuthRegisterRequestSuccessAction {
  type: typeof AUTH_REGISTER_SUCCESS;
  user: TUser;
}
interface IAuthRegisterRequestErrorAction {
  type: typeof AUTH_REGISTER_ERROR;
}

interface IAuthLoginRequestAction {
  type: typeof AUTH_LOGIN_REQUEST;
}
interface IAuthLoginRequestSuccessAction {
  type: typeof AUTH_LOGIN_SUCCESS;
  user: TUser;
}
interface IAuthLoginRequestErrorAction {
  type: typeof AUTH_LOGIN_ERROR;
}

interface IAuthLogoutRequestAction {
  type: typeof AUTH_LOGOUT_REQUEST;
}
interface IAuthLogoutRequestSuccessAction {
  type: typeof AUTH_LOGOUT_SUCCESS;
}
interface IAuthLogoutRequestErrorAction {
  type: typeof AUTH_LOGOUT_ERROR;
}

interface IForgotPasswordRequestAction {
  type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordRequestSuccessAction {
  type: typeof FORGOT_PASSWORD_SUCCESS;
}
interface IForgotPasswordRequestErrorAction {
  type: typeof FORGOT_PASSWORD_ERROR;
}

interface IResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordRequestSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordRequestErrorAction {
  type: typeof RESET_PASSWORD_ERROR;
}

interface IGetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}
interface IGetUserRequestSuccessAction {
  type: typeof GET_USER_SUCCESS;
  user: TUser;
}
interface IGetUserRequestErrorAction {
  type: typeof GET_USER_ERROR;
}

interface IUpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
}
interface IUpdateUserRequestSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  user: TUser;
}
interface IUpdateUserRequestErrorAction {
  type: typeof UPDATE_USER_ERROR;
}

export type TAuthActions = 
  | IAuthRegisterRequestAction
  | IAuthRegisterRequestSuccessAction
  | IAuthRegisterRequestErrorAction
  | IAuthLoginRequestAction
  | IAuthLoginRequestSuccessAction
  | IAuthLoginRequestErrorAction
  | IAuthLogoutRequestAction
  | IAuthLogoutRequestSuccessAction
  | IAuthLogoutRequestErrorAction
  | IForgotPasswordRequestAction
  | IForgotPasswordRequestSuccessAction
  | IForgotPasswordRequestErrorAction
  | IResetPasswordRequestAction
  | IResetPasswordRequestSuccessAction
  | IResetPasswordRequestErrorAction
  | IGetUserRequestAction
  | IGetUserRequestSuccessAction
  | IGetUserRequestErrorAction
  | IUpdateUserRequestAction
  | IUpdateUserRequestSuccessAction
  | IUpdateUserRequestErrorAction;

const authRegisterRequestAction = (): IAuthRegisterRequestAction => ({
  type: AUTH_REGISTER_REQUEST
})
const authRegisterRequestSuccessAction = (user: TUser): IAuthRegisterRequestSuccessAction => ({
  type: AUTH_REGISTER_SUCCESS,
  user
})
const authRegisterRequestErrorAction = (): IAuthRegisterRequestErrorAction => ({
  type: AUTH_REGISTER_ERROR
})

const authLoginRequestAction = (): IAuthLoginRequestAction => ({
  type: AUTH_LOGIN_REQUEST
})
const authLoginRequestSuccessAction = (user: TUser): IAuthLoginRequestSuccessAction => ({
  type: AUTH_LOGIN_SUCCESS,
  user
})
const authLoginRequestErrorAction = (): IAuthLoginRequestErrorAction => ({
  type: AUTH_LOGIN_ERROR
})

const authLogoutRequestAction = (): IAuthLogoutRequestAction => ({
  type: AUTH_LOGOUT_REQUEST
})
const authLogoutRequestSuccessAction = (): IAuthLogoutRequestSuccessAction => ({
  type: AUTH_LOGOUT_SUCCESS
})
const authLogoutRequestErrorAction = (): IAuthLogoutRequestErrorAction => ({
  type: AUTH_LOGOUT_ERROR
})

const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({
  type: FORGOT_PASSWORD_REQUEST
})
const forgotPasswordRequestSuccessAction = (): IForgotPasswordRequestSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS
})
const forgotPasswordRequestErrorAction = (): IForgotPasswordRequestErrorAction => ({
  type: FORGOT_PASSWORD_ERROR
})

const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST
})
const resetPasswordRequestSuccessAction = (): IResetPasswordRequestSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS
})
const resetPasswordRequestErrorAction = (): IResetPasswordRequestErrorAction => ({
  type: RESET_PASSWORD_ERROR
})

const getUserRequestAction = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST
})
const getUserRequestSuccessAction = (user: TUser): IGetUserRequestSuccessAction => ({
  type: GET_USER_SUCCESS,
  user
})
const getUserRequestErrorAction = (): IGetUserRequestErrorAction => ({
  type: GET_USER_ERROR
})

const updateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST
})
const updateUserRequestSuccessAction = (user: TUser): IUpdateUserRequestSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user
})
const updateUserRequestErrorAction = (): IUpdateUserRequestErrorAction => ({
  type: UPDATE_USER_ERROR
})

export const registerRequest = ({email, password, name}: {email: string, password: string, name: string}): AppThunk => {
  const body = {
    email, 
    password,
    name
  };

  return checkData(email.length > 0 && password.length > 0 && name.length > 0)
    ? function(dispatch: AppDispatch) {
      dispatch(authRegisterRequestAction());

      registerRequestApi(body)
        .then(({accessToken, refreshToken, user}) => {
          dispatch(authRegisterRequestSuccessAction(user));

          localStorage.setItem('refreshToken', refreshToken);
          setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 , path: '/'});
        })
        .catch(({message})=>{
          dispatch(authRegisterRequestErrorAction());

          if (message === 'User already exists') {
            alert ('Пользователь уже зарегистрирован. Попробуйте снова')
          } else {
            alert(message)
          }
        })
    }
    : function(dispatch: AppDispatch) {
      dispatch(authRegisterRequestErrorAction());

      alert('Заполните все данные');
    }
    
};

export const loginRequest = ({email, password}: {email: string, password: string}): AppThunk => {
  const body = {
    email, 
    password
  };

  return checkData(email.length > 0 && password.length > 0)
    ? function(dispatch: AppDispatch) {
      dispatch(authLoginRequestAction());
      loginRequestApi(body)
        .then(({accessToken, refreshToken, user}) => {
          dispatch(authLoginRequestSuccessAction(user));
          localStorage.setItem('refreshToken', refreshToken);
          setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 , path: '/'});
        })
        .catch((err)=>{
          dispatch({
            type: AUTH_LOGIN_ERROR
          })
          alert(err.message)
        })
    }
    : function(dispatch: AppDispatch) {
      dispatch(authLoginRequestErrorAction());

      alert('Заполните все данные');
    }
};

export const logoutRequest = (): AppThunk => {
  const body: { token: string } = {
    token: localStorage.getItem('refreshToken') as string
  };

  return function(dispatch: AppDispatch) {
    dispatch(authLogoutRequestAction());

    logoutRequestApi(body)
      .then(()=>{
        dispatch(authLogoutRequestSuccessAction());

        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .catch(()=>{
        dispatch(authLogoutRequestErrorAction())
      })
  }
};

export const forgotPasswordRequest = ({email}: {email: string}): AppThunk => {
  const body = {
    email
  };

  return checkData(email.length > 0)
    ? function(dispatch: AppDispatch) {
      dispatch(forgotPasswordRequestAction());

      forgotPasswordRequestApi(body)
        .then(() => {
          dispatch(forgotPasswordRequestSuccessAction())
        })
        .catch((err)=>{
          dispatch(forgotPasswordRequestErrorAction());

          alert(err.message);
        })
    }
    :function(dispatch: AppDispatch) {
      dispatch(forgotPasswordRequestErrorAction());

      alert('Заполните все данные');
    }
};

export const resetPasswordRequest = ({password, token}: {password: string, token: string}): AppThunk => {
  const body = {
    password,
    token
  };

  return checkData(password.length > 0 && token.length > 0)
    ? function(dispatch: AppDispatch) {
      dispatch(resetPasswordRequestAction());

      resetPasswordRequestApi(body)
        .then(()=>{
          dispatch(resetPasswordRequestSuccessAction())
        })
        .catch((err)=>{
          dispatch(resetPasswordRequestErrorAction());

          alert(err.message);
        })
    }
    : function(dispatch: AppDispatch) {
      dispatch(resetPasswordRequestErrorAction());

      alert('Заполните все данные');
    }
};

export const getUser = (): AppThunk => {
  return function(dispatch: AppDispatch) {
    dispatch(getUserRequestAction());

    getUserApi()
      .then(({ user }) => {
        dispatch(getUserRequestSuccessAction(user));
      })
      .catch(()=>{
        dispatch(getUserRequestErrorAction())
      })
  }
}

export const updateUser = ({email, password, name}: {email: string, password: string, name: string}): AppThunk => {
  const body = {
    email, 
    password,
    name
  };

  return checkData(email.length > 0 && name.length > 0)
    ? function(dispatch: AppDispatch) {
      dispatch(updateUserRequestAction());
      updateUserApi(body)
        .then(({ user }) => {
          dispatch(updateUserRequestSuccessAction(user));
        })
        .catch((err)=>{
          dispatch(updateUserRequestErrorAction());

          alert(err.message);
        })
    }
    : function(dispatch: AppDispatch) {
      dispatch(updateUserRequestErrorAction());

      alert('Заполните все данные');
    }
}