'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (pinAd) {
    var relatedAdPin = pinTemplate.cloneNode(true);

    relatedAdPin.dataset.id = pinAd.id;
    relatedAdPin.style = 'left: ' + (pinAd.location.x) + 'px; top: ' + (pinAd.location.y) + 'px;';
    relatedAdPin.querySelector('img').setAttribute('src', pinAd.author.avatar);
    relatedAdPin.querySelector('img').setAttribute('alt', pinAd.offer.title);

    return relatedAdPin;
  };

  window.pin = {
    createPin: createPin
  };
})();
