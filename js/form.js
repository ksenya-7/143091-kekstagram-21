"use strict";

const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 20;
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
const onUploadOverlayEscPress = (evt) => {
  if (window.util.isEscape(evt) && evt.target !== textHashtagsInput && evt.target !== textDescriptionInput) {
    evt.preventDefault();
    window.cancelOldValues();
    uploadOverlay.classList.add(`hidden`);
  }
  document.removeEventListener(`keydown`, onUploadOverlayEscPress);
  uploadCancel.removeEventListener(`click`, closeUploadOverlay);
};

const closeUploadOverlay = () => {
  window.cancelOldValues();
  uploadOverlay.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onUploadOverlayEscPress);
  uploadCancel.removeEventListener(`click`, closeUploadOverlay);
};

uploadFile.addEventListener(`change`, () => {
  uploadOverlay.classList.remove(`hidden`);

  uploadCancel.addEventListener(`click`, closeUploadOverlay);
  document.addEventListener(`keydown`, onUploadOverlayEscPress);
});

// валидация
const re = /^\s*#\w*$/;

uploadForm.addEventListener(`submit`, (evt) => {
  const hashTag = textHashtagsInput.value;
  const hashTags = hashTag.split(` `);
  const description = textDescriptionInput.value;

  const hashTagSet = new Set();
  for (let element of hashTags) {
    hashTagSet.add(element.toLowerCase());
  }

  const isRepeatOfTag = hashTagSet.size < hashTags.length;
  const isInvalidOfTag = textHashtagsInput.value === `` ? false : hashTags.some((element) => !re.test(element));
  const isMinLengthOfTag = hashTags.some((element) => element.length > MAX_HASHTAG_LENGTH);
  const isMaxLengthOfTag = hashTags.some((element) => element.length < MIN_HASHTAG_LENGTH);
  const isLengthOfDescription = description.length > MAX_DESCRIPTION_LENGTH ? true : false;

  const listenChangesOfForm = () => {
    textHashtagsInput.setCustomValidity(``);
    textDescriptionInput.setCustomValidity(``);
    textHashtagsInput.style.outline = `none`;
    textDescriptionInput.style.outline = `none`;
    textHashtagsInput.reportValidity();
    textDescriptionInput.reportValidity();
  };

  uploadForm.addEventListener(`keydown`, listenChangesOfForm);

  evt.preventDefault();
  if (isInvalidOfTag || hashTags.length > 5) {
    textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Нельзя указать больше пяти хэш-тегов.`);
    textHashtagsInput.style.outline = `2px solid red`;
  } else if (isRepeatOfTag) {
    textHashtagsInput.setCustomValidity(`Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды.`);
    textHashtagsInput.style.outline = `2px solid red`;
  } else if (isMinLengthOfTag || isMaxLengthOfTag) {
    textHashtagsInput.setCustomValidity(`Минимальная длина одного хэш-тега – 2 символа, максимальная длина – 20 символов, включая решётку.`);
    textHashtagsInput.style.outline = `2px solid red`;
  } else if (isLengthOfDescription) {
    textDescriptionInput.setCustomValidity(`Максимальная длина комментария 140 символов. Удалите лишние ${description.length - MAX_DESCRIPTION_LENGTH} симв.`);
    textDescriptionInput.style.outline = `2px solid red`;
  } else if (!matches) {
    uploadOverlay.classList.add(`hidden`);
    window.successError.openErrorMessage();
  } else {
    window.backend.save(new FormData(uploadForm), () => {
      uploadOverlay.classList.add(`hidden`);
      window.cancelOldValues();
      window.successError.openSuccessMessage();
    });
  }
  uploadForm.reportValidity();
});
