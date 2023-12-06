import { setCookie, getCookie } from "./cookies";
import { TIngredient, TOrder } from '../types/data';

export const INDEX_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const RESET_PASSWORD_ROUTE = '/reset-password';
export const ORDER_FEED_ROUTE = '/feed';
export const ORDER_FEED_ID_ROUTE = ':id';
export const ORDER_FEED_ID_MODAL_ROUTE = '/feed/:id';
export const PROFILE_ROUTE = '/profile';
export const ORDER_HISTORY_ROUTE = 'orders';
export const ORDER_HISTORY_ID_ROUTE = 'orders/:id';
export const ORDER_HISTORY_ID_MODAL_ROUTE = '/profile/orders/:id';
export const INGREDIENTS_ROUTE = '/ingredients/:id';
export const NON_FOUND_ROUTE = '*';


export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
export const GET_INGREDIENTS_ENDPOINT = 'ingredients';
export const ORDER_ENDPOINT = 'orders';
export const AUTH_REGISTER_ENDPOINT = 'auth/register';
export const AUTH_LOGIN_ENDPOINT = 'auth/login';
export const AUTH_LOGOUT_ENDPOINT = 'auth/logout';
export const AUTH_USER_ENDPOINT = 'auth/user';
export const AUTH_TOKEN_ENDPOINT = 'auth/token';
export const FORGOT_PASSWORD_ENDPOINT = 'password-reset';
export const RESET_PASSWORD_ENDPOINT = 'password-reset/reset';

export const WS_URL = 'wss://norma.nomoreparties.space';
export const WS_ORDER_FEED_ENDPOINT = 'orders/all';
export const WS_ORDER_HISTORY_ENDPOINT = 'orders';

export const getIngredient = (ingredientId: string, ingredients: TIngredient[]) => ingredients.filter(ingredient => ingredient._id === ingredientId)[0];



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
type TOrdersResponse = TServerResponse<{ orders: TOrder[] }>;

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

export const refreshToken = async (): Promise<TRefreshResponse> => {
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

export const getIngredientsApi = () => {
  return fetchRequest<TIngredientsResponse>(GET_INGREDIENTS_ENDPOINT, {
    method: 'GET',
    ...fetchOptions,
  })
};

export const createOrderApi = (body: string[]) => {
  return fetchRequestWithRefresh<TCreateOrderResponse>(ORDER_ENDPOINT, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify({ ingredients: body })
  })
};

export const getOrderApi = (id: string) =>{
  return fetchRequestWithRefresh<TOrdersResponse>(`${ORDER_ENDPOINT}/${id}`, {
    method: 'GET',
    ...fetchOptions,
  })
} 

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
