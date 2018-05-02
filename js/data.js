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
  function renderPictures(picturesList, picturesContainer, fragment, photoTemplate) {
    for (var i = 0; i < picturesList.length; i++) {
      fragment.appendChild(renderPicture(picturesList[i], photoTemplate));
    }
    picturesContainer.appendChild(fragment);
  }

  function renderPicture(picture, photoTemplate) {
    var pictureElement = photoTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', function () {
      window.renderBigPicture(picture);
    });

    return pictureElement;
  }

  var onLoad = function (pictureList) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    renderPictures(pictureList, picturesContainer, fragment, photoTemplate);

    // Обработка ошибок
  };
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
