"use strict";

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
const errorText = errorElement.querySelector(`.error__title`);

const addElementAndListener = (element, elementButton, cbClose, cbEsc, cbClick) => {
  main.append(element);
  elementButton.addEventListener(`click`, cbClose);
  document.addEventListener(`keydown`, cbEsc);
  document.addEventListener(`click`, cbClick);
};

const removeElementAndListener = (element, cbEsc, cbClick) => {
  element.remove();
  document.removeEventListener(`keydown`, cbEsc);
  document.removeEventListener(`click`, cbClick);
};

const closeSuccessMessage = () => {
  removeElementAndListener(successElement, onSuccessMessageEscPress, onSuccessMessageClick);
};
const openSuccessMessage = () => {
  addElementAndListener(successElement, successButton, closeSuccessMessage, onSuccessMessageEscPress, onSuccessMessageClick);
};
const onSuccessMessageEscPress = (evt) => {
  if (window.util.isEscape(evt)) {
    evt.preventDefault();
    removeElementAndListener(successElement, onSuccessMessageEscPress, onSuccessMessageClick);
  }
};
const onSuccessMessageClick = (evt) => {
  evt.preventDefault();
  removeElementAndListener(successElement, onSuccessMessageEscPress, onSuccessMessageClick);
};


const closeErrorMessage = () => {
  removeElementAndListener(errorElement, onErrorMessageEscPress, onErrorMessageClick);
};
const openErrorMessage = () => {
  addElementAndListener(errorElement, errorButton, closeErrorMessage, onErrorMessageEscPress, onErrorMessageClick);
};
const onErrorMessageEscPress = (evt) => {
  if (window.util.isEscape(evt)) {
    evt.preventDefault();
    removeElementAndListener(errorElement, onErrorMessageEscPress, onErrorMessageClick);
  }
};
const onErrorMessageClick = (evt) => {
  evt.preventDefault();
  removeElementAndListener(errorElement, onErrorMessageEscPress, onErrorMessageClick);
};


const addElementWithNewTextAndListener = (message, element, elementButton, cbClose, cbEsc, cbClick) => {
  errorText.textContent = message;
  main.append(element);
  elementButton.addEventListener(`click`, cbClose);
  document.addEventListener(`keydown`, cbEsc);
  document.addEventListener(`click`, cbClick);
};

const openCreatedErrorMessage = (message) => {
  addElementWithNewTextAndListener(message, errorElement, errorButton, closeErrorMessage, onErrorMessageEscPress, onErrorMessageClick);
};

window.successError = {
  openSuccessMessage,
  openCreatedErrorMessage,
  openErrorMessage
};
