"use strict";

(() => {
  const main = document.querySelector(`main`);
  const successTemplate = document
  .querySelector(`#success`)
  .content.querySelector(`.success`);
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector(`.success__button`);
  const errorTemplate = document
  .querySelector(`#error`)
  .content.querySelector(`.error`);
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector(`.error__button`);

  const closeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
    document.removeEventListener(`click`, onSuccessMessageClick);
  };
  const openSuccessMessage = () => {
    main.append(successElement);
    successButton.addEventListener(`click`, closeSuccessMessage);
    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`click`, onSuccessMessageClick);
  };
  const onSuccessMessageEscPress = (evt) => {
    if (window.util.isEscape(evt)) {
      evt.preventDefault();
      successElement.remove();
      document.removeEventListener(`keydown`, onSuccessMessageEscPress);
      document.removeEventListener(`click`, onSuccessMessageClick);
    }
  };
  const onSuccessMessageClick = (evt) => {
    evt.preventDefault();
    successElement.remove();
    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
    document.removeEventListener(`click`, onSuccessMessageClick);
  };

  const closeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener(`keydown`, onErrorMessageEscPress);
    document.removeEventListener(`click`, onErrorMessageClick);
  };
  const openErrorMessage = () => {
    main.append(errorElement);
    errorButton.addEventListener(`click`, closeErrorMessage);
    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`click`, onErrorMessageClick);
  };
  const onErrorMessageEscPress = (evt) => {
    if (window.util.isEscape(evt)) {
      evt.preventDefault();
      errorElement.remove();
      document.removeEventListener(`keydown`, onErrorMessageEscPress);
      document.removeEventListener(`click`, onErrorMessageClick);
    }
  };
  const onErrorMessageClick = (evt) => {
    evt.preventDefault();
    successElement.remove();
    document.removeEventListener(`keydown`, onErrorMessageEscPress);
    document.removeEventListener(`click`, onErrorMessageClick);
  };


  window.successError = {
    openSuccessMessage,
    openErrorMessage
  };
})();
