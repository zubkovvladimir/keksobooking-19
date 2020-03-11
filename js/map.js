'use strict';

(function () {
  var MAX_AMOUNT = 5;

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('.map__filter');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var adArray;

  // отрисовывает фрагмент пинов
  var renderPinFragment = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_AMOUNT; i++) {
      arr[i].id = i;
      fragment.appendChild(window.pin.create(arr[i]));
    }

    adArray = arr;

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
  };

  // отображает карточку, при нажатии, на соответствующий пин
  var pinClickHandler = function (evt) {
    var isClickOnPin = evt.target.classList.contains('map__pin') && !(evt.target.classList.contains('map__pin--main'));
    var isClickInsidePin = evt.target.closest('.map__pin') && !(evt.target.closest('.map__pin--main'));
    var adId;

    if (isClickOnPin) {
      closeOpenedCard();
      adId = evt.target.dataset.id;
      renderFoundAd(adId);
    } else if (isClickInsidePin) {
      closeOpenedCard();
      adId = evt.target.closest('.map__pin').dataset.id;
      renderFoundAd(adId);
    }
  };

  document.addEventListener('click', pinClickHandler);

  // закрывает попап по клику на иконку крестика
  var mapCardMousedownHandler = function (evt) {
    // находит карточку во время вызова функции
    var mapCard = map.querySelector('.map__card');

    if (evt.target.className === 'popup__close') {
      map.removeChild(mapCard);
    }
  };

  // закрывает попап по нажатию на ескейп
  var mapCardKeydownHandler = function (evt) {
    // находит карточку во время вызова функции
    var mapCard = map.querySelector('.map__card');

    if (evt.key === window.utils.Keys.ESCAPE) {
      map.removeChild(mapCard);
    }
  };

  var activate = function () {
    for (var j = 0; j < mapFiltersSelect.length; j++) {
      mapFiltersSelect[j].disabled = false;
    }

    mapFiltersFieldset.disabled = false;

    map.classList.remove('map--faded');

    window.backend.load(renderPinFragment, window.form.errorHandler);
  };

  var deactivate = function () {
    // проходит по селектам и проставляет disabled
    window.utils.disableElements(mapFiltersSelect);

    mapFiltersFieldset.disabled = true;

    map.classList.add('map--faded');

    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });

    closeOpenedCard();

    document.removeEventListener('click', mapCardMousedownHandler);
    document.removeEventListener('keydown', mapCardKeydownHandler);
  };


  document.addEventListener('click', mapCardMousedownHandler);
  document.addEventListener('keydown', mapCardKeydownHandler);

  window.map = {
    activate: activate,
    deactivate: deactivate
  };

})();
