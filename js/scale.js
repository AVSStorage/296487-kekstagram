'use strict';
// Масштаб
(function () {
  window.changeSizeOfPicture = function (scaleValue) {
    var scaleImage = window.imgUploadPreview.querySelector('img');
    scaleImage.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');

  resizeControlPlus.addEventListener('click', function () {
    var resizeMaxValue = Number(window.resizeControlValue.max.slice(0, -1));
    if (window.resizeValue < resizeMaxValue) {
      window.resizeValue = window.resizeValue + 25;
      if (window.resizeValue > resizeMaxValue) {
        window.resizeValue = resizeMaxValue;
      }
      window.resizeControlValue.value = window.resizeValue + '%';
      window.changeSizeOfPicture(window.resizeValue);
    }

  });

  resizeControlMinus.addEventListener('click', function () {
    var resizeMinValue = Number(window.resizeControlValue.min.slice(0, -1));
    if (window.resizeValue > resizeMinValue) {
      window.resizeValue = window.resizeValue - resizeMinValue;
    }
    window.resizeControlValue.value = window.resizeValue + '%';
    window.changeSizeOfPicture(window.resizeValue);
  });
})();

