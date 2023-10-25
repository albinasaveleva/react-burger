import { BURGER_API_URL, fetchRequest, fetchRequestWithRefresh } from "../../utils/burger-api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

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

export const AUTH_REGISTER_ENDPOINT = 'auth/register';
export const AUTH_LOGIN_ENDPOINT = 'auth/login';
export const AUTH_LOGOUT_ENDPOINT = 'auth/logout';
export const AUTH_USER_ENDPOINT = 'auth/user';
export const AUTH_TOKEN_ENDPOINT = 'auth/token';

export const FORGOT_PASSWORD_ENDPOINT = 'password-reset';
export const RESET_PASSWORD_ENDPOINT = 'password-reset/reset';

export function registerRequest({email, password, name}) {
  const checkData = () => {
    return email.length > 0 && password.length > 0 && name.length > 0 ? true : false;
  };

  const url = `${BURGER_API_URL}/${AUTH_REGISTER_ENDPOINT}`;
  const body = {
    email, 
    password,
    name
  };

  return checkData()
    ? function(dispatch) {
      dispatch({
        type: AUTH_REGISTER_REQUEST
      });
      fetchRequest(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      })
        .then(({accessToken, refreshToken, user}) => {
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
            user: user,
          });
          localStorage.setItem('refreshToken', refreshToken);
          setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 });
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
  const checkData = () => {
    return email.length > 0 && password.length > 0  ? true : false;
  };

  const url = `${BURGER_API_URL}/${AUTH_LOGIN_ENDPOINT}`;
  const body = {
    email, 
    password
  };

  return checkData()
    ? function(dispatch) {
      dispatch({
        type: AUTH_LOGIN_REQUEST
      });
      fetchRequest(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      })
        .then(({accessToken, refreshToken, user}) => {
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            user: user,
          });
          localStorage.setItem('refreshToken', refreshToken);
          setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 });
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
  const url = `${BURGER_API_URL}/${AUTH_LOGOUT_ENDPOINT}`;
  const body = {
    token: localStorage.getItem('refreshToken')
  };

  return function(dispatch) {
    dispatch({
      type: AUTH_LOGOUT_REQUEST
    });
    fetchRequest(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    })
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
  const checkData = () => {
    return email.length > 0 ? true : false;
  };

  const url = `${BURGER_API_URL}/${FORGOT_PASSWORD_ENDPOINT}`;
  const body = {
    email
  };

  return checkData()
    ? function(dispatch) {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST
      });
      fetchRequest(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
      })
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
  const url = `${BURGER_API_URL}/${RESET_PASSWORD_ENDPOINT}`;
  const body = {
    password,
    token
  };

  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    fetchRequest(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    })
      .then(()=>{
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      })
      .catch(()=>{
        dispatch({
          type: RESET_PASSWORD_ERROR
        })
      })
  }
};

export function getUser() {
  const url = `${BURGER_API_URL}/${AUTH_USER_ENDPOINT}`;

  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    fetchRequestWithRefresh(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
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
  const url = `${BURGER_API_URL}/${AUTH_USER_ENDPOINT}`;

  const body = {
    email, 
    password,
    name
  };

  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    fetchRequestWithRefresh(url, {
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
      .catch(()=>{
        dispatch({
          type: UPDATE_USER_ERROR
        })
      })
  }
}