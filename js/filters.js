'use strict';

(function () {
  var MAX_AMOUNT = 5;
  var FILTER_DEFAULT = 'any';

  var mapFilters = document.querySelector('.map__filters');

  var PriceValues = {
    'low': {
      min: 0,
      max: 10000
    },

    'middle': {
      min: 10000,
      max: 50000
    },

    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var getFilterValues = function () {
    var filterInputs = mapFilters.querySelectorAll('.map__filter, input[type=checkbox]:checked');
    var filterValues = [];

    filterInputs.forEach(function (filter) {
      filterValues.push({
        name: filter.getAttribute('name'),
        value: filter.value
      });
    });

    return filterValues;
  };

  var checkFeature = function (features, value) {
    return features.some(function (feature) {
      return feature === value;
    });
  };

  var FilterRules = {
    'housing-type': function (offer, value) {
      return offer.type === value;
    },

    'housing-price': function (offer, value) {
      return offer.price >= PriceValues[value].min && offer.price < PriceValues[value].max;
    },

    'housing-rooms': function (offer, value) {
      return offer.rooms === parseInt(value, 10);
    },

    'housing-guests': function (offer, value) {
      return offer.guests === parseInt(value, 10);
    },

    'features': function (offer, value) {
      return checkFeature(offer.features, value);
    },
  };

  var filterAd = function (array) {
    return array.filter(function (ad) {
      return ad.offer && getFilterValues().every(function (element) {
        return (element.value !== FILTER_DEFAULT) ? FilterRules[element.name](ad.offer, element.value) : true;
      });
    }).slice(0, MAX_AMOUNT);
  };

  window.filters = {
    get: filterAd
  };
})();
