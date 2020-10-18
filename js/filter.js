"use strict";

(() => {
  const MAX_RANDOM_PICTURES_COUNT = 10;

  const blockPictures = document.querySelector(`.pictures`);
  const filters = document.querySelector(`.img-filters`);
  const filtersForm = filters.querySelector(`.img-filters__form`);
  const filtersButtons = filtersForm.querySelectorAll(`.img-filters__button`);
  filters.classList.remove(`img-filters--inactive`);

  let picturesNotChangedArray = [];

  // по умолчанию открытие страницы
  (window.backend.load((pictures) => {
    picturesNotChangedArray = pictures;
    updatePictures(pictures);

    const smallPictures = blockPictures.querySelectorAll(`.picture`);
    // console.log(smallPictures);

    for (let i = 0; i < smallPictures.length; i++) {
      smallPictures[i].addEventListener(`click`, () => {
        window.preview.renderBigPicture(picturesNotChangedArray[i]);
      });
    }
  }, () => {}));

  const getRank = (element) => {
    let rank = 0;
    rank += element.comments.length;
    return rank;
  };

  const getRandomPictures = (pictures, amount) => (window.util.shuffleArray(pictures)).slice(0, amount);

  const getMostDiscussedPictures = (pictures) => pictures.sort((left, right) => getRank(right) - getRank(left));

  const filtersMap = {
    'filter-default': () => picturesNotChangedArray,
    'filter-random': (pictures) => getRandomPictures(pictures, MAX_RANDOM_PICTURES_COUNT),
    'filter-discussed': (pictures) => getMostDiscussedPictures(pictures)
  };

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
    for (let filtersButton of filtersButtons) {
      const filteredPictures = filtersMap[filtersButton.id](pictures);
      filtersButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        blockPictures.querySelectorAll(`.picture`).forEach((element) => (element.remove()));
        disactiveButtons(filtersButtons);
        activeButton(filtersButton);
        window.debounce.debounce(updatePictures(filteredPictures));
        document.querySelector(`body`).classList.remove(`modal-open`);
        // console.log(filteredPictures);
        const smallPictures = blockPictures.querySelectorAll(`.picture`);
        // console.log(smallPictures);

        for (let i = 0; i < smallPictures.length; i++) {
          smallPictures[i].addEventListener(`click`, () => {
            window.preview.renderBigPicture(filteredPictures[i]);
          });
        }
      });
    }
  };

  window.filter = {
    successHandler,
    blockPictures
  };
})();
