'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var mapFilters = document.querySelector('.map__filters');

  var filterSelects = function (data, value, filterType) {
    return data.filter(function (item) {
      return item.offer[filterType].toString() === value;
    });
  };

  var priceMap = {
    'low': function (price) {
      return price <= PRICE_LOW;
    },
    'middle': function (price) {
      return price >= PRICE_LOW && price <= PRICE_HIGH;
    },
    'high': function (price) {
      return price >= PRICE_HIGH;
    }
  };

  var filterPrice = function (data, priceValue) {
    return data.filter(function (item) {
      return priceMap[priceValue](item.offer.price);
    });
  };

  var filterFeatures = function (data, featureValue) {
    return data.filter(function (item) {
      return item.offer.features.includes(featureValue);
    });
  };

  var getFiltered = function (arr) {
    var selects = mapFilters.querySelectorAll('select');
    var inputChecked = mapFilters.querySelectorAll('.map__checkbox:checked');

    selects = Array.from(selects).filter(function (it) {
      return it.value !== 'any';
    });

    var resultArray = arr.slice();

    selects.forEach(function (it) {
      switch (it.id) {
        case 'housing-type':
          resultArray = filterSelects(resultArray, it.value, 'type');
          break;
        case 'housing-rooms':
          resultArray = filterSelects(resultArray, it.value, 'rooms');
          break;
        case 'housing-guests':
          resultArray = filterSelects(resultArray, it.value, 'guests');
          break;
        case 'housing-price':
          resultArray = filterPrice(resultArray, it.value);
          break;
      }
    });

    inputChecked.forEach(function (it) {
      resultArray = filterFeatures(resultArray, it.value);
    });

    return resultArray;
  };

  window.filters = {
    get: getFiltered
  };
})();
