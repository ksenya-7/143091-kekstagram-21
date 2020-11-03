'use strict';

const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
};

const isEscape = (evt) => (evt.key === Key.ESCAPE);
const isEnter = (evt) => (evt.key === Key.ENTER);

const getRandom = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

let shuffleElements = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
};

window.util = {
  isEscape,
  isEnter,
  getRandom,
  getRandomFrom,
  shuffleElements
};
