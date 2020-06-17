'use strict';

var AVATAR_LIST = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
var TITLE_LIST = [
  'Роскошный дизайн',
  'Выгодное предложение',
  'Спецпредложение действует сутки',
  'При длительной брони скидка'
];
var HOUSING_LIST = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TIME_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking', 'washer',
  'elevator',
  'conditioner'
];
var DESCRIPTION_LIST = [
  'Вид с высоты птичьего полета',
  'Красивый парк через дорогу',
  'В 200 метрах от набережной',
  'Рядом с эпицентром движухи'
];
var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PRICE_MIN = 0;
var PRICE_MAX = 1000000;

var GAP = 20;
var LOCATION_MIN_X = GAP;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var pinsCount = 8;

// функция для определения случайного числа
var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

// функция для определения случайного элемента массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// функция для определения массива случайной длины
var getRandomArray = function (arr) {
  var randomObject = {};
  for (var i = 0; i <= getRandomNumber(1, arr.length - 1); i++) {
    var randomElement = getRandomElement(arr);
    randomObject[randomElement] = true;
  }

  return Object.keys(randomObject);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// создаем объявление - объект с описанием жилья
var getRandomPin = function () {
  var MAP_WIDTH = document.querySelector('.map__pins');

  var locationX = getRandomNumber(LOCATION_MIN_X, getRandomNumber(GAP, MAP_WIDTH.offsetWidth - GAP));
  var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

  return {
    'author': {
      'avatar': getRandomElement(AVATAR_LIST)
    },
    'offer': {
      'title': getRandomElement(TITLE_LIST),
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': getRandomElement(HOUSING_LIST),
      'rooms': getRandomNumber(1, 100),
      'guests': getRandomNumber(1, 100),
      'checkin': getRandomElement(TIME_LIST),
      'checkout': getRandomElement(TIME_LIST),
      'features': getRandomArray(FEATURES_LIST).join(', '),
      'description': getRandomElement(DESCRIPTION_LIST),
      'photos': getRandomArray(PHOTOS_LIST)
    },
    'location': {
      x: locationX,
      y: locationY
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
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// создаем пин
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

  pinList.appendChild(fragment);
};

renderPins();

// создаем объявление
var getCardPin = function (data) {
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

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < data.offer.photos.length; j++) {
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

// рисуем объявление
var renderCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCardPin(pins[0]));
  pinList.appendChild(fragment);
};

renderCard();
