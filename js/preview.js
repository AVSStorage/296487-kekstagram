'use strict';
// Загрузка лайков,фотографий и комментариев увеличенной фотографии
(function () {

  var body = document.body;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var minComments = 5;
  function renderComments(socialComment, comments) {
    if (socialComment.length > comments) {
      for (var i = 0; i < comments; i++) {
        if (socialComment[i].classList.contains('visually-hidden')) {
          socialComment[i].classList.remove('visually-hidden');
        }
      }
    } else {
      for (i = 0; i < socialComment.length; i++) {
        socialComment[i].classList.remove('visually-hidden');
      }
      return socialComment.length;
    }
    return comments;
  }
  function hidePreviousComments(comments) {
    for (var i = 0; i < comments.length; i++) {
      comments[i].classList.add('visually-hidden');
    }
  }
  function renderCommentsCounter(commentContainer, comments, picture, commentCounter) {
    commentContainer.textContent = '';
    commentContainer.insertAdjacentHTML('beforeend', renderComments(comments, commentCounter) + ' из ' + '<span class="comments-count">' + picture.comments.length + '</span> комментариев');
  }

  function loadMoreComments(button, comments, commentsContainer, picture) {
    var commentsCounter = 5;
    button.addEventListener('click', function () {
      commentsCounter = commentsCounter + 5;
      renderComments(comments, commentsCounter);
      renderCommentsCounter(commentsContainer, comments, picture, commentsCounter);
    });
  }

  window.renderBigPicture = function (picture) {
    bigPicture.querySelector('.big-picture__img').textContent = '';
    var currentImg = '<img src="' + picture.url + '" alt="Девушка в купальнике" width="600" height="600">';
    bigPicture.querySelector('.big-picture__img').insertAdjacentHTML('beforeend', currentImg);
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.comments[0];
    var socialComments = bigPicture.querySelector('.social__comments');
    socialComments.textContent = '';
    for (var i = 0; i < picture.comments.length; i++) {
      var comment = '<li class="social__comment social__comment--text">' +
        '<img class="social__picture" src="img/avatar-' + window.util.generateRandomNumber(1, 6) + '.svg" ' +
        'alt="Аватар комментатора фотографии" width="35" height="35">' + picture.comments[i] + '</li>';
      socialComments.insertAdjacentHTML('beforeend', comment);
    }
    var socialComment = document.querySelectorAll('.social__comment');
    hidePreviousComments(socialComment);

    var loadMoreButton = document.querySelector('.social__comment-loadmore');
    var socialCommentCounter = bigPicture.querySelector('.social__comment-count');
    loadMoreComments(loadMoreButton, socialComment, socialCommentCounter, picture);
    renderCommentsCounter(socialCommentCounter, socialComment, picture, minComments);
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
