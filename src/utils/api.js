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
