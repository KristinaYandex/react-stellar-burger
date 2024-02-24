import { getCookie, setCookie } from "./cookie";
import { TOptions, TRefreshData, TBurgerComponent, TGetIngredint, TForgotPassword, TGetUser, TLogin, TLogout, TOrderDetails } from "./types";

const URL = "https://norma.nomoreparties.space/api";

const serverResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(`${URL}${endpoint}`, options).then((response) => serverResponse<T>(response))
}

/*Отдельный запрос, проверяет истёк ли токен. Обрабатывает ошибки запросов и при возникновении ошибки jwt expired и вызывает обновление токена*/ 
export const fetchWithRefresh = async <T>(url: string, options: TOptions): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await serverResponse(res);
  } catch (err) {
    if ((err as Error).message === 'jwt expired') {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken, {});
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await serverResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function getIngredients() {
  return request<TGetIngredint>("/ingredients")
}

export function postIngredients(arrayIngredients: TBurgerComponent[]) {
  return fetchWithRefresh<TOrderDetails>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify ({
      ingredients: arrayIngredients
    })
  })
}

export function getOrderNumber(number: number) {
  return fetch(`${URL}/orders/${number}`)
}

export function forgotPassword(emailUser: string) {
  return request<TForgotPassword>("/password-reset", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailUser)
  })
}

export function resetPassword(passwordUser: string, tokenUser: string) {
  return request<TForgotPassword>("/password-reset/reset", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: passwordUser,
      token: tokenUser
    })
  })
}

export function createUser(emailUser: string, passwordUser: string, nameUser: string) {
  return request<TLogin>("/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser,
      name: nameUser
    })
  })
}

export function authorizationUser(emailUser: string, passwordUser: string) {
  return fetchWithRefresh<TLogin>(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser
    })
  })
}

export const updateToken = () => {
  return request<TRefreshData>("/auth/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

export function logOutOfSystem() {
  return request<TLogout>("/auth/logout", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

export function getUser() {
  return fetchWithRefresh<TGetUser>(`${URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
}

export function updateUser(emailUser: string, nameUser: string) {
  return fetchWithRefresh<TLogout>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      email: emailUser,
      name: nameUser,
    })
  })
}