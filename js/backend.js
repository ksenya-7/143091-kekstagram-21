'use strict';

const SUCCESS_REQUEST = 200;
const TIMEOUT = 5000;

const Url = {
  URL_DATA: `https://21.javascript.pages.academy/kekstagram/data`,
  URL: `https://21.javascript.pages.academy/kekstagram`,
};

const StatusError = {
  400: `Неверный запрос`,
  401: `Пользователь не авторизован`,
  404: `Ничего не найдено`,
};

const onXhrLoad = (xhr, onLoad, onError) => () => {
  let error;
  switch (xhr.status) {
    case SUCCESS_REQUEST:
      onLoad(xhr.response);
      break;
    case (xhr.status) : error = StatusError[xhr.status];
      break;
    default:
      error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
  }

  if (error) {
    onError(error);
  }
};

const loadOrSaveXhr = (method, onLoad, onError, url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, onXhrLoad(xhr, onLoad, onError));

  xhr.timeout = TIMEOUT;

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.addEventListener(`error`, () => {
    window.successError.openErrorMessage();
  });

  xhr.open(method, url);
  xhr.send(data);
};

const load = (onLoad, onError) => {
  loadOrSaveXhr(`GET`, onLoad, onError, Url.URL_DATA);
};

const save = (data, onLoad, onError) => {
  loadOrSaveXhr(`POST`, onLoad, onError, Url.URL, data);
};

window.backend = {
  load,
  save
};
