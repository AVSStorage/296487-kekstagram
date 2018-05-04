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
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  function renderPictures(picturesList) {
    for (var i = 0; i < picturesList.length; i++) {
      fragment.appendChild(renderPicture(picturesList[i]));
    }
    picturesContainer.appendChild(fragment);
  }

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

  function removeActiveClass(imgFiltersButtons) {
    for (var i = 0; i < imgFiltersButtons.length; i++) {
      imgFiltersButtons[i].className = 'img-filters__button';
    }
  }

  function removePictures() {
    var pictureLinks = document.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureLinks.length; i++) {
      pictureLinks[i].parentNode.removeChild(pictureLinks[i]);
    }
  }

  var onLoad = function (pictureList) {
    renderPictures(pictureList);

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    var imgFiltersButtons = imgFilters.querySelectorAll('.img-filters__button');
    var imgFiltersTypes =
      {
        'filter-popular': function () {
          return pictureList.sort(function (first, second) {
            if (first.likes < second.likes) {
              return 1;
            } else if (first.likes > second.likes) {
              return -1;
            } return 0;
          });
        },
        'filter-new': function () {
          if (window.util.unique(pictureList)) {
            return pictureList.sort(function () {
              return Math.random() - 0.5;
            });
          } return false;
        },
        'filter-discussed': function () {
          return pictureList.sort(function (firstComment, secondComment) {
            if (firstComment.comments.length < secondComment.comments.length) {
              return 1;
            } else if (firstComment.comments.length > secondComment.comments.length) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      };

    for (var i = 0; i < imgFiltersButtons.length; i++) {
      imgFiltersButtons[i].addEventListener('click', function (evt) {
        var imgFilterButton = evt.target;
        removeActiveClass(imgFiltersButtons);
        imgFilterButton.classList.add('img-filters__button--active');
        var sortingPictures = imgFiltersTypes[imgFilterButton.id]();
        removePictures();
        window.debounce(renderPictures(sortingPictures));
      });
    }
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
