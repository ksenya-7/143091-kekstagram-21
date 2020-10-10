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

const MIN_HASHTAG_LENGTH = 2;
const MAX_NAME_LENGTH = 20;

const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
};

const pictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
const blockPictures = document.querySelector(`.pictures`);

const bigPicture = document.querySelector(`.big-picture`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const socialComment = socialComments.querySelector(`.social__comment`);
const templateComment = socialComment.cloneNode(true);

const uploadForm = document.querySelector(`.img-upload__form`);
const uploadFile = uploadForm.querySelector(`#upload-file`);
const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
const uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
const uploadPreview = uploadForm.querySelector(`.img-upload__preview`);
const uploadLevel = uploadOverlay.querySelector(`.img-upload__effect-level`);
const effectLevelPin = uploadOverlay.querySelector(`.effect-level__pin`);
const effectLevelValue = uploadOverlay.querySelector(`.effect-level__value`);

const textHashtagsInput = uploadOverlay.querySelector(`.text__hashtags`);


const isEscape = (evt) => (evt.key === Key.ESCAPE);

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

const renderBigPicture = (picture) => {
  bigPicture.querySelector(`img`).src = picture.url;
  bigPicture.querySelector(`img`).alt = picture.description;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;

  socialComments.innerHTML = ``;
  picture.comments.map(renderComment).forEach((element) => socialComments.append(element));

  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.classList.remove(`hidden`);

  return bigPicture;
};

renderBigPicture(pictures[0]);

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


const openUploadForm = () => {
  uploadOverlay.classList.remove(`hidden`);
};
uploadFile.addEventListener(`change`, openUploadForm);

const onUploadOverlayEscPress = (evt) => {
  if (isEscape(evt) && evt.target !== textHashtagsInput) {
    evt.preventDefault();
    uploadOverlay.classList.add(`hidden`);
  }
};

const closeUploadOverlay = () => {
  uploadOverlay.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onUploadOverlayEscPress);
  uploadFile.value = ``;
};

uploadCancel.addEventListener(`click`, closeUploadOverlay);
document.addEventListener(`keydown`, onUploadOverlayEscPress);

uploadLevel.style.display = `none`;

let checkedFilter = ``;

const filterChangeEffect = (evt) => {
  uploadPreview.className = `.img-upload__preview`;
  if (evt.target && evt.target.matches(`input[type="radio"]`)) {
    if (evt.target.value === `chrome`) {
      checkedFilter = `chrome`;
      uploadPreview.classList.add(`effects__preview--chrome`);
      uploadPreview.style.filter = `grayscale(1)`;
      uploadLevel.style.display = `block`;
    } else if (evt.target.value === `sepia`) {
      checkedFilter = `sepia`;
      uploadPreview.classList.add(`effects__preview--sepia`);
      uploadPreview.style.filter = `sepia(1)`;
      uploadLevel.style.display = `block`;
    } else if (evt.target.value === `marvin`) {
      checkedFilter = `marvin`;
      uploadPreview.classList.add(`effects__preview--marvin`);
      uploadPreview.style.filter = `invert(100%)`;
      uploadLevel.style.display = `block`;
    } else if (evt.target.value === `phobos`) {
      checkedFilter = `phobos`;
      uploadPreview.classList.add(`effects__preview--phobos`);
      uploadPreview.style.filter = `blur(3px)`;
      uploadLevel.style.display = `block`;
    } else if (evt.target.value === `heat`) {
      checkedFilter = `heat`;
      uploadPreview.classList.add(`effects__preview--heat`);
      uploadPreview.style.filter = `brightness(3)`;
      uploadLevel.style.display = `block`;
    } else if (evt.target.value === `none`) {
      checkedFilter = `none`;
      uploadPreview.classList.add(`effects__preview--none`);
      uploadLevel.style.display = `none`;
      uploadPreview.style.filter = `none`;
    }
  }
  return checkedFilter;
};

const filterChangeEffectLevel = () => {
  const valueFilter = effectLevelValue.value;
  effectLevelPin.style.left = `${valueFilter}%`;
  uploadLevel.querySelector(`.effect-level__depth`).style.width = `${valueFilter}%`;

  if (checkedFilter === `chrome`) {
    uploadPreview.style.filter = `grayscale(${valueFilter / 100})`;
  } else if (checkedFilter === `sepia`) {
    uploadPreview.style.filter = `sepia(${valueFilter / 100})`;
  } else if (checkedFilter === `marvin`) {
    uploadPreview.style.filter = `invert(${valueFilter}%)`;
  } else if (checkedFilter === `phobos`) {
    uploadPreview.style.filter = `blur(${1 + valueFilter / 100 * 2}px)`;
  } else if (checkedFilter === `heat`) {
    uploadPreview.style.filter = `brightness(${1 + valueFilter / 100 * 2})`;
  } else if (checkedFilter === `none`) {
    uploadPreview.style.filter = `none`;
  }
};

uploadForm.addEventListener(`change`, filterChangeEffect);
effectLevelPin.addEventListener(`mouseup`, filterChangeEffectLevel);

textHashtagsInput.addEventListener(`input`, () => {
  const re = /^#\w*$/;
  const hashTag = textHashtagsInput.value;

  if (!re.test(hashTag)) {
    textHashtagsInput.setCustomValidity(`Хэш-тег начинается с символа # (решётка).`);
  } else if (hashTag.length < MIN_HASHTAG_LENGTH) {
    textHashtagsInput.setCustomValidity(`Хэш-тег не может состоять только из одной решётки. Ещё ${MIN_HASHTAG_LENGTH - hashTag.length} симв.`);
  } else if (!re.test(hashTag)) {
    textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
  } else if (hashTag.length > MAX_NAME_LENGTH) {
    textHashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку. Удалите лишние ${hashTag.length - MAX_NAME_LENGTH} симв.`);
  } else if (re.test(hashTag)) {
    textHashtagsInput.setCustomValidity(``);
  }
  textHashtagsInput.reportValidity();
});

uploadForm.addEventListener(`submit`, () => {
  const re = /^\s*#\w*$/;
  const hashTag = textHashtagsInput.value;
  const hashTagArray = hashTag.split(` `);

  const hashTagSet = new Set();
  for (let element of hashTagArray) {
    hashTagSet.add(element.toLowerCase());
  }

  hashTagArray.forEach((element) => {
    if (!re.test(element)) {
      textHashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    } else if (element.length > MAX_NAME_LENGTH) {
      textHashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку. Удалите лишние ${element.length - MAX_NAME_LENGTH}} симв.`);
    } else if (hashTagSet.has(element.toLowerCase())) {
      textHashtagsInput.setCustomValidity(`Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Один и тот же хэш-тег не может быть использован дважды.`);
    } else if (hashTagArray.length > 5) {
      textHashtagsInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов.`);
    } else if (re.test(element)) {
      textHashtagsInput.setCustomValidity(``); // тут какое-то подтвеждение, что можно отправлять, видимо
    }
  }
  );
});

