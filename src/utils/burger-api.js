import { setCookie, getCookie } from "./cookies";
import { AUTH_TOKEN_ENDPOINT } from "../services/auth/actions";

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const checkReponse = (res) => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};

export const fetchRequest = (endpoint, options = {}) => {
  const url = `${BURGER_API_URL}/${endpoint}`;

  return fetch(url, options)
    .then(checkReponse)
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
  try {
    options.headers.authorization = `Bearer ${getCookie('accessToken')}`;

    return fetchRequest(endpoint, options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 });
      
      options.headers.authorization = refreshData.accessToken;

      return fetchRequest(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};