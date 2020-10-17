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
      // evt.preventDefault();
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

// Задача
// Добавьте возможность просмотра любой фотографии в полноразмерном режиме;

// Добавьте поддержку просмотра любой фотографии в полноразмерном режиме
// с клавиатуры. Выбранная фотография открывается в полноразмерном режиме
// при нажатии на клавишу Enter.

// Напишите код для закрытия окна полноразмерного просмотра по нажатию
// клавиши Esc и клике по иконке закрытия;

// Использовать ли делегирование

// При решении этой задачи помните о том, что при клике на фотографию,
// нужно будет передавать в метод отрисовки окна полноразмерного просмотра объект
// с данными, описывающими фото. Если использовать для этой задачи делегирование,
// то нахождение этого объекта будет нетривиальным, потому что у вас будет
// использоваться один обработчик, у которого есть информация только о том,
// на каком DOM-элементе произошёл клик. Таким образом, если вы используете
// делегирование для решения этой задачи, вам нужно будет каким-то образом
// связать DOM-объекты с JS-объектами, которые их описывают.

// Продолжаем валидировать
// Большая часть работы в этом задании будет выполнена в разметке.
// Вам необходимо проверить разметку вашего проекта и добавить соответствующие
// атрибуты. Всем обязательным полям нужно добавить значение required.
// Проверить, правильные ли типы стоят у нужных полей и проставить этим полям
// дополнительные атрибуты, ограничивающие длину значения, верхнюю и нижнюю
// границу и т. д.

// Задача
// Напишите код для валидации формы загрузки нового изображения. Список полей
// для валидации:

// Поле «Комментарий».
