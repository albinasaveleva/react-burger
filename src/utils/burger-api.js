export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const checkReponse = (res) => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};