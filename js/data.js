'use strict';
// Создание данных
(function () {
  // Загрузка введенных данных на сервер
  var onUpload = function () {
    window.imgUploadOverlay.classList.add('hidden');
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onUpload, onUploadError);
    evt.preventDefault();
    // if () {
    //
    // }
    window.hashtagsContainer.value = '';
    window.textDescription.value = '';
  });

  // Заггрузка данных с сервера
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  function sortingImages(pictureList, filterButton) {
    pictureList = pictureList.slice();
    switch (filterButton.id) {
      case 'filter-popular':
        return pictureList.sort(function (first, second) {
          if (first.likes < second.likes) {
            return 1;
          } else if (first.likes > second.likes) {
            return -1;
          }
          return 0;
        });
      case 'filter-discussed':
        return pictureList.sort(function (firstComment, secondComment) {
          if (firstComment.comments.length < secondComment.comments.length) {
            return 1;
          } else if (firstComment.comments.length > secondComment.comments.length) {
            return -1;
          } else {
            return 0;
          }
        });
      case 'filter-random' :
        if (window.util.unique(pictureList)) {
          return pictureList.sort(function () {
            return Math.random() - 0.5;
          });
        } return false;

      default:
        return pictureList;
    }
  }

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

    for (var i = 0; i < imgFiltersButtons.length; i++) {
      imgFiltersButtons[i].addEventListener('click', function (evt) {
        var imgFilterButton = evt.target;
        removeActiveClass(imgFiltersButtons);
        imgFilterButton.classList.add('img-filters__button--active');
        var sortedPictures = sortingImages(pictureList, imgFilterButton);
        removePictures();
        window.debounce(renderPictures(sortedPictures));
      });
    }
    // Обработка ошибок
  };
  var onUploadError = function () {
    window.imgUploadOverlay.classList.add('hidden');
    document.querySelector('.img-upload__message--error').classList.remove('hidden');
  };
  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 20px auto; text-align: center; background-color: red; width: 50%;padding: 15px;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    return true;
  };
  window.load(onLoad, onLoadError);
})();
