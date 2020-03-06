'use strict';

(function () {

  var AD_COUNT = 8;
  var ESCAPE_KEY = 'Escape';

  var map = document.querySelector('.map');

  // создает фрагмент пинов
  var createAdFragment = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.pin.createPin(arr[i]));
    }

    return fragment;
  };

  var ads = window.data.getRelatedAdArray(AD_COUNT);

  // закрывает открытую карточку
  var closeOpenedCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      map.removeChild(mapCard);
    }
  };

  var renderFoundAd = function (adId) {
    var targetAd;
    targetAd = window.map.massiveAds.find(function (ad) {
      return parseInt(ad.id, 10) === parseInt(adId, 10);
    });
    window.card.renderRelatedAd(targetAd);
  };

  // отображает карточку, при нажатии, на соответствующий пин
  var pinClickHandler = function (evt) {
    var isClickOnPin = evt.target.classList.contains('map__pin') && !(evt.target.classList.contains('map__pin--main'));
    var isClickInsidePin = evt.target.closest('.map__pin') && !(evt.target.closest('.map__pin--main'));
    var adId;
    closeOpenedCard();

    if (isClickOnPin) {
      adId = evt.target.dataset.id;
      renderFoundAd(adId);
    } else if (isClickInsidePin) {
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

    if (evt.key === ESCAPE_KEY) {
      map.removeChild(mapCard);
    }
  };

  document.addEventListener('click', mapCardMousedownHandler);
  document.addEventListener('keydown', mapCardKeydownHandler);

  window.map = {
    createAdFragment: createAdFragment,
    massiveAds: ads,
  };

})();
