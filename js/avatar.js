'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';

  var avatar = document.querySelector('.ad-form-header__preview img');
  var photo = document.querySelector('.ad-form__photo');
  photo.style.width = '300px';
  var adFormField = document.querySelector('#avatar');
  var adFormUpload = document.querySelector('#images');

  // загружает аватар

  var сustomizePreview = function (evt, element) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var onLoad = function () {
      element.src = reader.result;
    };

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', onLoad);

      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function (evt) {
    сustomizePreview(evt, avatar);
  }

  var onPhotoChange = function (evt) {
    var imageElement = document.createElement('img');
    imageElement.style.width = '70px';
    imageElement.style.height = '70px';
    imageElement.style.marginRight = '5px';
    imageElement.style.marginBottom = '5px';
    photo.appendChild(imageElement);
    // var adFormUploadImg = photo.querySelector('img');
    сustomizePreview(evt, imageElement);
  }

  var uploadRemove = function () {
    avatar.src = AVATAR_DEFAULT;
    photo.querySelectorAll('img').forEach(function (photoItem) {
      photoItem.remove();
    });
  }

  adFormField.addEventListener('change', onAvatarChange);
  adFormUpload.addEventListener('change', onPhotoChange);

  window.avatar = {
    сustomizePreview: сustomizePreview,
    uploadRemove: uploadRemove
  };
})();
