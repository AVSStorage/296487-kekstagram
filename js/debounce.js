'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300;

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
