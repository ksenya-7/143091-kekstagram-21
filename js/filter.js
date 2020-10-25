"use strict";

const MAX_RANDOM_PICTURES_COUNT = 10;

const body = document.querySelector(`body`);
const blockPictures = document.querySelector(`.pictures`);
const filters = document.querySelector(`.img-filters`);
const filtersForm = filters.querySelector(`.img-filters__form`);
const filtersButtons = filtersForm.querySelectorAll(`.img-filters__button`);


const getRank = (element) => {
  let rank = 0;
  rank += element.comments.length;
  return rank;
};

const getRandomPictures = (pictures, amount) => window.util.shuffleArray(pictures).slice(0, amount);

const getMostDiscussedPictures = (pictures) => pictures.sort((left, right) => getRank(right) - getRank(left));

const updatePictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.map(window.renderPicture).forEach((element) => fragment.append(element));

  blockPictures.append(fragment);
};

const smallPicturesListener = (smallArray, array) => {
  for (let i = 0; i < smallArray.length; i++) {
    smallArray[i].addEventListener(`click`, () => {
      window.renderBigPicture(array[i]);
    });
  }
};

const disactiveButtons = (buttons) => {
  for (let button of buttons) {
    button.classList.remove(`img-filters__button--active`);
  }
};

const activeButton = (button) => {
  button.classList.add(`img-filters__button--active`);
};

let picturesNotChangedArray = [];

const renderGallery = (pictures) => {
  picturesNotChangedArray = pictures;
  updatePictures(picturesNotChangedArray);
  const smallPictures = blockPictures.querySelectorAll(`.picture`);
  body.classList.remove(`modal-open`);
  smallPicturesListener(smallPictures, picturesNotChangedArray);
};

const filtersMap = {
  'filter-default': () => picturesNotChangedArray,
  'filter-random': (pictures) => getRandomPictures(pictures, MAX_RANDOM_PICTURES_COUNT),
  'filter-discussed': (pictures) => getMostDiscussedPictures(pictures)
};

const successHandler = (pictures) => {
  renderGallery(pictures);
  window.addEventListener(`load`, filters.classList.remove(`img-filters--inactive`));

  for (let filtersButton of filtersButtons) {
    filtersButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const filteredPictures = filtersMap[evt.target.id](picturesNotChangedArray);
      blockPictures.querySelectorAll(`.picture`).forEach((element) => (element.remove()));
      disactiveButtons(filtersButtons);
      activeButton(filtersButton);
      window.debounce(updatePictures(filteredPictures));
      body.classList.remove(`modal-open`);
      const smallFilteredPictures = blockPictures.querySelectorAll(`.picture`);

      smallPicturesListener(smallFilteredPictures, filteredPictures);
    });
  }
};

window.successHandler = successHandler;
