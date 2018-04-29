'use strict';
(function () {
  window.util = {
    OBJECTS_AMOUNT: window.pictureList.length,
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
