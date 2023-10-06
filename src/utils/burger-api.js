export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const checkReponse = (res) => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};

// export const getIngredients= () => {
//   return fetch(`${BURGER_API_URL}/ingredients`)
//     .then(checkReponse)
//     .then(data => {
//       if (data?.success) return data.data;
//       return Promise.reject(data)
//     })
// }

// getIngredients()
//   .then(...) дальнейшие действия
//   .catch(...) обработка ошибок
//   .finally(...) флаг идет загрузка false