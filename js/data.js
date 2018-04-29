'use strict';
// Создание данных
(function () {
  // Загрузка введенных данных на сервер
  var onUpload = function () {
    window.imgUploadOverlay.classList.add('hidden');
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onUpload, onError);
    evt.preventDefault();
    window.hashtagsContainer.value = '';
    window.textDescription.value = '';
  });

  // Заггрузка данных с сервера

  var onLoad = function (pictureList) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    function renderPicture(picture) {
      var pictureElement = photoTemplate.cloneNode(true);
      pictureElement.querySelector('img').src = picture.url;
      pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
      pictureElement.addEventListener('click', function () {
        window.renderBigPicture(picture);
      });

      return pictureElement;
    }

    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.OBJECTS_AMOUNT; i++) {
      fragment.appendChild(renderPicture(pictureList[i]));
    }
    picturesContainer.appendChild(fragment);
    window.pictureList = pictureList;
  };
  // Обработка ошибок

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 20px auto; text-align: center; background-color: red; width: 50%;padding: 15px;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.load(onLoad, onError);
})();
