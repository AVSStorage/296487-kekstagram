'use strict';
var OBJECTS_AMOUNT = 25;
var ESC_KEYCOODE = 27;

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

// Загрузка лайков,фотографий и комментариев
function loadingBigPicture(picture, bigPicture) {
  bigPicture.querySelector('.big-picture__img').textContent = '';
  var currentImg = '<img src="' + picture.url + '" alt="Девушка в купальнике" width="600" height="600">';
  bigPicture.querySelector('.big-picture__img').insertAdjacentHTML('beforeend', currentImg);
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


document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

var body = document.body;
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
// Открытие формы редактирования изображения
var openPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (bigPicture.classList.contains('hidden') === false) {
      if (evt.keyCode === ESC_KEYCOODE) {
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
      }
    }
  });
  body.classList.add('modal-open');
};

// Открытие изображения по нажатию на миниатюру
var pictureLink = document.querySelectorAll('.picture__link');

for (i = 0; i < pictureLink.length; i++) {
  pictureLink[i].addEventListener('click', function (evt) {
    var img = evt.target;
    for (i = 0; i < pictureList.length; i++) {
      if (pictureList[i].url === img.getAttribute('src')) {
        loadingBigPicture(pictureList[i], bigPicture);
        break;
      }
    }
    openPicture();
  });
}

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

// Открытие формы загрузки изображения
var fileUpload = document.querySelector('#upload-file');
var minusButtonScale = document.querySelector('.resize__control--minus');

fileUpload.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  minusButtonScale.focus();
  document.addEventListener('keydown', function (evt) {
    if (fileUpload.classList.contains('hidden') === false) {
      if (evt.keyCode === ESC_KEYCOODE) {
        if (evt.target !== textDescription && evt.target !== hashtagsContainer) {
          imgUploadOverlay.classList.add('hidden');
        }
      }
    }
  });
  // Редактирование css-свойства изображения перед загрузкой
  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeValue = Number(resizeControlValue.value.slice(0, -1));
  changeSizeOfPicture(resizeValue);
});
// Закрытие формы загрузки изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

// Эффекты

var effectsItems = document.querySelectorAll('.effects__item');
var effectType = [
  {value: 'none',
    effect: '',
    min: '',
    max: '',
    typeValue: ''
  },
  {value: 'chrome',
    effect: 'grayscale',
    min: 0,
    max: 1,

    typeValue: ''
  },
  {value: 'sepia',
    effect: 'sepia',
    min: 0,
    max: 1,

    typeValue: ''
  },
  {value: 'marvin',
    effect: 'invert',
    min: 0,
    max: 100,
    typeValue: '%'
  },
  {value: 'phobos',
    effect: 'blur',
    min: 0,
    max: 3,
    typeValue: 'px'
  },
  {value: 'heat',
    effect: 'brightness',
    min: 1,
    max: 3,
    typeValue: ''
  }];
var imgUploadScale = document.querySelector('.img-upload__scale');
imgUploadScale.classList.add('hidden');
function createEffect(effectSwitch, effectTypeValue) {
  for (i = 0; i < effectTypeValue.length; i++) {
    var effectItem = effectTypeValue[i];
    if (effectSwitch.value === effectItem.value) {
      if (effectItem.value !== 'none') {
        var effect = 'effects__preview--' + effectItem.value;
        imgUploadScale.classList.remove('hidden');
      } else {
        imgUploadScale.classList.add('hidden');
      }
    }
  }
  return effect;
}

function deletePreviousEffect(effectTypeValue, image) {
  for (i = 0; i < effectType.length; i++) {
    var effectItem = effectType[i];
    if (image.classList.contains('effects__preview--' + effectItem.value)) {
      image.classList.remove('effects__preview--' + effectItem.value);
      image.style.filter = '';
    }
  }
}
var imgUploadPreview = document.querySelector('.img-upload__preview');

for (i = 0; i < effectsItems.length; i++) {
  effectsItems[i].addEventListener('change', function (effectEvt) {
    var currentEffect = effectEvt.currentTarget;
    var currentEffectSwitch = currentEffect.querySelector('.effects__radio');
    var effect = createEffect(currentEffectSwitch, effectType);
    deletePreviousEffect(effectType, imgUploadPreview);
    imgUploadPreview.classList.add(effect);
    scalePin.style.left = 100 + '%';
    scaleLevel.style.width = 100 + '%';
  });
}

// Хэш-теги валидация
function unique(arr) {
  var obj = {};
  for (i = 0; i < arr.length; i++) {
    if (obj[arr[i]]) {
      obj[arr[i]]++;
    } else {
      obj[arr[i]] = 1;
    }
  }
  for (var key in obj) {
    if (obj[key] > 1) {
      return true;
    }
  }
  return false;
}
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
  for (i = 0; i < hashtags.length; i++) {
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

  var sameValue = unique(hashtags);
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
  if (newComment.length > 141) {
    textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    return false;
  } return true;
};
textDescription.addEventListener('change', validateCommentError);
hashtagsContainer.addEventListener('change', validateInputError);
// Масштаб
function changeSizeOfPicture(scaleValue) {
  var scaleImage = imgUploadPreview.querySelector('img');
  scaleImage.style.transform = 'scale(' + scaleValue / 100 + ')';
}

var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');

resizeControlPlus.addEventListener('click', function () {
  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeValue = Number(resizeControlValue.value.slice(0, -1));
  var resizeMaxValue = Number(resizeControlValue.max.slice(0, -1));
  if (resizeValue < resizeMaxValue) {
    resizeValue = resizeValue + 25;
    if (resizeValue > resizeMaxValue) {
      resizeValue = resizeMaxValue;
    }
    resizeControlValue.value = resizeValue + '%';
    changeSizeOfPicture(resizeValue);
  }

});

resizeControlMinus.addEventListener('click', function () {
  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeValue = Number(resizeControlValue.value.slice(0, -1));
  var resizeMinValue = Number(resizeControlValue.min.slice(0, -1));
  if (resizeValue > resizeMinValue) {
    resizeValue = resizeValue - resizeMinValue;
  }
  resizeControlValue.value = resizeValue + '%';
  changeSizeOfPicture(resizeValue);
});

// Drag & Drop

var scalePin = document.querySelector('.scale__pin');
var scaleLevel = document.querySelector('.scale__level');
var scaleLine = document.querySelector('.scale__line');
var scaleValue = document.querySelector('.scale__value');
scalePin.style.left = 100 + '%';
scalePin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.pageX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.pageX
    };
    startCoords = {
      x: moveEvt.pageX
    };
    var pinCoords = Math.floor((scalePin.offsetLeft - shift.x) * 100 / scaleLine.clientWidth);
    if (pinCoords > 100) {
      pinCoords = 100;
    } else if (pinCoords < 0) {
      pinCoords = 0;
    }
    var styleValue = pinCoords + '%';
    scalePin.style.left = styleValue;
    scaleLevel.style.width = styleValue;
    scaleValue.value = pinCoords;
    for (i = 0; i < effectType.length; i++) {
      var currentEffect = effectType[i];
      if (imgUploadPreview.classList.contains('effects__preview--' + currentEffect.value)) {
        var effectStep = (currentEffect.max - currentEffect.min) / 100;
        var effectValue = currentEffect.min + Number(scaleValue.value) * effectStep;
        imgUploadPreview.style.filter = currentEffect.effect + '(' + effectValue + currentEffect.typeValue + ')';
      }
    }

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
