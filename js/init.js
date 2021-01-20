'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStartPosition = 'left: ' + mainPin.style.left + '; top: ' + mainPin.style.top + ';';

  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftEvent = window.util.isMouseLeftEvent;

  var activatePage = function () {
    window.form.activate();
    window.map.activate();
  };

  var disablePage = function () {
    mainPin.style = mainPinStartPosition;
    window.form.deactivate();
    window.map.deactivate();  

    mainPin.addEventListener('mousedown', isMainPinClickHandler);
    mainPin.addEventListener('keydown', isMainPinKeydownHandler);
  };

  var isMainPinClickHandler = function (evt) {
    isMouseLeftEvent(evt, activatePage);
    mainPin.removeEventListener('mousedown', isMainPinClickHandler);
  };

  var isMainPinKeydownHandler = function (evt) {
    isEnterEvent(evt, activatePage);  
    mainPin.removeEventListener('keydown', isMainPinKeydownHandler);
  };

  disablePage();

  window.init = {
    disablePage: disablePage
  };
})();
