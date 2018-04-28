'use strict';
// Загрузка лайков,фотографий и комментариев увеличенной фотографии
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

var body = document.body;
var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

window.renderBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img').textContent = '';
  var currentImg = '<img src="' + picture.url + '" alt="Девушка в купальнике" width="600" height="600">';
  bigPicture.querySelector('.big-picture__img').insertAdjacentHTML('beforeend', currentImg);
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.textContent = '';
  for (var i = 0; i < picture.comments.length; i++) {
    var comment = '<li class="social__comment social__comment--text">' +
      '<img class="social__picture" src="img/avatar-' + window.util.generateRandomNumber(1, 6) + '.svg" ' +
      'alt="Аватар комментатора фотографии" width="35" height="35">' + picture.comments[i] + '</li>';
    socialComments.insertAdjacentHTML('beforeend', comment);
  }

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
