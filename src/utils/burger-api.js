import { setCookie } from "./cookies";

import { AUTH_TOKEN_ENDPOINT } from "../services/auth/actions";
export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';


export const checkReponse = (res) => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};

export const fetchRequest = async (url, options = {}) => {
  const res = await fetch(url, options);
  return await checkReponse(res);
}

const refreshToken = async () => {
  const url = `${BURGER_API_URL}/${AUTH_TOKEN_ENDPOINT}`;

  const body = {
    token: localStorage.getItem('refreshToken')
  };
  const res = await fetch(url, {
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
  return await checkReponse(res);
}

export const fetchRequestWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 });

      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': refreshData.accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};