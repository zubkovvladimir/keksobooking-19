'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var preview = document.querySelector('.ad-form-header__preview img');
  var adFormField = document.querySelector('#avatar');

  // загружает аватар

  var сustomizePreview = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var onLoad = function () {
      preview.src = reader.result;
    };

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', onLoad);

      reader.readAsDataURL(file);
    }
  };

  adFormField.addEventListener('change', сustomizePreview);

  window.avatar = {
    сustomizePreview: сustomizePreview
  };
})();
