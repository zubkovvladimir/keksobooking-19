'use strict';

(function () {
  var MAX_AMOUNT = 5;
  var FILTER_DEFAULT_VALUE = 'any';

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('.map__filter');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var mapCheckbox = mapFilters.querySelectorAll('.map__checkbox');
  var adArray;
  var defaultAdverts = [];
  var pinClicked;

  // отрисовывает фрагмент пинов
  var renderPinFragment = function (arr) {
    var fragment = document.createDocumentFragment();

    adArray = arr.slice(0, MAX_AMOUNT);

    for (var i = 0; i < adArray.length; i++) {
      if (arr[i].offer) {
        arr[i].id = i;
        fragment.appendChild(window.pin.create(arr[i]));
      }
    }

    mapPins.appendChild(fragment);
  };

  // закрывает открытую карточку
  var closeOpenedCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      map.removeChild(mapCard);
    }
  };

  var renderFoundAd = function (adId) {
    var targetAd;
    targetAd = adArray.find(function (ad) {
      return parseInt(ad.id, 10) === parseInt(adId, 10);
    });
    window.card.renderRelatedAd(targetAd, map, mapFiltersContainer);

    document.addEventListener('click', mapCardMousedownHandler);
    document.addEventListener('keydown', mapCardKeydownHandler);
  };

  var removePinActiveStyle = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (elem) {
      elem.classList.remove('map__pin--active');
    });
  };

  // отображает карточку, при нажатии, на соответствующий пин
  var pinClickHandler = function (evt) {
    pinClicked = evt.target.closest('.map__pin:not(.map__pin--main)');
    var adId;

    if (pinClicked) {
      closeOpenedCard();
      adId = pinClicked.dataset.id;
      removePinActiveStyle();
      pinClicked.classList.add('map__pin--active');
      renderFoundAd(adId);
    }
  };

  document.addEventListener('click', pinClickHandler);

  // закрывает попап по клику на иконку крестика
  var mapCardMousedownHandler = function (evt) {
    if (evt.target.className === 'popup__close') {
      // находит карточку во время вызова функции
      var mapCard = map.querySelector('.map__card');
      map.removeChild(mapCard);
      removePinActiveStyle();

      document.removeEventListener('click', mapCardMousedownHandler);
      document.removeEventListener('keydown', mapCardKeydownHandler);
    }
  };

  // закрывает попап по нажатию на ескейп
  var mapCardKeydownHandler = function (evt) {
    if (evt.key === window.utils.Keys.ESCAPE) {
      // находит карточку во время вызова функции
      var mapCard = map.querySelector('.map__card');
      map.removeChild(mapCard);
      removePinActiveStyle();

      document.removeEventListener('click', mapCardMousedownHandler);
      document.removeEventListener('keydown', mapCardKeydownHandler);
    }
  };

  var successLoad = function (xhr) {
    defaultAdverts = xhr;
    renderPinFragment(xhr);

    for (var j = 0; j < mapFiltersSelect.length; j++) {
      mapFiltersSelect[j].disabled = false;
    }

    mapFiltersFieldset.disabled = false;

    return defaultAdverts;
  };

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var filterPins = function () {
    removePins();

    closeOpenedCard();

    var arrFiltered = window.filters.get(defaultAdverts);
    renderPinFragment(arrFiltered);
  };

  var activate = function () {
    map.classList.remove('map--faded');

    window.backend.load(successLoad, window.form.errorMessage);

    mapFilters.addEventListener('change', window.debounce(function () {
      removePins();
      filterPins();
    })
    );
  };

  var deactivate = function () {
    // проходит по селектам и проставляет disabled
    window.utils.disableElements(mapFiltersSelect);

    mapFiltersFieldset.disabled = true;

    map.classList.add('map--faded');

    removePins();

    mapFiltersSelect.forEach(function (filter) {
      filter.value = FILTER_DEFAULT_VALUE;
    });

    mapCheckbox.forEach(function (filter) {
      filter.checked = false;
    });

    closeOpenedCard();

    mapFilters.removeEventListener('change', filterPins);
  };

  window.map = {
    activate: activate,
    deactivate: deactivate
  };

})();
