"use strict";

(() => {
  const MAX_RANDOM_PICTURES_COUNT = 10;

  const blockPictures = document.querySelector(`.pictures`);
  const filters = document.querySelector(`.img-filters`);
  const filtersForm = filters.querySelector(`.img-filters__form`);
  const filtersButtons = filtersForm.querySelectorAll(`.img-filters__button`);
  filters.classList.remove(`img-filters--inactive`);

  let currentButton = filtersForm.querySelector(`#filter-default`);
  let picturesArray = [];
  let picturesNotChangedArray = [];

  // по умолчанию открытие страницы
  (window.backend.load((pictures) => {
    picturesNotChangedArray = pictures;
    picturesArray = pictures;
    updatePictures(picturesArray);
  }, () => {}));

  const getRank = (element) => {
    let rank = 0;
    rank += element.comments.length;
    return rank;
  };

  const getRandomPictures = (pictures, amount) => new Array(amount).fill(``).map(() => (window.util.getRandomFrom(pictures)));

  const getDiscussedPictures = (pictures) => pictures.sort((left, right) => getRank(right) - getRank(left));


  // const resultfilterButtons = {
  //   `filter-default`: picturesArray,
  //   `filter-random`: getRandomPictures(picturesArray),
  //   `filter-discussed`: getDiscussedPictures(picturesArray),
  // };

  const updatePictures = (pictures) => {

    const fragment = document.createDocumentFragment();

    pictures.map(window.picture.renderPicture).forEach((element) => fragment.append(element));

    blockPictures.append(fragment);
  };

  const disactiveButtons = (buttons) => {
    for (let button of buttons) {
      button.classList.remove(`img-filters__button--active`);
    }
  };

  const activeButton = (button) => {
    button.classList.add(`img-filters__button--active`);
  };

  const successHandler = (pictures) => {
    picturesArray = pictures;
    // console.log(picturesArray);

    filtersButtons[0].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      blockPictures.querySelectorAll(`.picture`).forEach((element) => (element.remove()));
      disactiveButtons(filtersButtons);
      activeButton(filtersButtons[0]);
      picturesArray = picturesNotChangedArray;
      window.debounce.debounce(updatePictures(picturesArray));
      // console.log(picturesArray);
    });

    filtersButtons[1].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      blockPictures.querySelectorAll(`.picture`).forEach((element) => (element.remove()));
      disactiveButtons(filtersButtons);
      activeButton(filtersButtons[1]);
      picturesArray = pictures;
      picturesArray = getRandomPictures(picturesArray, MAX_RANDOM_PICTURES_COUNT);
      window.debounce.debounce(updatePictures(picturesArray));
      // console.log(picturesArray);
    });

    filtersButtons[2].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      blockPictures.querySelectorAll(`.picture`).forEach((element) => (element.remove()));
      currentButton = evt.target;
      disactiveButtons(filtersButtons);
      activeButton(currentButton);
      picturesArray = pictures;
      picturesArray = getDiscussedPictures(picturesArray);
      window.debounce.debounce(updatePictures(picturesArray));
      // console.log(picturesArray);
    });
  };

  window.filter = {
    successHandler
  };
})();
