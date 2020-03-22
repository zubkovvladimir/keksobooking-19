'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (pinAd) {
    var relatedAdPin = pinTemplate.cloneNode(true);

    relatedAdPin.dataset.id = pinAd.id;
    relatedAdPin.style = 'left: ' + ((pinAd.location.x) - Math.round(PIN_WIDTH / 2)) + 'px; top: ' + (pinAd.location.y - PIN_HEIGHT) + 'px;';
    relatedAdPin.querySelector('img').setAttribute('src', pinAd.author.avatar);
    relatedAdPin.querySelector('img').setAttribute('alt', pinAd.offer.title);

    return relatedAdPin;
  };

  window.pin = {
    create: createPin
  };
})();
