"use strict";

const uploadPreview = document.querySelector(`.img-upload__preview`);
const effectsPreview = document.querySelectorAll(`.effects__preview`);
const effectslLabel = document.querySelectorAll(`.effects__label`);
const uploadLevel = document.querySelector(`.img-upload__effect-level`);
const effectLevelValue = uploadLevel.querySelector(`.effect-level__value`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);

const filtersEffectsMap = {
  'none': () => {
    checkedFilter = `none`;
    uploadPreview.classList.add(`effects__preview--none`);
    uploadLevel.style.display = `none`;
    uploadPreview.style.filter = `none`;
  },
  'chrome': () => {
    checkedFilter = `chrome`;
    uploadPreview.classList.add(`effects__preview--chrome`);
    uploadPreview.style.filter = `grayscale(1)`;
    uploadLevel.style.display = `block`;
  },
  'sepia': () => {
    checkedFilter = `sepia`;
    uploadPreview.classList.add(`effects__preview--sepia`);
    uploadPreview.style.filter = `sepia(1)`;
    uploadLevel.style.display = `block`;
  },
  'marvin': () => {
    checkedFilter = `marvin`;
    uploadPreview.classList.add(`effects__preview--marvin`);
    uploadPreview.style.filter = `invert(100%)`;
    uploadLevel.style.display = `block`;
  },
  'phobos': () => {
    checkedFilter = `phobos`;
    uploadPreview.classList.add(`effects__preview--phobos`);
    uploadPreview.style.filter = `blur(3px)`;
    uploadLevel.style.display = `block`;
  },
  'heat': () => {
    checkedFilter = `heat`;
    uploadPreview.classList.add(`effects__preview--heat`);
    uploadPreview.style.filter = `brightness(3)`;
    uploadLevel.style.display = `block`;
  },
};

const filterValueMap = {
  'none': () => `none`,
  'chrome': (valueFilter) => `grayscale(${valueFilter / 100})`,
  'sepia': (valueFilter) => `sepia(${valueFilter / 100})`,
  'marvin': (valueFilter) => `invert(${valueFilter}%)`,
  'phobos': (valueFilter) => `blur(${1 + valueFilter / 100 * 2}px)`,
  'heat': (valueFilter) => `brightness(${1 + valueFilter / 100 * 2})`,
};

const numerOfFilterEffect = {
  'none': 0,
  'chrome': 1,
  'sepia': 2,
  'marvin': 3,
  'phobos': 4,
  'heat': 5,
};

effectLevelPin.style.cursor = `ew-resize`;
uploadLevel.style.display = `none`;
let checkedFilter;
let valueFilter;

const effectLevel = (value) => {
  effectLevelPin.style.left = `${value}%`;
  uploadLevel.querySelector(`.effect-level__depth`).style.width = `${value}%`;
  effectLevelValue.value = value;
};

const filterChangeEffect = (evt) => {
  valueFilter = 100;
  effectLevelValue.value = valueFilter;
  uploadPreview.className = `img-upload__preview effects__preview--none`;

  if (evt.target && evt.target.matches(`input[type="radio"]`)) {
    effectsPreview.forEach((el) => {
      el.style.border = `none`;
    });
    effectslLabel.forEach((el) => {
      el.style.color = `white`;
    });
    filtersEffectsMap[evt.target.value]();
    effectsPreview[numerOfFilterEffect[evt.target.value]].style.border = `#ffe753`;
    effectslLabel[numerOfFilterEffect[evt.target.value]].style.color = `#ffe753`;
    effectLevel(valueFilter);
    effectLevelValue.value = `${valueFilter}`;
  }
  checkedFilter = evt.target.value;
};

document.querySelector(`.img-upload__form`).addEventListener(`change`, filterChangeEffect);

effectLevelPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    valueFilter = (effectLevelPin.offsetLeft - shift.x) / 452.5 * 100;
    if (valueFilter > 100) {
      valueFilter = 100;
    } else if (valueFilter < 0) {
      valueFilter = 0;
    }
    effectLevel(valueFilter);
  };

  const onMouseUp = (upEvt) =>{
    effectLevel(valueFilter);
    upEvt.preventDefault();
    uploadPreview.style.filter = filterValueMap[checkedFilter](valueFilter);

    effectLevelPin.removeEventListener(`mousemove`, onMouseMove);
    effectLevelPin.removeEventListener(`mouseup`, onMouseUp);
  };

  effectLevelPin.addEventListener(`mousemove`, onMouseMove);
  effectLevelPin.addEventListener(`mouseup`, onMouseUp);
});

const cancelOldValues = () => {
  uploadPreview.style.filter = `none`;
  uploadLevel.style.display = `none`;
  document.querySelector(`.text__hashtags`).value = ``;
  document.querySelector(`.text__description`).value = ``;
  window.move.valueFilter = 100;
  effectsPreview.forEach((el) => {
    el.style.border = `none`;
  });
  effectslLabel.forEach((el) => {
    el.style.color = `white`;
  });

  effectsPreview[0].style.border = `#ffe753`;
  effectslLabel[0].style.color = `#ffe753`;
};

window.move = {
  cancelOldValues
};
