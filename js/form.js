'use strict';

(function () {
  var ROOMS_NUMBER_MAX = 100;

  var ERROR_TEXT_ROOMS = 'Выбранное количество комнат не соответствует выбранному количеству гостей';

  var adForm = document.querySelector('.ad-form');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var capacity = adForm.querySelector('#capacity');
  var roomNumber = adForm.querySelector('#room_number');
  var price = adForm.querySelector('#price');
  var roomType = adForm.querySelector('#type');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var succesTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.body.querySelector('main');

  var OffsetTypeMap = {
    PALACE: {
      LABEL: 'Дворец',
      MIN_PRICE: 10000
    },
    FLAT: {
      LABEL: 'Квартира',
      MIN_PRICE: 1000
    },
    HOUSE: {
      LABEL: 'Дом',
      MIN_PRICE: 5000
    },
    BUNGALO: {
      LABEL: 'Бунгало',
      MIN_PRICE: 0
    }
  };

  var checkValidRooms = function () {
    var guests = capacity.value;
    var roomNumberValue = roomNumber.value;

    if (roomNumberValue < guests) {
      roomNumber.setCustomValidity(ERROR_TEXT_ROOMS);
    } else if (roomNumberValue === ROOMS_NUMBER_MAX && guests !== 0) {
      roomNumber.setCustomValidity(ERROR_TEXT_ROOMS);
    } else if (guests === 0 && roomNumberValue !== ROOMS_NUMBER_MAX) {
      roomNumber.setCustomValidity(ERROR_TEXT_ROOMS);
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  var checkValidRoomsType = function () {
    var typeValue = roomType.value;
    var attributeValue = OffsetTypeMap[typeValue.toUpperCase()].MIN_PRICE;

    price.setAttribute('min', attributeValue);
    price.setAttribute('placeholder', attributeValue);
  };

  var synchronizeTimeInHandler = function () {
    selectTimeOut.value = selectTimeIn.value;
  };

  var synchronizeTimeOutHandler = function () {
    selectTimeIn.value = selectTimeOut.value;
  };

  var resetForm = function () {
    adForm.reset();
    // изменяет, дефолтный плейсхолдер, в разметке, на корректный
    checkValidRoomsType();
  };

  var activate = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = false;
    }
    adForm.classList.remove('ad-form--disabled');
  };

  var deactivate = function () {
    // проходит по филдсетам и проставляет disabled
    window.utils.disableElements(formFieldset);

    adForm.classList.add('ad-form--disabled');

    resetForm();

    window.utils.getAddressMainPin();
  };

  var removeMessageHandler = function () {
    document.removeEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Keys.ESCAPE) {
        removeMessageHandler();
      }
    });

    if (window.form.messageErrorButton) {
      window.form.messageErrorButton.removeEventListener('click', removeMessageHandler);
    }
    window.form.message.removeEventListener('click', removeMessageHandler);
    document.querySelector('#message').remove();

    window.init.disablePage();
  };

  var errorMessage = function (errorText) {
    var template = errorTemplate.cloneNode(true);
    var messageErrorText = template.querySelector('.error__message');
    template.id = 'message';

    main.appendChild(template);

    window.form.message = main.querySelector('.error');
    window.form.messageErrorButton = window.form.message.querySelector('.error__button');
    messageErrorText.textContent = errorText;

    window.form.messageErrorButton.addEventListener('click', removeMessageHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Keys.ESCAPE) {
        removeMessageHandler();
      }
    });
    window.form.message.addEventListener('click', removeMessageHandler);
  };

  var successMessage = function () {
    var template = succesTemplate.cloneNode(true);
    template.id = 'message';

    main.appendChild(template);

    window.form.message = main.querySelector('.success');

    window.form.message.addEventListener('click', removeMessageHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Keys.ESCAPE) {
        removeMessageHandler();
      }
    });
  };

  var success = function () {
    successMessage();
    window.init.disablePage();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(adForm), success, errorMessage);
    evt.preventDefault();
  };

  adFormReset.addEventListener('click', function () {
    resetForm();
    window.init.disablePage();
  });
  adForm.addEventListener('submit', formSubmitHandler);
  selectTimeIn.addEventListener('change', synchronizeTimeInHandler);
  selectTimeOut.addEventListener('change', synchronizeTimeOutHandler);


  adForm.addEventListener('input', function () {
    checkValidRooms();
    checkValidRoomsType();
  });

  window.form = {
    checkValidRoomsType: checkValidRoomsType,
    activate: activate,
    deactivate: deactivate,
    offsetTypeMap: OffsetTypeMap,
    errorMessage: errorMessage
  };
})();
