'use strict';

(function () {
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomLengthArray: getRandomLengthArray
  };
})();
