"use strict";

(() => {
  const PICTURES_AMOUNT = 25;
  const COMMENTS_AMOUNT = 50;

  const randomNumber = window.util.getRandom(1, COMMENTS_AMOUNT);
  const generatePictures = (amount) =>
    new Array(amount).fill(``).map((_, idx) => ({
      url: `photos/${idx + 1}.jpg`,
      description: `Это потрясающе`,
      likes: window.util.getRandom(15, 200),
      comments: window.picture.generateComments(randomNumber),
    }));

  const pictures = generatePictures(PICTURES_AMOUNT);

  window.gallery = {
    pictures
  };
})();
