"use strict";

(() => {
  const blockPictures = document.querySelector(`.pictures`);

  (window.backend.load((pictures) =>{
    const fragment = document.createDocumentFragment();

    pictures.map(window.picture.renderPicture).forEach((element) => fragment.append(element));

    blockPictures.append(fragment);
  }, () => {}));

  (window.backend.load((pictures) =>{
    window.preview.renderBigPicture(pictures[0]);
  }, () => {}));
})();
