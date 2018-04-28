'use strict';
(function () {
  window.util = {
    OBJECTS_AMOUNT: 25,
    KEYCODES: {
      escape: 27,
      enter: 13
    },
    generateRandomNumber: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    }
  };
})();
