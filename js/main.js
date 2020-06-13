'use strict';

var AVATAR_LIST = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
  'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png',
  'img/avatars/user08.png'];
var TITLE_LIST = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var HOUSING_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION_LIST = [];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE_MIN = 0;
var PRICE_MAX = 1000000;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var pinsCount = 8;
var GAP = 20;
var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;

// функция для определения случайного числа
var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

// функция для определения случайного элемента массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// создаем объявление - объект с описанием жилья
var getRandomPin = function () {
  return {
    'author': {
      'avatar': getRandomElement(AVATAR_LIST)
    },
    'offer': {
      'title': getRandomElement(TITLE_LIST),
      'address': '',
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': getRandomElement(HOUSING_LIST),
      'rooms': getRandomNumber(1, 100),
      'guests': getRandomNumber(1, 100),
      'checkin': getRandomElement(CHECKIN_LIST),
      'checkout': getRandomElement(CHECKOUT_LIST),
      'features': getRandomElement(FEATURES_LIST),
      'description': getRandomElement(DESCRIPTION_LIST),
      'photos': PHOTOS_LIST
    },
    'location': {
      'x': getRandomNumber(GAP, MAP_WIDTH - GAP),
      'y': getRandomNumber(MIN_Y, MAX_Y)
    }
  };
};

// создаем массив наших объектов
var getRandomPins = function () {
  var pinsArr = [];

  for (var i = 0; i < pinsCount; i++) {
    pinsArr.push(getRandomPin());
  }
  return pinsArr;
};

// находим метку и нужный шаблон
var pinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// создаем
var createPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinPicture = pinElement.querySelector('img');

  pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';

  pinPicture.src = data.author.avatar;
  pinPicture.alt = data.offer.title;

  return pinElement;
};

// отрисовываем пины
var pins = getRandomPins();
var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(createPin(pins[j]));
  }

  pinListElement.appendChild(fragment);
};

renderPins();

// создаем объявление
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getCardPin = function (data) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

  var type = cardElement.querySelector('.popup__type');
  if (data.offer.type === 'flat') {
    type.textContent = 'Квартира';
  } else if (data.offer.type === 'bungalo') {
    type.textContent = 'Бунгало';
  } else if (data.offer.type === 'house') {
    type.textContent = 'Дом';
  } else {
    type.textContent = 'Дворец';
  }

  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = ' Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = data.offer.features;
  cardElement.querySelector('.popup__description').textContent = data.offer.description;

  var cardPhotos = cardElement.querySelector('.popup__photos');
  for (var y = 0; y < data.offer.photos.length; y++) {
    var cardPhoto = cardElement.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);

    cardPhoto.src = data.offer.photos[y];
    cardPhotos.appendChild(cardPhoto);
    cardElement.appendChild(cardPhotos);
  }

  cardElement.querySelector('.popup__avatar').textContent = data.author.avatar;

  return cardElement;
};

// рисуем объявление
var renderCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCardPin(pins[0]));
  pinListElement.appendChild(fragment);
};

renderCard();
