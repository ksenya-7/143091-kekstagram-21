"use strict";

const MAX_RANDOM_PICTURES_COUNT = 10;

const body = document.querySelector(`body`);
const blockPictures = document.querySelector(`.pictures`);
const filters = document.querySelector(`.img-filters`);
const filtersButtons = filters.querySelectorAll(`.img-filters__button`);

const getRank = (element) => {
  let rank = 0;
  rank += element.comments.length;
  return rank;
};

const updatePictures = (elements) => {
  const fragment = document.createDocumentFragment();

  elements.map(window.renderPicture).forEach((element) => fragment.append(element));

  blockPictures.append(fragment);
};

const listenSmallPictures = (smallPictures, elements) => {
  for (let i = 0; i < smallPictures.length; i++) {
    smallPictures[i].addEventListener(`click`, () => {
      window.renderBigPicture(elements[i]);
    });
  }
};

const renderGallery = (elements) => {
  updatePictures(elements);
  body.classList.remove(`modal-open`);
  const smallPictures = blockPictures.querySelectorAll(`.picture`);
  listenSmallPictures(smallPictures, elements);
};

const showFilters = () => {
  filters.classList.remove(`img-filters--inactive`);
};
const getStartPictures = (elements) => elements.slice();
const getRandomPictures = (elements, amount) => window.util.shuffleElements(elements.slice()).slice(0, amount);
const getMostDiscussedPictures = (elements) => elements.slice().sort((left, right) => getRank(right) - getRank(left));
const debouncedRenderGallery = (elements) => window.debounce(renderGallery(elements));

const filtersMap = {
  'filter-default': (elements) => {
    const startPictures = getStartPictures(elements);
    clearBlockPicturesAndRemoveModalOpen();
    disactiveButtons(filtersButtons);
    debouncedRenderGallery(startPictures);
  },
  'filter-random': (elements) => {
    const randomPictures = getRandomPictures(elements, MAX_RANDOM_PICTURES_COUNT);
    clearBlockPicturesAndRemoveModalOpen();
    disactiveButtons(filtersButtons);
    debouncedRenderGallery(randomPictures);
  },
  'filter-discussed': (elements) => {
    const mostDiscussedPictures = getMostDiscussedPictures(elements);
    clearBlockPicturesAndRemoveModalOpen();
    disactiveButtons(filtersButtons);
    debouncedRenderGallery(mostDiscussedPictures);
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

const clearBlockPicturesAndRemoveModalOpen = () => {
  blockPictures.querySelectorAll(`.picture`).forEach((element) => (element.remove()));
  body.classList.remove(`modal-open`);
};

const filtersHandler = (pictures) => {
  for (let filtersButton of filtersButtons) {
    filtersButton.addEventListener(`click`, (evt) => {
      filtersMap[evt.target.id](pictures);
      activeButton(filtersButton);
    });
  }
};

let loadPictures = [];
const successHandler = (data) => {
  loadPictures = data;
  renderGallery(loadPictures);
  showFilters();
  filtersHandler(loadPictures);
};

window.successHandler = successHandler;
