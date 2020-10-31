"use strict";

const Url = {
  URL_DATA: `https://21.javascript.pages.academy/kekstagram/data`,
  URL: `https://21.javascript.pages.academy/kekstagram`,
};
const statusError = {
  400: `Неверный запрос`,
  401: `Пользователь не авторизован`,
  404: `Ничего не найдено`,
};

const onXhrLoad = (xhr, onLoad, onError) => () => {
  let error;
  switch (xhr.status) {
    case 200:
      onLoad(xhr.response);
      break;
    case (xhr.status) : error = statusError[xhr.status];
      break;
    default:
      error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
  }

  if (error) {
    onError(error);
  }
};

const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, onXhrLoad(xhr, onLoad, onError));

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 1000; // 1s

  xhr.open(`GET`, Url.URL_DATA);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, onXhrLoad(xhr, onLoad, onError));

  xhr.addEventListener(`error`, () => {
    window.successError.openErrorMessage();
  });

  xhr.open(`POST`, Url.URL);
  xhr.send(data);
};

window.backend = {
  load,
  save
};
