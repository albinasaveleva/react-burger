import { setCookie, getCookie } from "./cookies";
import { AUTH_TOKEN_ENDPOINT } from "../services/auth/actions";

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const checkReponse = (res) => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
  return fetch(url, options).then(checkReponse)
}

export const fetchRequest = async (endpoint, options = {}) => {
  const url = `${BURGER_API_URL}/${endpoint}`;

  const res = await request(url, options);
  return res;
}

const refreshToken = async () => {
  const body = {
    token: localStorage.getItem('refreshToken')
  };
  const options = {
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
  };

  return fetchRequest(AUTH_TOKEN_ENDPOINT, options);
}

export const fetchRequestWithRefresh = async (endpoint, options) => {
  const url = `${BURGER_API_URL}/${endpoint}`;

  try {
    options.headers.authorization = `Bearer ${getCookie('accessToken')}`;

    const res = await request(url, options);
    return res;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 , path: '/'});
      
      options.headers.authorization = refreshData.accessToken;

      const res = await request(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};