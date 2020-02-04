'use strict';

var AD_COUNT = 8;
var MIN_NUMBER = 0;
var AD_TITLES = ['Строка заголовка предложения 1', 'Строка заголовка предложения 2', 'Строка заголовка предложения 3', 'Строка заголовка предложения 4', 'Строка заголовка предложения 5', 'Строка заголовка предложения 6', 'Строка заголовка предложения 7', 'Строка заголовка предложения 8'];
var AD_LOCATIONS_X = ['100', '200', '300', '400', '500', '600', '700', '800'];
var AD_LOCATIONS_Y = ['150', '250', '350', '450', '550', '650', '750', '850'];
var AD_PRICES = ['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000'];
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_ROOMS = ['1', '2', '3', '4'];
var AD_GUESTS = ['1', '2', '3', '4'];
var AD_CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var AD_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTIONS = ['Строка с описанием 1', 'Строка с описанием 2', 'Строка с описанием 3', 'Строка с описанием 4', 'Строка с описанием 5', 'Строка с описанием 6', 'Строка с описанием 7', 'Строка с описанием 8'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_HEIGHT_MIN = 130;
var LOCATION_HEIGHT_MAX = 630;
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomNumberArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomLengthArray = function (arr, length) {
  var arrayRandomLength = [];
  for (var i = 0; i < length; i++) {
    arrayRandomLength[i] = arr[i];
  }
  return arrayRandomLength;
};

var getRelatedAdArray = function () {
  var arrayRelatedAd = [];

  for (var i = 0; i < AD_COUNT; i++) {
    var relatedAd = {author: {}, offer: {}, location: {}};

    relatedAd.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    relatedAd.offer.title = AD_TITLES[getRandomNumber(MIN_NUMBER, AD_TITLES.length)];
    relatedAd.offer.address = AD_LOCATIONS_X[getRandomNumber(MIN_NUMBER, AD_LOCATIONS_X.length)] + ', ' + AD_LOCATIONS_Y[getRandomNumber(MIN_NUMBER, AD_LOCATIONS_Y.length)];
    relatedAd.offer.price = AD_PRICES[getRandomNumber(MIN_NUMBER, AD_PRICES.length)] + 'P/ночь';
    relatedAd.offer.type = AD_TYPES[getRandomNumber(MIN_NUMBER, AD_TYPES.length)];
    relatedAd.offer.rooms = AD_ROOMS[getRandomNumber(MIN_NUMBER, AD_ROOMS.length)];
    relatedAd.offer.guests = AD_GUESTS[getRandomNumber(MIN_NUMBER, AD_GUESTS.length)];
    relatedAd.offer.checkin = AD_CHECKIN_TIME[getRandomNumber(MIN_NUMBER, AD_CHECKIN_TIME.length)];
    relatedAd.offer.checkout = AD_CHECKOUT_TIME[getRandomNumber(MIN_NUMBER, AD_CHECKOUT_TIME.length)];
    relatedAd.offer.features = getRandomLengthArray(AD_FEATURES, getRandomNumber(MIN_NUMBER + 1, AD_FEATURES.length));
    relatedAd.offer.description = AD_DESCRIPTIONS[getRandomNumber(MIN_NUMBER, AD_DESCRIPTIONS.length)];
    relatedAd.offer.photos = getRandomLengthArray(AD_PHOTOS, getRandomNumberArbitrary(MIN_NUMBER + 1, AD_PHOTOS.length));
    relatedAd.location.x = getRandomNumber(50, document.querySelector('.map').offsetWidth);
    relatedAd.location.y = getRandomNumber(LOCATION_HEIGHT_MIN, LOCATION_HEIGHT_MAX);

    arrayRelatedAd[i] = relatedAd;
  }

  return arrayRelatedAd;
};

var renderPin = function (pinAd) {
  var relatedAdPin = pin.cloneNode(true);

  relatedAdPin.style = 'left: ' + (pinAd.location.x - 50) + 'px; top: ' + (pinAd.location.y - 35) + 'px;';
  relatedAdPin.querySelector('img').setAttribute('src', pinAd.author.avatar);
  relatedAdPin.querySelector('img').setAttribute('alt', pinAd.offer.title);

  return relatedAdPin;
};

var createRelatedAdBlock = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  return fragment;
};

mapPins.appendChild(createRelatedAdBlock(getRelatedAdArray()));

document.querySelector('.map').classList.remove('map--faded');
