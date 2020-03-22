'use strict';

(function () {
  var MAX_AMOUNT = 5;

  var mapFilters = document.querySelector('.map__filters');

  var PriceValues = {
    'low': {
      MIN: 0,
      MAX: 10000
    },

    'middle': {
      MIN: 10000,
      MAX: 50000
    },

    'high': {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var checkByType = function (type, data) {
    return type.value !== 'any' ? type.value === data.offer.type : true;
  };

  var checkByPrice = function (price, data) {
    return price.value !== 'any' ? data.offer.price >= PriceValues[price.value].min && data.offer.price < PriceValues[price.value].max : true;
  };

  var checkByRooms = function (rooms, data) {
    return rooms.value !== 'any' ? parseInt(rooms.value, 10) === data.offer.rooms : true;
  };

  var checkByGuests = function (guests, data) {
    return guests.value !== 'any' ? parseInt(guests.value, 10) === data.offer.guests : true;
  };

  var checkByFeatures = function (features, data) {
    var flag = true;
    features.forEach(function (feature) {
      flag = flag && data.offer.features.includes(feature.value);
    });
    return flag;
  };

  var filterAd = function (array) {
    var housingType = mapFilters.querySelector('#housing-type');
    var housingPrice = mapFilters.querySelector('#housing-price');
    var housingRooms = mapFilters.querySelector('#housing-rooms');
    var housingGuests = mapFilters.querySelector('#housing-guests');
    var featuresChecked = mapFilters.querySelectorAll('.map__checkbox:checked');
    var filteredAdverts = [];

    for (var i = 0; i < array.length; i++) {
      if (checkByType(housingType, array[i]) &&
          checkByPrice(housingPrice, array[i]) &&
          checkByRooms(housingRooms, array[i]) &&
          checkByGuests(housingGuests, array[i]) &&
          checkByFeatures(featuresChecked, array[i])) {
        filteredAdverts.push(array[i]);
        if (filteredAdverts.length === MAX_AMOUNT) {
          break;
        }
      }
    }

    return filteredAdverts;
  };

  window.filters = {
    get: filterAd
  };
})();
