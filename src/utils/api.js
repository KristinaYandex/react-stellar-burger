const url = "https://norma.nomoreparties.space/api/ingredients";

function serverResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getIngredients() {
  return fetch(`${url}`, {
    method: 'GET',
  })
  .then(res => serverResponse(res));
}
