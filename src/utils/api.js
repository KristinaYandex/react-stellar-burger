import { getCookie } from "../utils/cookie";

const URL = "https://norma.nomoreparties.space/api";

function serverResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getIngredients() {
  return fetch(`${URL}/ingredients`)
  .then(res => serverResponse(res))
}

export function postIngredients(arrayIngredients) {
  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      ingredients: arrayIngredients
    })
  })
  .then(res => serverResponse(res))
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
  return fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser
    })
  })
  .then(res => serverResponse(res))
}

export function updateToken() {
  return fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
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
      token: localStorage.getItem("refreshToken")
    })
  })
  .then(res => serverResponse(res))
}

export function getUser() {
  return fetch(`${URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie("token")
    },
  })
  .then(res => serverResponse(res))
}

export function updateUser(emailUser, nameUser) {
  return fetch(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie("token")
    },
    body: JSON.stringify({
      email: emailUser,
      name: nameUser,
    })
  })
  .then(res => serverResponse(res))
}