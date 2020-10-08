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
// const PICTURES_NUMBER = 0;

const pictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
const blockPictures = document.querySelector(`.pictures`);

const bigPicture = document.querySelector(`.big-picture`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const socialComment = socialComments.querySelector(`.social__comment`);
const templateComment = socialComment.cloneNode(true);
// console.log(socialComments);

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
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.map(renderPicture).forEach((element) => fragment.append(element));

  return fragment;
};

const pictures = generatePictures(PICTURES_AMOUNT);
blockPictures.append(renderPictures(pictures));


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
// console.log(socialComments);

// const renderComments = (comments) => {
//   comments.map(renderComment).forEach((element) => socialComments.append(element));
//   return socialComments;
// };


const renderBigPicture = (picture) => {

  bigPicture.querySelector(`img`).src = picture.url;
  bigPicture.querySelector(`img`).alt = picture.description;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
  bigPicture.querySelector(`.big-picture__social`).append(picture.comments.map(renderComment).forEach((element) => socialComments.append(element)));

  // console.log(socialComments);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  // bigPicture.classList.remove(`hidden`);

  return bigPicture;
};

renderBigPicture(pictures[0]);

// console.log(renderBigPicture(pictures[0]));

document.querySelector(`body`).classList.add(`modal-open`);

const bigPictureCancel = bigPicture.querySelector(`#picture-cancel`);

const onBigPictureEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    bigPicture.classList.add(`hidden`);
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onBigPictureEscPress);
};

bigPictureCancel.addEventListener(`click`, closeBigPicture);
document.addEventListener(`keydown`, onBigPictureEscPress);

const uploadForm = document.querySelector(`.img-upload__form`);
const uploadFile = uploadForm.querySelector(`#upload-file`);
const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
const uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
const effectLevelPin = uploadOverlay.querySelector(`.effect-level__pin`);
const effectChrome = uploadOverlay.querySelector(`.effects__preview--chrome`);
const effectSepia = uploadOverlay.querySelector(`.effects__preview--sepia`);
const effectMarvin = uploadOverlay.querySelector(`.effects__preview--marvin`);
const effectPhobos = uploadOverlay.querySelector(`.effects__preview--phobos`);
const effectHeat = uploadOverlay.querySelector(`.effects__preview--heat`);

const textHashtagsInput = uploadOverlay.querySelector(`.text__hashtags`);

uploadOverlay.classList.remove(`hidden`);

const onUploadOverlayEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    uploadOverlay.classList.add(`hidden`);
  }
  uploadFile.value = ``;
};

const closeUploadOverlay = () => {
  uploadOverlay.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onUploadOverlayEscPress);
  uploadFile.value = ``;
};

uploadCancel.addEventListener(`click`, closeUploadOverlay);
document.addEventListener(`keydown`, onUploadOverlayEscPress);

effectLevelPin.addEventListener(`mouseup`, () => {
  effectChrome.grayscale = `effectLevelPin.left/100`;
  effectSepia.sepia = `effectLevelPin.left/100`;
  effectMarvin.invert = `effectLevelPin.left`;
  effectPhobos.blur = `1 + effectLevelPin.left/100*2`;
  effectHeat.filter = `1 + effectLevelPin.left/100*2`;
});

// Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу
// сбрасываться до начального состояния, т. е. логика по определению уровня насыщенности
// должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.
// filter: brightness(3);

const MIN_HASHTAG_LENGTH = 2;

textHashtagsInput.addEventListener(`input`, function () {
  const valueLength = textHashtagsInput.value.length;
  const hashTag = textHashtagsInput.value;
  const re = /^[\b#[\w\d]{1,20}\b]?$/i;
  // /^[[\b#[\w\d]{1,20}\b\s]?]*$/i;
  // /^[[\b#[\w\d]{1,20}\b]?\s{1}]*$/i;

  if (!re.test(hashTag)) {
    textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., максимальная длина одного хэш-тега 20 символов, включая решётку.`);
  } else if (valueLength < MIN_HASHTAG_LENGTH) {
    textHashtagsInput.setCustomValidity(`Ещё ` + (MIN_HASHTAG_LENGTH - valueLength) + ` симв.`);
  } else {
    textHashtagsInput.setCustomValidity(``);
  }

  textHashtagsInput.reportValidity();
  // console.log(re.test(hashTag));
});

// Если форма заполнена верно, то должна показываться страница сервера, указанная
// в атрибуте action тега form, с успешно отправленными данными, если же форма пропустила
// какие-то некорректные значения, то будет показана страница с допущенными ошибками.
// В идеале у пользователя не должно быть сценария при котором он может отправить некорректную форму.
