import { BURGER_API_URL } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";
import { setLocalStorage, getLocalStorage } from "../../utils/localStorage";
import { setCookie, getCookie } from "../../utils/cookies";

export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';

export const AUTH_TOKEN_REQUEST = 'AUTH_TOKEN_REQUEST';
export const AUTH_TOKEN_SUCCESS = 'AUTH_TOKEN_SUCCESS';
export const AUTH_TOKEN_ERROR = 'AUTH_TOKEN_ERROR';

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
export const AUTH_TOKEN_ENDPOINT = 'auth/token';
export const AUTH_USER_ENDPOINT = 'auth/user';


export const FORGOT_PASSWORD_ENDPOINT = 'password-reset';
export const RESET_PASSWORD_ENDPOINT = 'password-reset/reset';

export function registerRequest({email, password, name}) {
  const url = `${BURGER_API_URL}/${AUTH_REGISTER_ENDPOINT}`;
  const body = {
    email, 
    password,
    name
  };

  return function(dispatch) {
    dispatch({
      type: AUTH_REGISTER_REQUEST
    });
    fetch(url, {
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
      .then(checkReponse)
      .then(({accessToken, refreshToken, user: {email, name}}) => {
        dispatch({
          type: AUTH_REGISTER_SUCCESS,
          userEmail: email,
          userPassword: password,
          userName: name,
        });
        setLocalStorage({
          key: 'refreshToken', 
          value: refreshToken
        });
        setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 20 * 60 });
        // setLocalStorage({
        //   key: 'refreshToken', 
        //   value: JSON.stringify({
        //     token: refreshToken,
        //     userName: name,
        //     userEmail: email,
        //   })
        // });
      })
      .catch(()=>{
        dispatch({
          type: AUTH_REGISTER_ERROR
        })
      })
  }
};

export function loginRequest({email, password}) {
  const url = `${BURGER_API_URL}/${AUTH_LOGIN_ENDPOINT}`;
  const body = {
    email, 
    password
  };

  return function(dispatch) {
    dispatch({
      type: AUTH_LOGIN_REQUEST
    });
    fetch(url, {
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
      .then(checkReponse)
      .then(({accessToken, refreshToken, user: {email, name}}) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          userEmail: email,
          userPassword: password,
          userName: name
        });
        setLocalStorage({
          key: 'refreshToken', 
          value: refreshToken
        });
        setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 20 * 60 });
        // setLocalStorage({
        //   key: 'refreshToken', 
        //   value: JSON.stringify({
        //     token: refreshToken,
        //     userName: name,
        //     userEmail: email,
        //   })
        // });
      })
      .catch(()=>{
        dispatch({
          type: AUTH_LOGIN_ERROR
        })
      })
  }
};

export function logoutRequest() {
  const url = `${BURGER_API_URL}/${AUTH_LOGOUT_ENDPOINT}`;
  const body = {
    token: getLocalStorage('refreshToken')
  };

  return function(dispatch) {
    dispatch({
      type: AUTH_LOGOUT_REQUEST
    });
    fetch(url, {
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
      .then(checkReponse)
      .then(()=>{
        dispatch({
          type: AUTH_LOGOUT_SUCCESS,
        })
      })
      .catch(()=>{
        dispatch({
          type: AUTH_LOGOUT_ERROR
        })
      })
  }
};

export function token() {
  const url = `${BURGER_API_URL}/${AUTH_TOKEN_ENDPOINT}`;
  const body = {
    token: getLocalStorage('refreshToken')
  };

  return function(dispatch) {
    dispatch({
      type: AUTH_TOKEN_REQUEST
    });
    fetch(url, {
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
      .then(checkReponse)
      .then(({accessToken, refreshToken})=>{
        dispatch({
          type: AUTH_TOKEN_SUCCESS,
        });
        setLocalStorage({
          key: 'refreshToken', 
          value: refreshToken
        });
        setCookie('accessToken', accessToken.split('Bearer ')[1], { expires: 20 * 60 });
      })
      .catch(()=>{
        dispatch({
          type: AUTH_TOKEN_ERROR
        })
      })
  }
};

export function forgotPasswordRequest({email}) {
  const url = `${BURGER_API_URL}/${FORGOT_PASSWORD_ENDPOINT}`;
  const body = {
    email
  };

  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    fetch(url, {
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
      .then(checkReponse)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          userEmail: email,
        })
      })
      .catch(()=>{
        dispatch({
          type: FORGOT_PASSWORD_ERROR
        })
      })
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
    fetch(url, {
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
      .then(checkReponse)
      .then(()=>{
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          userPassword: password,
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
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(checkReponse)
      .then(({ user: {email, name} }) => {
        dispatch({
          type: GET_USER_SUCCESS,
          userEmail: email,
          userName: name,
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
    fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    })
      .then(checkReponse)
      .then(({ user: {email, name} }) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          userEmail: email,
          userPassword: password,
          userName: name,
        });
      })
      .catch(()=>{
        dispatch({
          type: UPDATE_USER_ERROR
        })
      })
  }
}