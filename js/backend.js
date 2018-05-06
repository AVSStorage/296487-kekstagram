'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';

  function processingRequest(xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  }

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    processingRequest(xhr, onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    processingRequest(xhr, onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();
