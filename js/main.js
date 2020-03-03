'use strict';

var AD_COUNT = 8;
var MIN_NUMBER = 0;
var ARBITRARY = 1;
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECKOUT_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var LOCATION_X_MIN = 130;
var LOCATION_X_MAX = 630;
var LOCATION_X_WIDTH = 25;
var LOCATION_Y_HEIGHT = 70;

var ROOM_MIN = 1;
var ROOM_MAX = 5;
var ROOMS_NUMBER_MAX = 100;

var GUESTS_MIN = 1;
var GUESTS_MAX = 6;

var ERROR_TEXT_ROOMS = 'Выбранное количество комнат не соответствует выбранному количеству гостей';
var ERROR_TEXT_PRICE = 'Цена должна быть меньше 1 000 000';

var PRICE_MAX = 1000000;

var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';
var MOUSE_BUTTON_LEFT_CODE = 0;

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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');
var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');
var containerTimeinTimeout = adForm.querySelector('.ad-form__element--time');

var address = document.querySelector('#address');
var capacity = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');
var price = adForm.querySelector('#price');
var roomType = adForm.querySelector('#type');

var offsetTypeMap = {
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
      id: i,
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

var createPin = function (pinAd) {
  var relatedAdPin = pinTemplate.cloneNode(true);

  relatedAdPin.dataset.id = pinAd.id;
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

// создает карточку объявления
var renderlatedAd = function (cardAd) {
  var relatedAdCard = document.querySelector('#card').content.cloneNode(true);
  var photosBlock = relatedAdCard.querySelector('.popup__photos');
  var photo = photosBlock.querySelector('.popup__photo');
  var featuresBlock = relatedAdCard.querySelector('.popup__features');

  relatedAdCard.querySelector('.popup__title').textContent = cardAd.offer.title;
  relatedAdCard.querySelector('.popup__text--address').textContent = cardAd.offer.address;
  relatedAdCard.querySelector('.popup__text--price').textContent = cardAd.offer.price;
  relatedAdCard.querySelector('.popup__type').textContent = offsetTypeMap[cardAd.offer.type].label;
  relatedAdCard.querySelector('.popup__text--capacity').textContent =
    cardAd.offer.rooms + ' комнаты для ' + cardAd.offer.guests + ' гостей';
  relatedAdCard.querySelector('.popup__text--time').textContent =
    'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout;

  if (cardAd.offer.features.length) {
    getFeaturesArray(cardAd.offer.features, 'li', 'popup__feature', 'popup__feature--', featuresBlock);
  } else {
    relatedAdCard.querySelector('.popup').removeChild(featuresBlock);
  }

  relatedAdCard.querySelector('.popup__description').textContent = cardAd.offer.description;

  if (cardAd.offer.photos.length) {
    getPhotosArray(cardAd.offer.photos, photosBlock, photo);
  } else {
    relatedAdCard.querySelector('.popup').removeChild(photosBlock);
  }

  relatedAdCard.querySelector('.popup__avatar').src = cardAd.author.avatar;

  map.insertBefore(relatedAdCard, mapFiltersContainer);
};

// создает фрагмент пинов
var createAdFragment = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPin(arr[i]));
  }

  return fragment;
};

var ads = getRelatedAdArray(AD_COUNT);

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

  mapPins.appendChild(createAdFragment(ads));
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
  var attributeValue = offsetTypeMap[typeValue].minPrice;

  price.setAttribute('min', attributeValue);
  price.setAttribute('placeholder', attributeValue);
};

var checkMaxPrice = function () {
  if (price.value > PRICE_MAX) {
    price.setCustomValidity(ERROR_TEXT_PRICE);
  }
};

var synchronizeTimeIn = function () {
  selectTimeOut.value = selectTimeIn.value;
};

var synchronizeTimeOut = function () {
  selectTimeIn.value = selectTimeOut.value;
};

selectTimeIn.addEventListener('change', synchronizeTimeIn);
selectTimeOut.addEventListener('change', synchronizeTimeOut);

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
  checkValidRoomsType();
};

disablePage();

adForm.addEventListener('input', function () {
  checkValidRooms();
  checkValidRoomsType();
  checkMaxPrice();
});

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

// закрывает открытую карточку
var closeOpenedCard = function () {
  var mapCard = map.querySelector('.map__card');
  if (mapCard) {
    map.removeChild(mapCard);
  }
};

// отображает карточку, при нажатии, на соответствующий пин
var pinClickHandler = function (evt) {
  var isClickOnPin = evt.target.className === 'map__pin' && evt.target.className !== 'map__pin map__pin--main';
  var isClickInsidePin = evt.target.closest('.map__pin') && !(evt.target.closest('.map__pin--main'));
  var adId;
  var targetAd;
  closeOpenedCard();

  // чтобы игнорирование клика, по главному пину, работало, функция отрисовки карточки перенесена внутрь каждого условия
  if (isClickOnPin) {
    adId = evt.target.dataset.id;
    targetAd = ads.find(function (ad) {
      return parseInt(ad.id, 10) === parseInt(adId, 10);
    });

    renderlatedAd(targetAd);
  } else if (isClickInsidePin) {
    adId = evt.target.closest('.map__pin').dataset.id;
    targetAd = ads.find(function (ad) {
      return parseInt(ad.id, 10) === parseInt(adId, 10);
    });

    renderlatedAd(targetAd);
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
