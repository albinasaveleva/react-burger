import { 
  forgotPasswordRequestApi,
  getUserApi,
  loginRequestApi, 
  logoutRequestApi, 
  registerRequestApi, 
  resetPasswordRequestApi,
} from "../../utils/burger-api";
import { setCookie, deleteCookie } from "../../utils/cookies";

export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const checkData = (condition) => {
  return condition ? true : false;
};

export function registerRequest({email, password, name}) {
  const body = {
    email, 
    password,
    name
  };

  return checkData(email.length > 0 && password.length > 0 && name.length > 0)
    ? function(dispatch) {
      dispatch({
        type: AUTH_REGISTER_REQUEST
      });
      registerRequestApi(body)
        .then(({accessToken, refreshToken, user}) => {
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
            user: user,
          });
          localStorage.setItem('refreshToken', refreshToken);
          setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 , path: '/'});
        })
        .catch(({message})=>{
          dispatch({
            type: AUTH_REGISTER_ERROR
          })
          if (message === 'User already exists') {
            alert ('Пользователь уже зарегистрирован. Попробуйте снова')
          } else {
            alert(message)
          }
        })
    }
    : function(dispatch) {
      dispatch({
        type: AUTH_REGISTER_ERROR,
      });

      alert('Заполните все данные');
    }
    
};

export function loginRequest({email, password}) {
  const body = {
    email, 
    password
  };

  return checkData(email.length > 0 && password.length > 0)
    ? function(dispatch) {
      dispatch({
        type: AUTH_LOGIN_REQUEST
      });
      loginRequestApi(body)
        .then(({accessToken, refreshToken, user}) => {
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            user: user,
          });
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
    : function(dispatch) {
      dispatch({
        type: AUTH_LOGIN_ERROR,
      });

      alert('Заполните все данные');
    }
};

export function logoutRequest() {
  const body = {
    token: localStorage.getItem('refreshToken')
  };

  return function(dispatch) {
    dispatch({
      type: AUTH_LOGOUT_REQUEST
    });
    logoutRequestApi(body)
      .then(()=>{
        dispatch({
          type: AUTH_LOGOUT_SUCCESS,
        });
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .catch(()=>{
        dispatch({
          type: AUTH_LOGOUT_ERROR
        })
      })
  }
};

export function forgotPasswordRequest({email}) {
  const body = {
    email
  };

  return checkData(email.length > 0)
    ? function(dispatch) {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST
      });
      forgotPasswordRequestApi(body)
        .then(() => {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          })
        })
        .catch((err)=>{
          dispatch({
            type: FORGOT_PASSWORD_ERROR
          });

          alert(err.message);
        })
    }
    :function(dispatch) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
      });

      alert('Заполните все данные');
    }
};

export function resetPasswordRequest({password, token}) {
  const body = {
    password,
    token
  };

  return checkData(password.length > 0 && token.length > 0)
    ? function(dispatch) {
      dispatch({
        type: RESET_PASSWORD_REQUEST
      });
      resetPasswordRequestApi(body)
        .then(()=>{
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          })
        })
        .catch((err)=>{
          dispatch({
            type: RESET_PASSWORD_ERROR
          });

          alert(err.message);
        })
    }
    : function(dispatch) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
      });

      alert('Заполните все данные');
    }
};

export function getUser() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    getUserApi()
      .then(({ user }) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: user
        });
      })
      .catch(()=>{
        dispatch({
          type: GET_USER_ERROR
        })
      })
  }
}

export function updateUser({email, password, name}) {
  const body = {
    email, 
    password,
    name
  };

  return checkData(email.length > 0 && name.length > 0)
    ? function(dispatch) {
      dispatch({
        type: UPDATE_USER_REQUEST
      });
      fetchRequestWithRefresh(AUTH_USER_ENDPOINT, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      })
        .then(({ user }) => {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: user
          });
        })
        .catch((err)=>{
          dispatch({
            type: UPDATE_USER_ERROR
          });

          alert(err.message);
        })
    }
    : function(dispatch) {
      dispatch({
        type: UPDATE_USER_ERROR
      });

      alert('Заполните все данные');
    }
}