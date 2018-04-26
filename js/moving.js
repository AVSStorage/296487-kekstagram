'use strict';
// Drag & Drop
(function () {
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
      var maxCoords = scaleLine.clientWidth;
      var pinCoords = scalePin.offsetLeft - shift.x;
      if (pinCoords > maxCoords) {
        pinCoords = maxCoords;
      }
      if (pinCoords < 0) {
        pinCoords = 0;
      }
      var styleValue = pinCoords + 'px';
      scalePin.style.left = styleValue;
      scaleLevel.style.width = styleValue;
      scaleValue.value = pinCoords * 100 / maxCoords;
      for (var i = 0; i < window.effectTypes.length; i++) {
        var currentEffect = window.effectTypes[i];
        if (window.imgUploadPreview.classList.contains('effects__preview--' + currentEffect.value)) {
          var effectStep = (currentEffect.max - currentEffect.min) / 100;
          var effectValue = currentEffect.min + Number(scaleValue.value) * effectStep;
          window.imgUploadPreview.style.filter = currentEffect.effect + '(' + effectValue + currentEffect.typeValue + ')';
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

  window.scaleLevel = scaleLevel;
  window.scalePin = scalePin;
})();
