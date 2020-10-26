"use strict";

const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const uploadForm = document.querySelector(`.img-upload__form`);
const uploadFile = uploadForm.querySelector(`#upload-file`);
const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
const uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
const textHashtagsInput = uploadOverlay.querySelector(`.text__hashtags`);
const textDescriptionInput = uploadOverlay.querySelector(`.text__description`);

const fileChooser = document.querySelector(`.img-upload__start input[type=file]`);
const preview = document.querySelector(`.img-upload__preview img`);

// загрузка внешнего файла
let matches = true;

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  preview.src = ``;
  matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });
    reader.addEventListener(`error`, window.successError.openErrorMessage);
    reader.readAsDataURL(file);
  }
});

// открытие-закрытие формы
const openUploadForm = () => {
  window.cancelOldValues();
  uploadOverlay.classList.remove(`hidden`);
};
uploadFile.addEventListener(`change`, openUploadForm);

const onUploadOverlayEscPress = (evt) => {
  if (window.util.isEscape(evt) && evt.target !== textHashtagsInput && evt.target !== textDescriptionInput) {
    evt.preventDefault();
    uploadOverlay.classList.add(`hidden`);
  }
};

const closeUploadOverlay = () => {
  window.cancelOldValues();
  uploadOverlay.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onUploadOverlayEscPress);
  uploadFile.value = ``;
};

uploadCancel.addEventListener(`click`, closeUploadOverlay);
document.addEventListener(`keydown`, onUploadOverlayEscPress);

// валидация
const re = /^\s*#*\w*$/;
const description = textDescriptionInput.value;

uploadForm.addEventListener(`submit`, (evt) => {
  const hashTag = textHashtagsInput.value;
  const hashTagArray = hashTag.split(` `);

  const hashTagSet = new Set();
  for (let element of hashTagArray) {
    hashTagSet.add(element.toLowerCase());
  }

  const isRepeat = hashTagSet.size < hashTagArray.length;
  const isUnvalid = hashTagArray.some((element) => !re.test(element));
  const isLength = hashTagArray.some((element) => element.length > MAX_HASHTAG_LENGTH);

  if (isUnvalid || hashTagArray.length > 5) {
    textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Нельзя указать больше пяти хэш-тегов.`);
    evt.preventDefault();
  } else if (isRepeat) {
    textHashtagsInput.setCustomValidity(`Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды.`);
    evt.preventDefault();
  } else if (isLength) {
    textHashtagsInput.setCustomValidity(`Минимальная длина одного хэш-тега – 2 символа, максимальная длина – 20 символов, включая решётку.`);
    evt.preventDefault();
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    textDescriptionInput.setCustomValidity(`Максимальная длина комментария 140 символов. Удалите лишние ${description.length - MAX_DESCRIPTION_LENGTH} симв.`);
    evt.preventDefault();
  } else if (!matches) {
    uploadOverlay.classList.add(`hidden`);
    window.successError.openErrorMessage();
    evt.preventDefault();
  } else {
    window.backend.save(new FormData(uploadForm), () => {
      uploadOverlay.classList.add(`hidden`);
    });
    evt.preventDefault();
    window.successError.openSuccessMessage();
  }
});
