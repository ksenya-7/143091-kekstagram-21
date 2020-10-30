"use strict";

const Url = {
  URL_DATA: `https://21.javascript.pages.academy/kekstagram/data`,
  URL: `https://21.javascript.pages.academy/kekstagram`,
};

// const getResultOfLoadOrSave = (data, onSuccess, onError, method, url) => {
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = `json`;

//   xhr.addEventListener(`load`, () => {
//     let error;
//     switch (xhr.status) {
//       case 200:
//         onSuccess(xhr.response);
//         break;

//       case 400:
//         error = `Неверный запрос`;
//         break;
//       case 401:
//         error = `Пользователь не авторизован`;
//         break;
//       case 404:
//         error = `Ничего не найдено`;
//         break;

//       default:
//         error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
//     }

//     if (error) {
//       onError(error);
//     }
//   });

//   xhr.addEventListener(`error`, () => {
//     window.successError.openErrorMessage();
//   });

//   xhr.open(`${method}`, url);
//   xhr.send(data);
// };


// const load = getResultOfLoadOrSave(_, onSuccess, onError, GET, Url.URL_DATA);

const load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;

      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 10000; // 10s

  xhr.open(`GET`, Url.URL_DATA);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;

      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });

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
