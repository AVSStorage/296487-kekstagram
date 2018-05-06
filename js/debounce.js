'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300;

  var lastTimeout;
  window.debounce = function (fun, param) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      fun(param);
    }, DEBOUNCE_INTERVAL);
  };
})();
