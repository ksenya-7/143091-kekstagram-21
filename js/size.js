'use strict';

const MIN_VALUE_FILTER = 25;
const STEP_VALUE_FILTER = 25;
const MAX_VALUE_FILTER = 100;
const uploadScale = document.querySelector(`.img-upload__scale`);
const smallerControl = uploadScale.querySelector(`.scale__control--smaller`);
const biggerControl = uploadScale.querySelector(`.scale__control--bigger`);
const valueControl = uploadScale.querySelector(`.scale__control--value`);
const bigPreview = document.querySelector(`.img-upload__preview img`);

const changeSizeOfBigPreview = (value) => {
  valueControl.setAttribute(`value`, `${value}%`);
  bigPreview.style.transform = `scale(${value / MAX_VALUE_FILTER})`;
};
changeSizeOfBigPreview(MAX_VALUE_FILTER);

smallerControl.addEventListener(`click`, () => {
  const currentValueSize = valueControl.value;
  const newValueSize = parseInt(currentValueSize, 10) - STEP_VALUE_FILTER;

  if (newValueSize >= MIN_VALUE_FILTER) {
    changeSizeOfBigPreview(newValueSize);
  } else {
    valueControl.setAttribute(`value`, `25%`);
  }
});

biggerControl.addEventListener(`click`, () => {
  const currentValueSize = valueControl.value;
  const newValueSize = parseInt(currentValueSize, 10) + STEP_VALUE_FILTER;

  if (newValueSize <= MAX_VALUE_FILTER) {
    changeSizeOfBigPreview(newValueSize);
  } else {
    valueControl.setAttribute(`value`, `100%`);
  }
});
