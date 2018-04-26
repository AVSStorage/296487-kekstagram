'use strict';
// Отрисовка миниатюр
(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  function renderPicture(picturesList) {
    var pictureElement = photoTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picturesList.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picturesList.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picturesList.comments.length;

    pictureElement.addEventListener('click', function () {
      window.renderBigPicture(picturesList);
    });

    return pictureElement;
  }

  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.util.OBJECTS_AMOUNT; i++) {
    fragment.appendChild(renderPicture(window.data[i]));
  }
  picturesContainer.appendChild(fragment);
})();
