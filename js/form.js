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

  var offsetTypeMap = {
    palace: {
      label: 'Дворец',
      minPrice: 10000
    },
    flat: {
      label: 'Квартира',
      minPrice: 1000
    },
    house: {
      label: 'Дом',
      minPrice: 5000
    },
    bungalo: {
      label: 'Бунгало',
      minPrice: 0
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
    var attributeValue = offsetTypeMap[typeValue].minPrice;

    price.setAttribute('min', attributeValue);
    price.setAttribute('placeholder', attributeValue);
  };

  var synchronizeTimeIn = function () {
    selectTimeOut.value = selectTimeIn.value;
  };

  var synchronizeTimeOut = function () {
    selectTimeIn.value = selectTimeOut.value;
  };

  selectTimeIn.addEventListener('change', synchronizeTimeIn);
  selectTimeOut.addEventListener('change', synchronizeTimeOut);


  adForm.addEventListener('input', function () {
    checkValidRooms();
    checkValidRoomsType();
  });

  window.form = {
    checkValidRoomsType: checkValidRoomsType
  };
})();
