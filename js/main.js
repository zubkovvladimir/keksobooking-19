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
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var card = document.querySelector('#card').content.querySelector('.map__card');
var featuresBlock = document.querySelector('#card').content.querySelector('.popup__features');
var photosBlock = document.querySelector('#card').content.querySelector('.popup__photos');

var offetTypeMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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
    relatedAd.offer.price = AD_PRICES[getRandomNumber(MIN_NUMBER, AD_PRICES.length)] + '₽/ночь';
    relatedAd.offer.type = AD_TYPES[getRandomNumber(MIN_NUMBER, AD_TYPES.length)];
    relatedAd.offer.rooms = AD_ROOMS[getRandomNumber(MIN_NUMBER, AD_ROOMS.length)];
    relatedAd.offer.guests = AD_GUESTS[getRandomNumber(MIN_NUMBER, AD_GUESTS.length)];
    relatedAd.offer.checkin = AD_CHECKIN_TIME[getRandomNumber(MIN_NUMBER, AD_CHECKIN_TIME.length)];
    relatedAd.offer.checkout = AD_CHECKOUT_TIME[getRandomNumber(MIN_NUMBER, AD_CHECKOUT_TIME.length)];
    relatedAd.offer.features = getRandomLengthArray(AD_FEATURES, getRandomNumberArbitrary(MIN_NUMBER, AD_FEATURES.length));
    relatedAd.offer.description = AD_DESCRIPTIONS[getRandomNumber(MIN_NUMBER, AD_DESCRIPTIONS.length)];
    relatedAd.offer.photos = AD_PHOTOS;
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

featuresBlock.innerHTML = '';
var getFeaturesArray = function (arr, tag, class1, class2) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var featuresElement = document.createElement(tag);
    featuresElement.classList.add(class1, class2 + arr[i]);
    fragment.appendChild(featuresElement);
  }
  return fragment;
};

photosBlock.innerHTML = '';
var getPhotosArray = function (arr, tag, classElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var featuresElement = document.createElement(tag);
    featuresElement.classList.add(classElement);
    featuresElement.src = arr[i];
    featuresElement.width = '45';
    featuresElement.height = '40';
    fragment.appendChild(featuresElement);
  }
  return fragment;
};

var renderRelatedAd = function (cardAd) {
  var relatedAdCard = card.cloneNode(true);

  relatedAdCard.querySelector('.popup__title').textContent = cardAd.offer.title;
  relatedAdCard.querySelector('.popup__text--address').textContent = cardAd.offer.address;
  relatedAdCard.querySelector('.popup__text--price').textContent = cardAd.offer.price;
  relatedAdCard.querySelector('.popup__type').textContent = offetTypeMap[cardAd.offer.type];
  relatedAdCard.querySelector('.popup__text--capacity').textContent = cardAd.offer.rooms + ' комнаты для ' + cardAd.offer.guests + ' гостей';
  relatedAdCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout;
  relatedAdCard.querySelector('.popup__features').appendChild(getFeaturesArray(cardAd.offer.features, 'li', 'popup__feature', 'popup__feature--'));
  relatedAdCard.querySelector('.popup__description').textContent = cardAd.offer.description;
  relatedAdCard.querySelector('.popup__photos').appendChild(getPhotosArray(cardAd.offer.photos, 'img', 'popup__photo'));
  relatedAdCard.querySelector('.popup__avatar').src = cardAd.author.avatar;

  return relatedAdCard;
};

var createRelatedAdBlock = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  return fragment;
};

map.insertBefore(renderRelatedAd(getRelatedAdArray()[0]), mapFiltersContainer);

mapPins.appendChild(createRelatedAdBlock(getRelatedAdArray()));

document.querySelector('.map').classList.remove('map--faded');
