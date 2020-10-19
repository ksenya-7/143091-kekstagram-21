"use strict";

(() => {
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const MAX_DESCRIPTION_LENGTH = 140;

  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadFile = uploadForm.querySelector(`#upload-file`);
  const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
  const uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);

  const textHashtagsInput = uploadOverlay.querySelector(`.text__hashtags`);
  const textDescriptionInput = uploadOverlay.querySelector(`.text__description`);

  // открытие-закрытие формы
  const openUploadForm = () => {
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
    uploadOverlay.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onUploadOverlayEscPress);
    uploadFile.value = ``;
  };

  uploadCancel.addEventListener(`click`, closeUploadOverlay);
  document.addEventListener(`keydown`, onUploadOverlayEscPress);

  // валидация хэш-тега
  textHashtagsInput.addEventListener(`input`, () => {
    const re = /^#\w*$/;
    const hashTag = textHashtagsInput.value;

    if (!re.test(hashTag)) {
      textHashtagsInput.setCustomValidity(`Хэш-тег начинается с символа # (решётка).`);
    } else if (hashTag.length < MIN_HASHTAG_LENGTH) {
      textHashtagsInput.setCustomValidity(`Хэш-тег не может состоять только из одной решётки. Ещё ${MIN_HASHTAG_LENGTH - hashTag.length} симв.`);
    } else if (!re.test(hashTag)) {
      textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    } else if (hashTag.length > MAX_NAME_LENGTH) {
      textHashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку. Удалите лишние ${hashTag.length - MAX_NAME_LENGTH} симв.`);
    } else if (re.test(hashTag)) {
      textHashtagsInput.setCustomValidity(``);
    }
    textHashtagsInput.reportValidity();
  });

  uploadForm.addEventListener(`submit`, () => {
    const re = /^\s*#\w*$/;
    const hashTag = textHashtagsInput.value;
    const hashTagArray = hashTag.split(` `);

    const hashTagSet = new Set();
    for (let element of hashTagArray) {
      hashTagSet.add(element.toLowerCase());
    }

    hashTagArray.forEach((element) => {
      if (!re.test(element)) {
        textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
      } else if (element.length > MAX_NAME_LENGTH) {
        textHashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку. Удалите лишние ${element.length - MAX_NAME_LENGTH}} симв.`);
      } else if (hashTagSet.has(element.toLowerCase())) {
        textHashtagsInput.setCustomValidity(`Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды.`);
      } else if (hashTagArray.length > 5) {
        textHashtagsInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов.`);
      } else if (re.test(element)) {
        textHashtagsInput.setCustomValidity(``); // тут какое-то подтвеждение, что можно отправлять, видимо
      }
    }
    );
  });

  // валидация поля комментариев
  textDescriptionInput.addEventListener(`input`, () => {
    const description = textDescriptionInput.value;

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      textDescriptionInput.setCustomValidity(`Максимальная длина комментария 140 символов. Удалите лишние ${description.length - MAX_DESCRIPTION_LENGTH} симв.`);
    }
  });
})();
