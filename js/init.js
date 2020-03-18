'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainPosition = 'left: ' + mapPinMain.style.left + '; top: ' + mapPinMain.style.top + ';';

  var activatePage = function () {
    window.form.activate();
    window.map.activate();
  };

  var disablePage = function () {
    mapPinMain.style = mapPinMainPosition;
    window.form.deactivate();
    window.map.deactivate();

    mapPinMain.addEventListener('mousedown', isMainPinHandler);
    mapPinMain.addEventListener('keydown', isMainPinHandler);
  };

  disablePage();

  var isMainPinHandler = function (evt) {
    if (evt.button === 0 || evt.key === window.utils.Keys.ENTER) {
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
