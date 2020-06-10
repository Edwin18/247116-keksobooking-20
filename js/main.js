'use strict';

var TITLE_LIST = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var HOUSING_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION_LIST = [];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_MIN = 1;
var AVATAR_MAX = 8;
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
function getRandomElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// создаем объявление - объект с описанием жилья
var getRandomPin = function () {
  return {
    'author': {
      'avatar': 'img/avatars/user' + 0 + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.png'
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
      'photos': getRandomElement(PHOTOS_LIST)
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
  var pinPicture = document.querySelector('img');

  pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';

  pinPicture.src = data.author.avatar;
  pinPicture.alt = data.offer.title;

  return pinElement;
};

// отрисовываем
var renderPins = function () {
  var pins = getRandomPins();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }

  pinListElement.appendChild(fragment);
};

renderPins();
