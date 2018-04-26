'use strict';
// Создание данных
(function () {
  function createDataPhoto(i, comments, description) {
    var pictureInfo = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: window.util.generateRandomNumber(15, 200),
      comments: generateRandomArray(comments),
      description: generateRandomArray(description)
    };
    return pictureInfo;
  }

  function generateRandomArray(array) {
    var newArray = [];
    for (var i = 0; i < 2; i++) {
      newArray[i] = array[window.util.generateRandomNumber(1, 5)];
    }
    return newArray;
  }

  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var pictureList = [];

  for (var i = 0; i < window.util.OBJECTS_AMOUNT; i++) {
    pictureList[i] = createDataPhoto(i, comments, description);
  }

  window.data = pictureList;
})();
