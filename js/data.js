'use strict';

(function () {
  var MIN_NUMBER = 0;

  var ARBITRARY = 1;

  var LOCATION_X_MIN = 130;
  var LOCATION_X_MAX = 630;
  var LOCATION_X_WIDTH = 25;
  var LOCATION_Y_HEIGHT = 70;

  var PRICE_MAX = 1000000;

  var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var ROOM_MIN = 1;
  var ROOM_MAX = 5;

  var GUESTS_MIN = 1;
  var GUESTS_MAX = 6;

  var AD_CHECKOUT_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var OffsetTypeMap = {
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

  var getRelatedAdArray = function (arrLength) {
    var arrayRelatedAd = [];

    for (var i = 0; i < arrLength; i++) {
      var locationX = window.utils.getRandomNumber(MIN_NUMBER, document.querySelector('.map').offsetWidth) - LOCATION_X_WIDTH;
      var locationY = window.utils.getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX) - LOCATION_Y_HEIGHT;

      arrayRelatedAd.push({
        id: i,
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Здесь будет заголовок предложения',
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNumber(MIN_NUMBER, PRICE_MAX) + '₽/ночь',
          type: AD_TYPES[window.utils.getRandomNumber(MIN_NUMBER, AD_TYPES.length)],
          rooms: window.utils.getRandomNumber(ROOM_MIN, ROOM_MAX),
          guests: window.utils.getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          checkin: AD_CHECKOUT_CHECKOUT_TIME[window.utils.getRandomNumber(MIN_NUMBER, AD_CHECKOUT_CHECKOUT_TIME.length)],
          checkout: AD_CHECKOUT_CHECKOUT_TIME[window.utils.getRandomNumber(MIN_NUMBER, AD_CHECKOUT_CHECKOUT_TIME.length)],
          features: window.utils.getRandomLengthArray(AD_FEATURES, window.utils.getRandomNumber(MIN_NUMBER, AD_FEATURES.length, ARBITRARY)),
          description: 'Здесь будет описание предложения',
          photos: AD_PHOTOS
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }

    return arrayRelatedAd;
  };

  window.data = {
    getRelatedAdArray: getRelatedAdArray,
    offsetTypeMap: OffsetTypeMap
  };
})();
