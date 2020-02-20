'use strict';

// var AD_COUNT = 8;
var MIN_NUMBER = 0;
var ARBITRARY = 1;
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECKOUT_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_MIN = 130;
var LOCATION_X_MAX = 630;
var LOCATION_X_WIDTH = 25;
var LOCATION_Y_HEIGHT = 70;
var ROOM_MIN = 1;
var ROOM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 6;
var PRICE_MAX = 1000000;
var ENTER_KEY = 'Enter';
var HALF_ICONS = 2;
var ERROR_TEXT_ROOMS = 'Выбранное количество комнат не соответствует выбранному количеству гостей';
var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;
var ROOMS_NUMBER_MAX = 100;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var muffin = mapPins.querySelector('.map__pin');
var muffinAfter = getComputedStyle(mapPins.querySelector('.map__pin--main'), ':after');
var muffinImg = muffin.querySelector('img');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var form = document.querySelector('.ad-form');
var formFieldset = form.querySelectorAll('fieldset');
var mapFilters = mapFiltersContainer.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('.map__filter');
var mapFiltersFieldset = mapFilters.querySelector('.map__features');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var capacity = form.querySelector('#capacity');
var roomNumber = form.querySelector('#room_number');
var price = form.querySelector('#price');
var roomType = form.querySelector('#type');

var offetTypeMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomNumber = function (min, max, arbitrary) {
  if (!arbitrary) {
    arbitrary = 0;
  }
  return Math.floor(Math.random() * (max - min + arbitrary) + min);
};

var getRandomLengthArray = function (arr, length) {
  var arrayRandomLength = [];
  for (var i = 0; i < length; i++) {
    arrayRandomLength[i] = arr[i];
  }
  return arrayRandomLength;
};

var getRelatedAdArray = function (arrLength) {
  var arrayRelatedAd = [];

  for (var i = 0; i < arrLength; i++) {
    var locationX = getRandomNumber(MIN_NUMBER, document.querySelector('.map').offsetWidth) - LOCATION_X_WIDTH;
    var locationY = getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX) - LOCATION_Y_HEIGHT;

    arrayRelatedAd.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Здесь будет заголовок предложения',
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_NUMBER, PRICE_MAX) + '₽/ночь',
        type: AD_TYPES[getRandomNumber(MIN_NUMBER, AD_TYPES.length)],
        rooms: getRandomNumber(ROOM_MIN, ROOM_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: AD_CHECKOUT_CHECKOUT_TIME[getRandomNumber(MIN_NUMBER, AD_CHECKOUT_CHECKOUT_TIME.length)],
        checkout: AD_CHECKOUT_CHECKOUT_TIME[getRandomNumber(MIN_NUMBER, AD_CHECKOUT_CHECKOUT_TIME.length)],
        features: getRandomLengthArray(AD_FEATURES, getRandomNumber(MIN_NUMBER, AD_FEATURES.length, ARBITRARY)),
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

var renderPin = function (pinAd) {
  var relatedAdPin = pin.cloneNode(true);

  relatedAdPin.style = 'left: ' + (pinAd.location.x) + 'px; top: ' + (pinAd.location.y) + 'px;';
  relatedAdPin.querySelector('img').setAttribute('src', pinAd.author.avatar);
  relatedAdPin.querySelector('img').setAttribute('alt', pinAd.offer.title);

  return relatedAdPin;
};

var getFeaturesArray = function (arr, tag, class1, class2, features) {
  features.textContent = '';
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var featuresElement = document.createElement(tag);
    featuresElement.classList.add(class1, class2 + arr[i]);
    fragment.appendChild(featuresElement);
  }
  features.appendChild(fragment);
};

var getPhotosArray = function (arr, container, imageElement) {
  container.textContent = '';
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var cloneImageElement = imageElement.cloneNode(true);
    cloneImageElement.src = arr[i];
    fragment.appendChild(cloneImageElement);
  }
  container.appendChild(fragment);
};

// var renderRelatedAd = function (cardAd) {
//   var relatedAdCard = document.querySelector('#card').content.cloneNode(true);
//   var photosBlock = relatedAdCard.querySelector('.popup__photos');
//   var photo = photosBlock.querySelector('.popup__photo');
//   var featuresBlock = relatedAdCard.querySelector('.popup__features');

