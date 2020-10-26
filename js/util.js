"use strict";

const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
};

const isEscape = (evt) => (evt.key === Key.ESCAPE);
const isEnter = (evt) => (evt.key === Key.ENTER);

const getRandom = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const createErrorMessage = (message) => {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `15px`;
  node.style.color = `red`;
  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

let shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

window.util = {
  isEscape,
  isEnter,
  getRandom,
  getRandomFrom,
  createErrorMessage,
  shuffleArray
};
