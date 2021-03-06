'use strict';

(function () {
  var MAX_AMOUNT = 5;
  var FILTER_DEFAULT = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var PriceValues = {
    'LOW': {
      min: 0,
      max: 10000
    },

    'MIDDLE': {
      min: 10000,
      max: 50000
    },

    'HIGH': {
      min: 50000,
      max: Infinity
    }
  };

  var checkByType = function (type, data) {
    return type.value !== FILTER_DEFAULT ? type.value === data.offer.type : true;
  };

  var checkByPrice = function (price, data) {
    return price.value !== FILTER_DEFAULT ? data.offer.price >= PriceValues[price.value.toUpperCase()].min && data.offer.price < PriceValues[price.value.toUpperCase()].max : true;
  };

  var checkByRooms = function (rooms, data) {
    return rooms.value !== FILTER_DEFAULT ? parseInt(rooms.value, 10) === data.offer.rooms : true;
  };

  var checkByGuests = function (guests, data) {
    return guests.value !== FILTER_DEFAULT ? parseInt(guests.value, 10) === data.offer.guests : true;
  };

  var checkByFeatures = function (features, data) {
    var flag = true;
    features.forEach(function (feature) {
      flag = flag && data.offer.features.includes(feature.value);
    });
    return flag;
  };

  var filterAd = function (array) {
    var featuresChecked = mapFilters.querySelectorAll('.map__checkbox:checked');
    var filteredArray = [];

    for (var i = 0; i < array.length; i++) {
      if (checkByType(housingType, array[i]) &&
          checkByPrice(housingPrice, array[i]) &&
          checkByRooms(housingRooms, array[i]) &&
          checkByGuests(housingGuests, array[i]) &&
          checkByFeatures(featuresChecked, array[i])) {
        filteredArray.push(array[i]);
        if (filteredArray.length === MAX_AMOUNT) {
          break;
        }
      }
    }

    return filteredArray;
  };

  window.filters = {
    get: filterAd
  };
})();
