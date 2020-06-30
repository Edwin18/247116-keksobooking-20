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

var MARK_SIZE = {
  HEIGHT: 84,
  RADIUS: 62 / 2
};

var GAP = 20;
var LOCATION_MIN_X = GAP + MARK_SIZE.RADIUS;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630 - MARK_SIZE.HEIGHT;

var marksCount = 8;

var LEFT_MOUSE_BUTTON = 0;
var ENTER = 'Enter';

var map = document.querySelector('.map');
var markField = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomArray = function (arr) {
  var randomObject = {};
  for (var i = 0; i <= getRandomNumber(1, arr.length - 1); i++) {
    var randomElement = getRandomElement(arr);
    randomObject[randomElement] = true;
  }

  return Object.keys(randomObject);
};

// создаем объявление - объект с описанием жилья
var generateAdvert = function () {
  var LOCATION_MAX_X = markField.clientWidth - GAP - MARK_SIZE.RADIUS;
  var locationX = getRandomNumber(LOCATION_MIN_X, getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X));
  var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

  return {
    'author': {
      'avatar': getRandomElement(AVATAR_LIST)
    },
    'offer': {
      'title': getRandomElement(TITLE_LIST),
      'address': getRandomNumber(GAP, document.querySelector('.map__pins').offsetWidth - GAP) + ', ' + locationY,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': getRandomElement(HOUSING_LIST),
      'rooms': getRandomNumber(1, 100),
      'guests': getRandomNumber(1, 100),
      'checkin': getRandomElement(TIME_LIST),
      'checkout': getRandomElement(TIME_LIST),
      'features': getRandomArray(FEATURES_LIST).join(', '),
      'description': getRandomElement(DESCRIPTION_LIST),
      'photos': getRandomArray(PHOTOS_LIST)// тут должен быть массив случайной длxcv
    },
    'location': {
      x: locationX,
      y: locationY
    }
  };
};

// создаем массив наших объявлений
var generateAdverts = function () {
  var advertsArr = [];

  for (var i = 0; i < marksCount; i++) {
    advertsArr.push(generateAdvert());
  }
  return advertsArr;
};

// находим метку и нужный шаблон
var markTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// создаем пин
var createMark = function (data) {
  var markElement = markTemplate.cloneNode(true);
  var markImg = markElement.querySelector('img');

  markElement.style.left = data.location.x + MARK_SIZE.RADIUS + 'px';
  markElement.style.top = data.location.y + MARK_SIZE.HEIGHT + 'px';

  markImg.src = data.author.avatar;
  markImg.alt = data.offer.title;

  return markElement;
};

// отрисовываем пины
var adverts = generateAdverts();

var renderMarks = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < adverts.length; j++) {
    fragment.appendChild(createMark(adverts[j]));
  }

  markField.appendChild(fragment);
};

/*
var hideBlock = function (block) {
  var availability = block.children.length;
  block.style.display = availability === 0 ? 'none': '';
} // Если данных для заполнения не хватает, соответствующий блок в карточке скрывается
  // не понимаю как сделать*/
/*
// создаем объявление
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

  fragment.appendChild(generateCard(adverts[0]));
  markField.appendChild(fragment);
};

renderCard();
*/

var formAdvert = document.querySelector('.ad-form');
var formAdvertBlocks = formAdvert.children;
var formFilters = document.querySelector('.map__filters');
var formFiltersBlocks = formFilters.children;
var markMain = document.querySelector('.map__pin--main');
var blockAdress = formAdvert.querySelector('#address');

var disableBlock = function (block) {
  block.disabled = true;
};

var enableBlock = function (block) {
  block.disabled = false;
};

var turnBlocks = function (blocks, turnFunction) {
  for (var i = 0; i < blocks.length; i++) {
    turnFunction(blocks[i]);
  }
};

var fillFieldAdress = function () {
  var addressTop = parseInt(markMain.style.top, 10) + MARK_SIZE.HEIGHT;
  var addressLeft = parseInt(markMain.style.left, 10) + MARK_SIZE.RADIUS;
  return Math.round(addressLeft) + ', ' + Math.round(addressTop);
};

turnBlocks(formAdvertBlocks, disableBlock);
turnBlocks(formFiltersBlocks, disableBlock);
blockAdress.value = fillFieldAdress();

var activePage = function () {
  map.classList.remove('map--faded');
  formAdvert.classList.remove('ad-form--disabled');
  renderMarks(createMark);
  turnBlocks(formAdvertBlocks, enableBlock);
  turnBlocks(formFiltersBlocks, enableBlock);
};

markMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER) {
    evt.preventDefault();
    blockAdress.value = fillFieldAdress();
    activePage();
  }
});

markMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    evt.preventDefault();
    activePage();
  }
});

var roomNumber = document.querySelector('#room_number');
var guestNumber = document.querySelector('#capacity');

var getRoomValidated = function () {
  if (roomNumber.value === '100') {
    roomNumber.setCustomValidity('Не предназначено для гостей');
  } else if (roomNumber.value < guestNumber.value) {
    roomNumber.setCustomValidity('Выберите больше');
  } else if (roomNumber.value > guestNumber.value) {
    roomNumber.setCustomValidity('Выберите меньше');
  } else {
    roomNumber.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', function () {
  getRoomValidated();
});

guestNumber.addEventListener('change', function () {
  getRoomValidated();
});
