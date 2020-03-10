'use strict';

(function () {
  var RANGE_TOP = 130;
  var RANGE_BOTTOM = 630;

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainStyle = getComputedStyle(document.querySelector('.map__pin--main'));
  var mapWidth = getComputedStyle(document.querySelector('.map__pins'));

  var rangeRight = Math.round((parseInt(mapWidth.width, 10) - (parseInt(mapPinMainStyle.width, 10) / 2)));
  var rangeLeft = Math.round(0 - (parseInt(mapPinMainStyle.width, 10) / 2));

  var mouseDragHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftX = mapPinMain.offsetLeft - shift.x;
      var shiftY = mapPinMain.offsetTop - shift.y;

      if (shiftX > rangeRight) {
        shiftX = rangeRight;
      } else if (shiftX < rangeLeft) {
        shiftX = rangeLeft;
      }

      if (shiftY < RANGE_TOP) {
        shiftY = RANGE_TOP;
      } else if (shiftY >= RANGE_BOTTOM) {
        shiftY = RANGE_BOTTOM;
      }

      mapPinMain.style.top = shiftY + 'px';
      mapPinMain.style.left = shiftX + 'px';

      window.utils.getAddressMainPin(true);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.utils.getAddressMainPin(true);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    mouseDragHandler(evt);
  });
})();
