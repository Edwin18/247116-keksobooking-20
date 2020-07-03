'use strict';

(function () {
  var generateCard = function (data) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    var type = cardElement.querySelector('.popup__type');
    switch (data.offer.type) {
      case 'flat':
        type.textContent = 'Квартира';
        break;
      case 'bungalo':
        type.textContent = 'Бунгало';
        break;
      case 'house':
        type.textContent = 'Дом';
        break;
      case 'palace':
        type.textContent = 'Дворец';
        break;
    }

    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = ' Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = data.offer.features;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    for (var j = 0; j < data.offer.photos.length; j++) {
      var fragment = document.createDocumentFragment();
      var cardPhoto = document.createElement('img');
      cardPhoto.src = data.offer.photos[j];
      cardPhoto.width = 45;
      cardPhoto.height = 44;

      fragment.appendChild(cardPhoto);
    }

    var cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(fragment);

    cardElement.querySelector('.popup__avatar').textContent = data.author.avatar;

    return cardElement;
  };

  // рисуем доску объявления
  var renderCard = function () {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(generateCard(window.data.adverts[0]));
    window.data.markField.appendChild(fragment);
  };

  renderCard();

  window.card = {
    renderCard: renderCard,
  };
})();
