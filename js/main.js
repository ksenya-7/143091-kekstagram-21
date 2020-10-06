"use strict";

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
const PICTURES_AMOUNT = 25;
const AVATARS_AMOUNT = 6;
const COMMENTS_AMOUNT = 50;
const PICTURES_NUMBER = 0;

const pictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
const blockPictures = document.querySelector(`.pictures`);

const bigPicture = document.querySelector(`.big-picture`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const socialComment = socialComments.querySelector(`.social__comment`);
const templateComment = socialComment.cloneNode(true);


const getRandom = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generateComments = (amount) => {
  return new Array(amount).fill(``).map(() => ({
    avatar: `img/avatar-${getRandom(1, AVATARS_AMOUNT)}.svg`,
    message: getRandomFrom(MESSAGES),
    name: getRandomFrom(NAMES),
  }));
};

const generatePictures = (amount) =>
  new Array(amount).fill(``).map((_, idx) => ({
    url: `photos/${idx + 1}.jpg`,
    description: `Это потрясающе`,
    likes: getRandom(15, 200),
    comments: generateComments(getRandom(1, COMMENTS_AMOUNT)),
  }));

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = getRandom(
      1,
      COMMENTS_AMOUNT
  );

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.map(renderPicture).forEach((element) => fragment.append(element));

  return fragment;
};

const pictures = generatePictures(PICTURES_AMOUNT);
blockPictures.append(renderPictures(pictures));


const renderBigPicture = (picture) => {
  bigPicture.querySelector(`img`).src = picture.url;
  bigPicture.querySelector(`img`).alt = picture.description;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;

  return bigPicture;
};

const currentBigPicture = pictures[PICTURES_NUMBER];
renderBigPicture(currentBigPicture);

const renderComment = (comment) => {
  const commentElement = templateComment.cloneNode(true);
  commentElement.querySelector(`.social__picture`).src = comment.avatar;
  commentElement.querySelector(`.social__picture`).alt = comment.name;
  commentElement.querySelector(`.social__picture`).width = `35`;
  commentElement.querySelector(`.social__picture`).height = `35`;
  commentElement.querySelector(`.social__text`).textContent = comment.message;

  return commentElement;
};

socialComments.innerHTML = ``;

const renderComments = (comments) => {
  comments.map(renderComment).forEach((element) => socialComments.append(element));

  return socialComments;
};

bigPicture.querySelector(`.big-picture__social`).append(renderComments(currentBigPicture.comments));
bigPicture.querySelector(`.big-picture__social`).append(bigPicture.querySelector(`.social__footer`));
bigPicture.classList.remove(`hidden`);

bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`body`).classList.add(`modal-open`);
