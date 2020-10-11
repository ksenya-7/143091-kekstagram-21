"use strict";

(() => {
  const blockPictures = document.querySelector(`.pictures`);

  blockPictures.append(window.picture.renderPictures(window.gallery.pictures));

  window.preview.renderBigPicture(window.gallery.pictures[0]);
})();
