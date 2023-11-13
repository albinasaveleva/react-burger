import { setCookie, getCookie } from "./cookies";

export const AUTH_REGISTER_ENDPOINT = 'auth/register';
export const AUTH_LOGIN_ENDPOINT = 'auth/login';
export const AUTH_LOGOUT_ENDPOINT = 'auth/logout';
export const AUTH_USER_ENDPOINT = 'auth/user';
export const AUTH_TOKEN_ENDPOINT = 'auth/token';

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

type TServerResponse<T> = {
  success: boolean
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string,
  accessToken: string,
}>;

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
  console.log(res)
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
    console.log(res)
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
      console.log(res)
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};