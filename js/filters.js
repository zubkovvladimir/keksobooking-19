'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var getFiltered = function (arr) {
    var resultArr = arr.filter(function (elem) {
      return housingType.value !== 'any' ? elem.offer.type === housingType.value : true;
    });
    return resultArr;
  };

  window.filters = {
    getFiltered: getFiltered
  };
})();
