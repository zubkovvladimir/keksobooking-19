'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var checkPrice = function (elem) {
    switch (housingPrice.value) {
      case 'middle':
        return elem.offer.price >= PRICE_LOW && elem.offer.price <= PRICE_HIGH;
      case 'low':
        return elem.offer.price <= PRICE_LOW;
      case 'high':
        return elem.offer.price >= PRICE_HIGH;
      default:
        return true;
    }
  };

  var getFiltered = function (arr) {
    var resultArr = arr.filter(function (elem) {
      return housingType.value !== 'any' ? elem.offer.type === housingType.value : true;
    })
    .filter(checkPrice)
    .filter(function (elem) {
      return housingRooms.value !== 'any' ? elem.offer.rooms === parseInt(housingRooms.value, 10) : true;
    })
    .filter(function (elem) {
      return housingGuests.value !== 'any' ? elem.offer.rooms === parseInt(housingGuests.value, 10) : true;
    })
    .filter(function (elem) {
      return housingGuests.value !== 'any' ? elem.offer.rooms === parseInt(housingGuests.value, 10) : true;
    });

    return resultArr;
  };

  window.filters = {
    get: getFiltered
  };
})();
