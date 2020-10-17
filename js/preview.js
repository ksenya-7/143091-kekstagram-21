"use strict";

(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const socialComment = socialComments.querySelector(`.social__comment`);
  const templateComment = socialComment.cloneNode(true);

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

    document.querySelector(`body`).classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);

    return bigPicture;
  };


  const bigPictureCancel = bigPicture.querySelector(`#picture-cancel`);

  const onBigPictureEscPress = (evt) => {
    if (window.util.isEscape(evt)) {
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

  window.preview = {
    renderBigPicture
  };
})();
