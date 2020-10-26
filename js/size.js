'use strict';

const uploadScale = document.querySelector(`.img-upload__scale`);
const smallerControl = uploadScale.querySelector(`.scale__control--smaller`);
const biggerControl = uploadScale.querySelector(`.scale__control--bigger`);
const valueControl = uploadScale.querySelector(`.scale__control--value`);
const bigPreview = document.querySelector(`.img-upload__preview img`);

const valueSize = 100;
// valueControl.setAttribute(`value`, `${valueSize}%`);

const changeSizeOfBigPreview = (value) => {
  valueControl.setAttribute(`value`, `${value}%`);
  bigPreview.style.transform = `scale(${value / 100})`;
};
changeSizeOfBigPreview(valueSize);

smallerControl.addEventListener(`click`, () => {
  const currentValueSize = valueControl.value;
  const newValueSize = parseInt(currentValueSize, 10) - 25;

  if (newValueSize >= 0) {
    changeSizeOfBigPreview(newValueSize);
  } else {
    valueControl.setAttribute(`value`, `0%`);
  }
});

biggerControl.addEventListener(`click`, () => {
  const currentValueSize = valueControl.value;
  const newValueSize = parseInt(currentValueSize, 10) + 25;

  if (newValueSize <= 100) {
    changeSizeOfBigPreview(newValueSize);
  } else {
    valueControl.setAttribute(`value`, `100%`);
  }
});
