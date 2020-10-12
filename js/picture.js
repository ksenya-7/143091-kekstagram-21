"use strict";

(() => {
  const AVATARS_AMOUNT = 6;
  // const COMMENTS_AMOUNT = 50;
  const MESSAGES = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];
  const NAMES = [
    `Алексей`,
    `Ксения`,
    `Анастасия`,
    `Константин`,
    `Родион`,
    `Иван`,
  ];

  const pictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);

  const generateComments = (amount) => {
    return new Array(amount).fill(``).map(() => ({
      avatar: `img/avatar-${window.util.getRandom(1, AVATARS_AMOUNT)}.svg`,
      message: window.util.getRandomFrom(MESSAGES),
      name: window.util.getRandomFrom(NAMES),
    }));
  };

  const renderPicture = (picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = picture.url;
    pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

    return pictureElement;
  };

  const renderPictures = (pictures) => {
    const fragment = document.createDocumentFragment();

    pictures.map(renderPicture).forEach((element) => fragment.append(element));

    return fragment;
  };

  window.picture = {
    generateComments,
    renderPictures
  };
})();
