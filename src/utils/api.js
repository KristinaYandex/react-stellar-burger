import { getCookie } from "../utils/cookie";
import { setCookie } from "../utils/cookie";

const URL = "https://norma.nomoreparties.space/api";

function serverResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

/*Отдельный запрос, проверяет истёк ли токен. Обрабатывает ошибки запросов и при возникновении ошибки jwt expired и вызывает обновление токена*/ 
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await serverResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await serverResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function getIngredients() {
  return fetch(`${URL}/ingredients`)
  .then(res => serverResponse(res))
}

export function postIngredients(arrayIngredients) {
  return fetchWithRefresh(`${URL}/orders`, {
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

export function getOrderNumber(number) {
  return fetch(`${URL}/orders/${number}`)
}

export function forgotPassword(emailUser) {
  return fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailUser)
  })
  .then(res => serverResponse(res))
}

export function resetPassword(passwordUser, tokenUser) {
  return fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: passwordUser,
      token: tokenUser
    })
  })
  .then(res => serverResponse(res))
}

export function createUser(emailUser, passwordUser, nameUser) {
  return fetch(`${URL}/auth/register`, {
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
  .then(res => serverResponse(res))
}

export function authorizationUser(emailUser, passwordUser) {
  return fetchWithRefresh(`${URL}/auth/login`, {
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

export function updateToken() {
  return fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
  .then(res => serverResponse(res))
}

export function logOutOfSystem() {
  return fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
  .then(res => serverResponse(res))
}

export function getUser() {
  return fetchWithRefresh(`${URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
}

export function updateUser(emailUser, nameUser) {
  return fetchWithRefresh(`${URL}/auth/user`, {
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