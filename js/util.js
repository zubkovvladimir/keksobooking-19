'use strict';

(function () {
  var MOUSE_KEY_LEFT = 0;
  var MAIN_PIN = {
    width: 65,
    height: 65,
    tail: 15
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var Keys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var getRandomNumber = function (min, max, arbitrary) {
    if (!arbitrary) {
      arbitrary = 0;
    }
    return Math.floor(Math.random() * (max - min + arbitrary) + min);
  };

  var getRandomLengthArray = function (arr, length) {
    var arrayRandomLength = [];
    for (var i = 0; i < length; i++) {
      arrayRandomLength[i] = arr[i];
    }
    return arrayRandomLength;
  };

  var disableElements = function (arrayElements) {
    for (var j = 0; j < arrayElements.length; j++) {
      arrayElements[j].disabled = true;
    }
  };

  var getAddressMainPin = function (isTail) {
    var fullHeight = isTail ? parseInt(MAIN_PIN.height, 10) + parseInt(MAIN_PIN.tail, 10)
      : Math.round(parseInt(MAIN_PIN.height, 10) / 2);

    address.value = parseInt(mapPinMain.style.left, 10) + Math.floor(parseInt(MAIN_PIN.width, 10) / 2) + ', '
       + (parseInt(mapPinMain.style.top, 10) + parseInt(fullHeight, 10));
  };

  // проверяет нажатие клавиши энтер

  var isEnterEvent = function (evt, action) {
    if (evt.key === Keys.ENTER) {
      action();
    }
  };

  // проверяет нажатие левой мышки

  var isMouseLeftEvent = function (evt, action) {
    if (evt.button === MOUSE_KEY_LEFT) {
      action();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomLengthArray: getRandomLengthArray,
    disableElements: disableElements,
    getAddressMainPin: getAddressMainPin,
    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent,
    Keys: Keys,
    MAIN_PIN: MAIN_PIN
  };
})();
