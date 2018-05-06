'use strict';
// Открытие и закрытие формы загрузки изображения
(function () {
  var fileUpload = document.querySelector('#upload-file');
  var minusButtonScale = document.querySelector('.resize__control--minus');
  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeValue = Number(resizeControlValue.value.slice(0, -1));
  function resetEffect() {
    var effectInputNone = window.effectsItems[0].querySelector('.effects__radio');
    window.deletePreviousEffect(window.imgUploadPreview);
    window.imgUploadScale.classList.add('hidden');
    effectInputNone.checked = true;
  }
  fileUpload.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    minusButtonScale.focus();
    resetEffect();
    document.addEventListener('keydown', function (evt) {
      if (!fileUpload.classList.contains('hidden')) {
        if (evt.keyCode === window.util.KEYCODES.escape) {
          if (evt.target !== window.textDescription && evt.target !== window.hashtagsContainer) {
            imgUploadOverlay.classList.add('hidden');
          }
        }
      }
    });
    window.changeSizeOfPicture(resizeValue);
  });
  // Закрытие формы загрузки изображения
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

  imgUploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
  });

  window.imgUploadOverlay = imgUploadOverlay;
  window.resizeControlValue = resizeControlValue;
  window.resizeValue = resizeValue;
})();
