'use strict';
(function () {
  window.util = {
    KEYCODES: {
      escape: 27,
      enter: 13
    },
    generateRandomNumber: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    unique: function (arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
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
  };
})();
