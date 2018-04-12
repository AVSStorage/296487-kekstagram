'use strict';
var OBJECTS_AMOUNT = 25;
var HASHTAG_CODE = 'U+0023';

function createPhoto(i, comments, description) {
  var pictureInfo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: generateRandomNumber(15, 200),
    comments: generateRandomArray(comments),
    description: generateRandomArray(description)
  };
  return pictureInfo;
}

function generateRandomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;

}

function generateRandomArray(array) {
  var newArray = [];
  for (var i = 0; i < 2; i++) {
    newArray[i] = array[generateRandomNumber(1, 5)];
  }
  return newArray;
}

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictureList = [];

for (var i = 0; i < OBJECTS_AMOUNT; i++) {
  pictureList[i] = createPhoto(i, comments, description);
}

function loadingPictures(picturesList, photosTemplate) {
  var pictureElement = photosTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picturesList.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picturesList.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picturesList.comments.length;
  return pictureElement;
}

var picturesContainer = document.querySelector('.pictures');
var photosTemplate = document.querySelector('#picture').content;
var fragment = document.createDocumentFragment();

for (i = 0; i < OBJECTS_AMOUNT; i++) {
  fragment.appendChild(loadingPictures(pictureList[i], photosTemplate));
}
picturesContainer.appendChild(fragment);


function loadingBigPicture(picture, bigPicture) {
  bigPicture.querySelector('.big-picture__img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.textContent = '';
  for (i = 0; i < picture.comments.length; i++) {
    var comment = '<li class="social__comment social__comment--text">' +
       '<img class="social__picture" src="img/avatar-' + generateRandomNumber(1, 6) + '.svg" ' +
       'alt="Аватар комментатора фотографии" width="35" height="35">' + picture.comments[i] + '</li>';
    socialComments.insertAdjacentHTML('beforeend', comment);
  }
}

var bigPicture = document.querySelector('.big-picture');

var pictureLink = document.querySelectorAll('.picture__link');
var body = document.body;
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

for (i = 0; i < pictureLink.length; i++) {
  pictureLink[i].addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  });
}

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

var fileUpload = document.querySelector('#upload-file');

fileUpload.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
});

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

var effectsItems = document.querySelectorAll('.effects__item');
var effectType = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

function createEffect(EffectSwitch, effectTypeValue) {
  for (i = 0; i < effectTypeValue.length; i++) {
    if (EffectSwitch.value === effectTypeValue[i]) {
      var effect = 'effects__preview--' + effectTypeValue[i];
    }
  }
  return effect;
}

function deletePreviousEffect(effectTypeValue, image) {
  for (i = 0; i < effectType.length; i++) {
    if (image.classList.contains('effects__preview--' + effectType[i])) {
      image.classList.remove('effects__preview--' + effectType[i]);
    }
  }
}

for (i = 0; i < effectsItems.length; i++) {
  effectsItems[i].addEventListener('change', function (evt) {
    var currentEffect = evt.currentTarget;
    var currentEffectSwitch = currentEffect.querySelector('.effects__radio');
    var effect = createEffect(currentEffectSwitch, effectType);
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    deletePreviousEffect(effectType, imgUploadPreview);
    imgUploadPreview.classList.add(effect);
  });
}

function searchForSameValues(arr) {
  var result = [];
  for (i = 0; i < arr.length; i++) {
    var arrValue = arr[i];
    for (var j = 0; j < result.length; j++) {
      if (result[j] === arrValue) {
        return true;
      }
    }
  }
  return false;
}

var hashtagsContainer = document.querySelector('.text__hashtags');
hashtagsContainer.addEventListener('input', function () {
  var textHashtags = hashtagsContainer.value;
  var hashtags = textHashtags.split(' ' + HASHTAG_CODE);
  var sameValue = searchForSameValues(hashtags);
  if (sameValue) {
    hashtagsContainer.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  }
  if (hashtags.length > 5) {
    hashtagsContainer.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }
  for (i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== HASHTAG_CODE) {
      hashtagsContainer.setCustomValidity('Хэш-тег начинается с символа #');
    }
    if (hashtags[i] === HASHTAG_CODE) {
      hashtagsContainer.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    }
    if (hashtags[i].length > 21) {
      hashtagsContainer.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
    }
  }

});


loadingBigPicture(pictureList[0], bigPicture);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
