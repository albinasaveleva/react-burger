import { setCookie, getCookie } from "./cookies";
import { TIngredient } from '../types/data';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
const GET_INGREDIENTS_ENDPOINT = 'ingredients';
const ORDER_ENDPOINT = 'orders';
const AUTH_REGISTER_ENDPOINT = 'auth/register';
const AUTH_LOGIN_ENDPOINT = 'auth/login';
const AUTH_LOGOUT_ENDPOINT = 'auth/logout';
const AUTH_USER_ENDPOINT = 'auth/user';
const AUTH_TOKEN_ENDPOINT = 'auth/token';
const FORGOT_PASSWORD_ENDPOINT = 'password-reset';
const RESET_PASSWORD_ENDPOINT = 'password-reset/reset';

const fetchOptions = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}

type TServerResponse<T> = { success: boolean } & T;
type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;
type TCreateOrderResponse = TServerResponse<{
  name: string, 
  order: {},
}>;
type TRefresh = {
  refreshToken: string,
  accessToken: string,
};
type TUser = {
  user: {
    email: string,
    name: string,
  },
};
type TUserResponse = TServerResponse<TUser>;
type TRefreshResponse = TServerResponse<TRefresh>;
type TRegisterResponse = TServerResponse<TUser & TRefresh>;
type TLoginResponse = TServerResponse<TUser & TRefresh>;
type TLogoutResponse = TServerResponse<{ message: string }>;
type TForgotPasswordResponse = TServerResponse<{ message: string }>;
type TResetPasswordResponse = TServerResponse<{ message: string }>;

const checkReponse = <T>(res: Response): Promise<T> => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};

const request = <T>(
  url: string, 
  options: any,
): Promise<T> => {
  return fetch(url, options)
    .then((res: Response) => checkReponse<T>(res))
}

export const fetchRequest = async <T> (endpoint: string, options: any = {}) => {
  const url = `${BURGER_API_URL}/${endpoint}`;

  const res = await request<T>(url, options);
  
  return res;
}

const refreshToken = async (): Promise<TRefreshResponse> => {
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

export const fetchRequestWithRefresh = async <T> (
  endpoint: string, 
  options: any,
) => {
  const url = `${BURGER_API_URL}/${endpoint}`;

  try {
    options.headers.authorization = `Bearer ${getCookie('accessToken')}`;

    const res = await request<T>(url, options);
    
    return res;
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split('Bearer ')[1], { expires: 365 * 24 * 60 * 60 , path: '/'});
      
      options.headers.authorization = refreshData.accessToken;

      const res = await request<T>(url, options);
      
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsApi = () => fetchRequest<TIngredientsResponse>(GET_INGREDIENTS_ENDPOINT);

export const createOrderApi = (body: string[]) => {
  return fetchRequestWithRefresh<TCreateOrderResponse>(ORDER_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify({ ingredients: body })
  })
};

export const getUserApi = () => {
  return fetchRequestWithRefresh<TUserResponse>(AUTH_USER_ENDPOINT, {
    method: 'GET',
    ...fetchOptions,
  })
}

export const updateUserApi = (body: { email: string, password: string, name: string }) => {
  return fetchRequestWithRefresh<TUserResponse>(AUTH_USER_ENDPOINT, {
    method: 'PATCH',
    ...fetchOptions,
    body: JSON.stringify(body)
  })
}

export const registerRequestApi = (body: { email: string, password: string, name: string }) => {
  return fetchRequest<TRegisterResponse>(AUTH_REGISTER_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(body)
  })
}

export const loginRequestApi = (body: { email: string, password: string }) => {
  return fetchRequest<TLoginResponse>(AUTH_LOGIN_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(body)
  })
}

export const logoutRequestApi = (body: { token: string }) => {
  return fetchRequest<TLogoutResponse>(AUTH_LOGOUT_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(body)
  })
}

export const forgotPasswordRequestApi = (body: { email: string }) => {
  return fetchRequest<TForgotPasswordResponse>(FORGOT_PASSWORD_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(body)
  })
}

export const resetPasswordRequestApi = (body: { password: string, token: string }) => {
  return fetchRequest<TResetPasswordResponse>(RESET_PASSWORD_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(body)
  })
}