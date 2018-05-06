'use strict';
// Загрузка лайков,фотографий и комментариев увеличенной фотографии
(function () {

  var body = document.body;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var loadCommentsButton = document.querySelector('.social__comment-loadmore');
  var commentsCounterContainer = document.querySelector('.social__comment-count');
  var minCommentsAmount = 5;
  function renderComments(comments, commentsCounter) {
    comments = Array.from(comments);
    var newComments = comments.slice(0, commentsCounter);
    for (var i = 0; i < newComments.length; i++) {
      comments[i].classList.remove('visually-hidden');
    }
    if (comments.length > commentsCounter) {
      loadCommentsButton.classList.remove('visually-hidden');
    } else {
      loadCommentsButton.classList.add('visually-hidden');
      return newComments.length;
    }
    return commentsCounter;
  }
  function hidePreviousComments(comments) {
    for (var i = 0; i < comments.length; i++) {
      comments[i].classList.add('visually-hidden');
    }
  }
  function renderCommentsCounter(comments, picture, commentsCounter) {
    commentsCounterContainer.textContent = '';
    var commentsCounterText = renderComments(comments, commentsCounter, loadCommentsButton) + ' из ' + '<span class="comments-count">' + picture.comments.length + '</span> комментариев';
    commentsCounterContainer.insertAdjacentHTML('beforeend', commentsCounterText);
  }

  function loadMoreComments(comments, picture) {
    var commentsCounter = 5;
    loadCommentsButton.addEventListener('click', function () {
      commentsCounter = commentsCounter + 5;
      renderComments(comments, commentsCounter);
      renderCommentsCounter(comments, picture, commentsCounter);
    });
  }

  window.renderBigPicture = function (picture) {
    bigPicture.querySelector('.big-picture__img').textContent = '';
    var currentImg = '<img src="' + picture.url + '" alt="Девушка в купальнике" width="600" height="600">';
    bigPicture.querySelector('.big-picture__img').insertAdjacentHTML('beforeend', currentImg);
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.comments[0];
    var commentsList = bigPicture.querySelector('.social__comments');
    commentsList.textContent = '';
    for (var i = 0; i < picture.comments.length; i++) {
      var comment = '<li class="social__comment social__comment--text">' +
        '<img class="social__picture" src="img/avatar-' + window.util.generateRandomNumber(1, 6) + '.svg" ' +
        'alt="Аватар комментатора фотографии" width="35" height="35">' + picture.comments[i] + '</li>';
      commentsList.insertAdjacentHTML('beforeend', comment);
    }
    var comments = document.querySelectorAll('.social__comment');
    hidePreviousComments(comments);

    loadMoreComments(comments, picture);
    renderCommentsCounter(comments, picture, minCommentsAmount);
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  };


  document.addEventListener('keydown', function (evt) {
    if (!bigPicture.classList.contains('hidden')) {
      if (evt.keyCode === window.util.KEYCODES.escape) {
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
      }
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  window.bigPicture = bigPicture;
})();
