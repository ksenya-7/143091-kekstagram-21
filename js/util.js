"use strict";

(() => {
  const Key = {
    ESCAPE: `Escape`,
    ENTER: `Enter`,
  };

  const isEscape = (evt) => (evt.key === Key.ESCAPE);
  const isEnter = (evt) => (evt.key === Key.ENTER);

  const getRandom = (min, max) =>
    Math.floor(min + Math.random() * (max + 1 - min));

  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

  window.util = {
    isEscape,
    isEnter,
    getRandom,
    getRandomFrom
  };
})();
