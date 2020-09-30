'use strict';

const MESSAGES = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const NAMES = [`Алексей`, `Ксения`, `Анастасия`, `Константин`, `Родион`, `Иван`];
const PICTURES_AMOUNT = 25;
const AVATARS_AMOUNT = 6;

const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const blockPictures = document.querySelector(`.pictures`);

const getRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generatePictures = (amount) => new Array(amount).fill(``).map((_, idx) => ({
  url: `photos/${idx + 1}.jpg`,
  description: ``,
  likes: getRandom(15, 200),
  comment: {
    avatar: `"img/avatar-` + getRandom(1, AVATARS_AMOUNT) + `.svg",`,
    message: getRandomFrom(MESSAGES),
    name: getRandomFrom(NAMES)
  }
}));

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = 1;

  return pictureElement;
};

const renderPictures = (elements) => {
  const fragment = document.createDocumentFragment();

  elements.map(renderPicture).forEach((element) => fragment.append(element));

  return fragment;
};

const pictures = generatePictures(PICTURES_AMOUNT);
blockPictures.append(renderPictures(pictures));
