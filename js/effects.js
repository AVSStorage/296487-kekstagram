'use strict';
(function () {
  var effectsItems = document.querySelectorAll('.effects__item');
  var effectTypes = [
    {
      value: 'none',
      effect: '',
      min: '',
      max: '',
      typeValue: ''
    },
    {
      value: 'chrome',
      effect: 'grayscale',
      min: 0,
      max: 1,

      typeValue: ''
    },
    {
      value: 'sepia',
      effect: 'sepia',
      min: 0,
      max: 1,

      typeValue: ''
    },
    {
      value: 'marvin',
      effect: 'invert',
      min: 0,
      max: 100,
      typeValue: '%'
    },
    {
      value: 'phobos',
      effect: 'blur',
      min: 0,
      max: 3,
      typeValue: 'px'
    },
    {
      value: 'heat',
      effect: 'brightness',
      min: 1,
      max: 3,
      typeValue: ''
    }];

  var imgUploadScale = document.querySelector('.img-upload__scale');

  function renderEffect(effectSwitch, effectTypesValue) {
    for (i = 0; i < effectTypesValue.length; i++) {
      var effectItem = effectTypesValue[i];
      if ((effectSwitch.value === effectItem.value) && (effectItem.value !== 'none')) {
        var effect = 'effects__preview--' + effectItem.value;
        imgUploadScale.classList.remove('hidden');
        break;
      } else {
        imgUploadScale.classList.add('hidden');
      }
    }
    return effect;
  }

  var imgUploadPreview = document.querySelector('.img-upload__preview');

  window.deletePreviousEffect = function (image) {
    image.className = 'img-upload__preview';
    image.style.filter = '';
  };

  function createEffect(effectEvt) {
    var currentEffect = effectEvt.currentTarget;
    var currentEffectSwitch = currentEffect.querySelector('.effects__radio');
    var effect = renderEffect(currentEffectSwitch, effectTypes);
    window.deletePreviousEffect(imgUploadPreview);
    imgUploadPreview.classList.add(effect);
    var maxPinValue = 100 + '%';
    window.scalePin.style.left = maxPinValue;
    window.scaleLevel.style.width = maxPinValue;
    return currentEffectSwitch;
  }

  for (var i = 0; i < effectsItems.length; i++) {
    effectsItems[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODES.enter) {
        var effectInput = createEffect(evt);
        effectInput.checked = true;
      }
    });
    effectsItems[i].addEventListener('change', function (evt) {
      createEffect(evt);
    });
  }
  window.effectsItems = effectsItems;
  window.imgUploadPreview = imgUploadPreview;
  window.effectTypes = effectTypes;
  window.imgUploadScale = imgUploadScale;
})();
