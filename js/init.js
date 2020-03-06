'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('.map__filter');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');

  var pin = mapPins.querySelector('.map__pin');
  var pinAfter = getComputedStyle(mapPins.querySelector('.map__pin--main'), ':after');
  var pinImg = pin.querySelector('img');

  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');


  var activatePage = function () {
    var locationX = parseInt(pin.style.left, 10) + ((pinImg.width) / 2);
    var locationY = parseInt(pin.style.top, 10) + ((pinImg.height) / 2) + parseInt(pinAfter.top, 10);

    address.value = locationX + ', ' + locationY;

    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = false;
    }

    for (var j = 0; j < mapFiltersSelect.length; j++) {
      mapFiltersSelect[j].disabled = false;
    }

    mapFiltersFieldset.disabled = false;

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    mapPins.appendChild(window.map.createAdFragment(window.map.massiveAds));
  };

  var disablePage = function () {
    var locationX = parseInt(pin.style.left, 10) + ((pinImg.width) / 2);
    var locationY = parseInt(pin.style.top, 10) + ((pinImg.height) / 2);

    // проходит по филдсетам и проставляет disabled
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = true;
    }

    // проходит по селектам и проставляет disabled
    for (var j = 0; j < mapFiltersSelect.length; j++) {
      mapFiltersSelect[j].disabled = true;
    }

    mapFiltersFieldset.disabled = true;
    address.value = locationX + ', ' + locationY;

    // изменяет, дефолтный плейсхолдер, в разметке, на корректный
    window.form.checkValidRoomsType();
  };

  disablePage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      activatePage();
    }
  });

  window.init = {
    activatePage: activatePage,
    disablePage: disablePage,
  };
})();
