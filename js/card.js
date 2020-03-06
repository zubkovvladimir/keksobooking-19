'use strict';

(function () {
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

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

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
  var renderRelatedAd = function (cardAd) {
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

  window.card = {
    renderRelatedAd: renderRelatedAd
  };
})();
