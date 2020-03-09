'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var activatePage = function () {
    window.form.activate();
    window.map.activate();
  };

  var disablePage = function () {
    window.form.deactivate();
    window.map.deactivate();
  };

  disablePage();

  var isMainPinHandler = function (evt) {
    if (evt.button === 0 || evt.key === window.utils.enterKey) {
      activatePage();
    }

    mapPinMain.removeEventListener('mousedown', isMainPinHandler);
    mapPinMain.removeEventListener('keydown', isMainPinHandler);
  };

  mapPinMain.addEventListener('mousedown', isMainPinHandler);

  mapPinMain.addEventListener('keydown', isMainPinHandler);

  window.init = {
    activatePage: activatePage,
    disablePage: disablePage,
  };
})();
