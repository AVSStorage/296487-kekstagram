'use strict';
// Хэш-теги валидация
(function () {
  // Отрисовка рамки в случае ошибки
  var validateCommentError = function () {
    if (!validateComment()) {
      textDescription.style.boxShadow = '0px 0px 10px 3px rgba(255,0,0,1)';
    } else {
      textDescription.style.boxShadow = 'none';
    }
  };

  var validateInputError = function () {
    if (!validateInput()) {
      hashtagsContainer.style.boxShadow = '0px 0px 10px 3px rgba(255,0,0,1)';
    } else {
      hashtagsContainer.style.boxShadow = 'none';
    }
  };

  var hashtagsContainer = document.querySelector('.text__hashtags');

  // Валидация комментариев
  var textDescription = document.querySelector('.text__description');
  var validateInput = function () {
    var textHashtags = hashtagsContainer.value.trim().toLowerCase();
    var hashtags = textHashtags.split(' ');
    hashtagsContainer.setCustomValidity('');
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        hashtagsContainer.setCustomValidity('Хэш-тег начинается с символа #');
        return false;
      } else if (hashtags[i] === '#') {
        hashtagsContainer.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return false;
      } else if (hashtags[i].length > 21) {
        hashtagsContainer.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
        return false;
      }
    }

    var sameValue = window.uril.unique(hashtags);
    if (sameValue) {
      hashtagsContainer.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      return false;
    } else if (hashtags.length > 5) {
      hashtagsContainer.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      return false;
    }
    return true;
  };
  var validateComment = function () {
    var newComment = textDescription.value.trim();
    textDescription.setCustomValidity('');
    if (newComment.length > 140) {
      textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      return false;
    }
    return true;
  };

  textDescription.addEventListener('change', validateCommentError);
  hashtagsContainer.addEventListener('change', validateInputError);

  window.textDescription = textDescription;
  window.hashtagsContainer = hashtagsContainer;
})();
