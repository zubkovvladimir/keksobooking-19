'use strict';

(function () {
  var getFeaturesArray = function (arr, tag, featureClass, features) {
    features.textContent = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var featuresElement = document.createElement(tag);
      var className = featureClass + ' ' + featureClass + '--' + arr[i];
      featuresElement.className = className;
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
  var renderRelatedAd = function (cardAd, cardContainer, insertBeforeEl) {
    var relatedAdCard = document.querySelector('#card').content.cloneNode(true);
    var photosBlock = relatedAdCard.querySelector('.popup__photos');
    var photo = photosBlock.querySelector('.popup__photo');
    var featuresBlock = relatedAdCard.querySelector('.popup__features');

    var title = relatedAdCard.querySelector('.popup__title');
    var address = relatedAdCard.querySelector('.popup__text--address');
    var price = relatedAdCard.querySelector('.popup__text--price');
    var type = relatedAdCard.querySelector('.popup__type');
    var capacity = relatedAdCard.querySelector('.popup__text--capacity');
    var time = relatedAdCard.querySelector('.popup__text--time');
    var description = relatedAdCard.querySelector('.popup__description');
    var avatar = relatedAdCard.querySelector('.popup__avatar');

    relatedAdCard.querySelector('.popup__title').textContent = cardAd.offer.title || title.remove();
    relatedAdCard.querySelector('.popup__text--address').textContent = cardAd.offer.address || address.remove();
    relatedAdCard.querySelector('.popup__text--price').textContent = cardAd.offer.price ? cardAd.offer.price + ' ₽/ночь' : price.remove();
    relatedAdCard.querySelector('.popup__type').textContent = window.form.offsetTypeMap[cardAd.offer.type].label || type.remove();
    relatedAdCard.querySelector('.popup__text--capacity').textContent = cardAd.offer.rooms ? cardAd.offer.rooms + ' комнаты для ' + cardAd.offer.guests + ' гостей' : capacity.remove();
    relatedAdCard.querySelector('.popup__text--time').textContent = cardAd.offer.checkin && cardAd.offer.checkout ? 'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout : time.remove();

    if (cardAd.offer.features.length) {
      getFeaturesArray(cardAd.offer.features, 'li', 'popup__feature', featuresBlock);
    } else {
      relatedAdCard.querySelector('.popup').removeChild(featuresBlock);
    }

    relatedAdCard.querySelector('.popup__description').textContent = cardAd.offer.description || description.remove();

    if (cardAd.offer.photos.length) {
      getPhotosArray(cardAd.offer.photos, photosBlock, photo);
    } else {
      relatedAdCard.querySelector('.popup').removeChild(photosBlock);
    }

    relatedAdCard.querySelector('.popup__avatar').src = cardAd.author.avatar || avatar.remove();

    cardContainer.insertBefore(relatedAdCard, insertBeforeEl);
  };

  window.card = {
    renderRelatedAd: renderRelatedAd
  };
})();
