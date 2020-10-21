"use strict";

(() => {
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_DESCRIPTION_LENGTH = 140;

  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadFile = uploadForm.querySelector(`#upload-file`);
  const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
  const uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
  const effectsPreview = uploadOverlay.querySelectorAll(`.effects__preview`);
  const effectslLabel = uploadOverlay.querySelectorAll(`.effects__label`);

  const textHashtagsInput = uploadOverlay.querySelector(`.text__hashtags`);
  const textDescriptionInput = uploadOverlay.querySelector(`.text__description`);

  // открытие-закрытие формы
  const cancelOldValues = () => {
    textHashtagsInput.value = ``;
    textDescriptionInput.value = ``;
    window.move.filtersEffectsMap[`none`]();
    window.move.filterValueMap[`none`]();
    window.move.checkedFilter = `none`;
    effectsPreview.forEach((el) => {
      el.style.border = `none`;
    });
    effectslLabel.forEach((el) => {
      el.style.color = `white`;
    });
  };

  const openUploadForm = () => {
    cancelOldValues();
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
    cancelOldValues();
    uploadOverlay.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onUploadOverlayEscPress);
    uploadFile.value = ``;
  };

  uploadCancel.addEventListener(`click`, closeUploadOverlay);
  document.addEventListener(`keydown`, onUploadOverlayEscPress);

  // валидация

  textHashtagsInput.addEventListener(`submit`, () => {
    const re = /^\s*#\w*$/;
    const hashTag = textHashtagsInput.value;
    const hashTagArray = hashTag.split(` `);

    const hashTagSet = new Set();
    for (let element of hashTagArray) {
      hashTagSet.add(element.toLowerCase());
    }

    hashTagArray.forEach((element) => {
      if (!re.test(element) || hashTagSet.has(element.toLowerCase()) || hashTagArray.length > 5) {
        textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды. Нельзя указать больше пяти хэш-тегов.`);
      } else if (element.length < MIN_HASHTAG_LENGTH || element.length > MAX_HASHTAG_LENGTH) {
        textHashtagsInput.setCustomValidity(`Минимальная длина одного хэш-тега – 2 символа, максимальная длина – 20 символов, включая решётку. Удалите лишние ${element.length - MAX_HASHTAG_LENGTH}} симв.`);
      } else {
        textHashtagsInput.setCustomValidity(``);
      }
    }
    );
  });


  textDescriptionInput.addEventListener(`submit`, () => {
    const description = textDescriptionInput.value;

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      textDescriptionInput.setCustomValidity(`Максимальная длина комментария 140 символов. Удалите лишние ${description.length - MAX_DESCRIPTION_LENGTH} симв.`);
    }
  });


  uploadForm.addEventListener(`submit`, (evt) => {
    window.backend.save(new FormData(uploadForm), () => {
      uploadOverlay.classList.add(`hidden`);
    });
    evt.preventDefault();
    window.successError.openSuccessMessage();
  });
})();
