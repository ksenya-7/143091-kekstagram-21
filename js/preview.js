"use strict";

const bigPicture = document.querySelector(`.big-picture`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);
const socialComments = bigPicture.querySelector(`.social__comments`);
const bigPictureCancel = bigPicture.querySelector(`#picture-cancel`);
const socialComment = socialComments.querySelector(`.social__comment`);
const templateComment = socialComment.cloneNode(true);

const renderComment = (comment) => {
  const commentElement = templateComment.cloneNode(true);
  commentElement.querySelector(`.social__picture`).src = comment.avatar;
  commentElement.querySelector(`.social__picture`).alt = comment.name;
  commentElement.querySelector(`.social__picture`).width = `35`;
  commentElement.querySelector(`.social__picture`).height = `35`;
  commentElement.querySelector(`.social__text`).textContent = comment.message;

  commentElement.classList.add(`hidden`);
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

  commentsLoader.classList.remove(`hidden`);
  let commentsElements = [];
  commentsElements = picture.comments;

  const renderComments = (quantity, elements) => {
    for (let i = 0; i < quantity; i++) {
      elements[i].classList.remove(`hidden`);
    }
  };
  const newComments = socialComments.querySelectorAll(`.social__comment`);
  let countVisibleComments = 5;

  const getComments = (quantity, elements, newElements) => {
    if (quantity < elements.length) {
      renderComments(quantity, newElements);
      commentsLoader.classList.remove(`hidden`);
    } else {
      renderComments(elements.length, newElements);
      commentsLoader.classList.add(`hidden`);
    }
  };

  getComments(countVisibleComments, newComments, newComments);

  const getMoreComments = () => {
    countVisibleComments = countVisibleComments + 5;
    getComments(countVisibleComments, commentsElements, newComments);
  };

  commentsLoader.addEventListener(`click`, getMoreComments);

  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);

  document.querySelector(`body`).classList.add(`modal-open`);
  bigPicture.classList.remove(`hidden`);

  const onBigPictureEscPress = (evt) => {
    if (window.util.isEscape(evt)) {
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
    bigPicture.classList.add(`hidden`);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);

    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  bigPictureCancel.addEventListener(`click`, closeBigPicture);
  document.addEventListener(`keydown`, onBigPictureEscPress);

  return bigPicture;
};

window.renderBigPicture = renderBigPicture;
