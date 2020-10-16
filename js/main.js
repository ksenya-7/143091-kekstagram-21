"use strict";

(() => {
  // const successHandler = (pictures) => {
  //   picturesArray = pictures;
  //   updatePictures(pictures);
  //   // console.log(picturesArray);
  // };

  (window.backend.load(window.filter.successHandler, () => {}));

  // (window.backend.load((pictures) => {
  //   window.preview.renderBigPicture(pictures[0]);
  // }, () => {}));
})();