//   relatedAdCard.querySelector('.popup__title').textContent = cardAd.offer.title;
//   relatedAdCard.querySelector('.popup__text--address').textContent = cardAd.offer.address;
//   relatedAdCard.querySelector('.popup__text--price').textContent = cardAd.offer.price;
//   relatedAdCard.querySelector('.popup__type').textContent = offetTypeMap[cardAd.offer.type];
//   relatedAdCard.querySelector('.popup__text--capacity').textContent = cardAd.offer.rooms + ' комнаты для ' + cardAd.offer.guests + ' гостей';
//   relatedAdCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout;

//   if (cardAd.offer.features.length) {
//     getFeaturesArray(cardAd.offer.features, 'li', 'popup__feature', 'popup__feature--', featuresBlock);
//   } else {
//     relatedAdCard.querySelector('.popup').removeChild(featuresBlock);
//   }

//   relatedAdCard.querySelector('.popup__description').textContent = cardAd.offer.description;

//   if (cardAd.offer.photos.length) {
//     getPhotosArray(cardAd.offer.photos, photosBlock, photo);
//   } else {
//     relatedAdCard.querySelector('.popup').removeChild(photosBlock);
//   }

//   relatedAdCard.querySelector('.popup__avatar').src = cardAd.author.avatar;

//   return relatedAdCard;
// };

// var createRelatedAdBlock = function (arr) {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < arr.length; i++) {
//     fragment.appendChild(renderPin(arr[i]));
//   }

//   return fragment;
// };

// map.insertBefore(renderRelatedAd(getRelatedAdArray(AD_COUNT)[0]), mapFiltersContainer);

// mapPins.appendChild(createRelatedAdBlock(getRelatedAdArray(AD_COUNT)));

// document.querySelector('.map').classList.remove('map--faded');

var activatePage = function (evt) {
  enableFormAndMap(evt);

  var locationX = parseInt(muffin.style.left, 10) + ((muffinImg.width) / HALF_ICONS);
  var locationY = parseInt(muffin.style.top, 10) + ((muffinImg.height) / HALF_ICONS) + parseInt(muffinAfter.top, 10);

  address.value = locationX + ', ' + locationY;
};

var checkValidRooms = function () {
  var guests = capacity.value;
  var roomNumberValue = roomNumber.value;

  if (roomNumberValue < guests) {
    roomNumber.setCustomValidity(ERROR_TEXT_ROOMS);
  } else if (roomNumberValue === ROOMS_NUMBER_MAX && guests !== 0) {
    roomNumber.setCustomValidity(ERROR_TEXT_ROOMS);
  } else if (guests === 0 && roomNumberValue !== ROOMS_NUMBER_MAX) {
    roomNumber.setCustomValidity(ERROR_TEXT_ROOMS);
  } else {
    roomNumber.setCustomValidity('');
  }
};

var checkValidRoomsType = function () {
  var typeValue = roomType.value;

  if (typeValue === 'bungalo') {
    price.setAttribute('min', PRICE_BUNGALO);
    price.setAttribute('placeholder', PRICE_BUNGALO);
  } else if (typeValue === 'flat') {
    price.setAttribute('min', PRICE_FLAT);
    price.setAttribute('placeholder', PRICE_FLAT);
  } else if (typeValue === 'house') {
    price.setAttribute('min', PRICE_HOUSE);
    price.setAttribute('placeholder', PRICE_HOUSE);
  } else if (typeValue === 'palace') {
    price.setAttribute('min', PRICE_PALACE);
    price.setAttribute('placeholder', PRICE_PALACE);
  }
};

var disablePage = function () {
  var locationX = parseInt(muffin.style.left, 10) + ((muffinImg.width) / HALF_ICONS);
  var locationY = parseInt(muffin.style.top, 10) + ((muffinImg.height) / HALF_ICONS);

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = true;
  }

  for (var j = 0; j < mapFiltersSelect.length; j++) {
    mapFiltersSelect[j].disabled = true;
  }

  mapFiltersFieldset.disabled = true;
  address.value = locationX + ', ' + locationY;

  checkValidRoomsType();
};

disablePage();

var enableFormAndMap = function (evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = false;
    }

    for (var j = 0; j < mapFiltersSelect.length; j++) {
      mapFiltersSelect[j].disabled = false;
    }

    mapFiltersFieldset.disabled = false;

    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
  }
};


form.addEventListener('input', function () {
  checkValidRooms();
  checkValidRoomsType();
});
mapPinMain.addEventListener('mousedown', activatePage);
mapPinMain.addEventListener('keydown', activatePage);
