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

var markSize = {
  HEIGHT: 70,
  RADIUS: 50 / 2
};

var GAP = 20;
var LOCATION_MIN_X = GAP + markSize.RADIUS;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;

var marksCount = 8;

var LEFT_MOUSE_BUTTON = 0;
var ENTER_BUTTON = 'Enter';

var map = document.querySelector('.map');
var markField = document.querySelector('.map__pins');
// map.classList.remove('map--faded');

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
var LOCATION_MAX_X = markField.clientWidth - GAP - markSize.RADIUS;
var locationX = getRandomNumber(LOCATION_MIN_X, getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X));
var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

var generateAdvert = function () {
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
      'photos': getRandomArray(PHOTOS_LIST).join(', ') // тут вопрос о правильности
    },
    'location': {
      x: locationX,
      y: locationY
    }
  };
};

// создаем массив наших объектов
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

  markElement.style.left = data.location.x + markSize.RADIUS + 'px';
  markElement.style.top = data.location.y + markSize.HEIGHT + 'px';

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
  // не понимаю как сделать

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

  fragment.appendChild(generatedCard(adverts[0]));
  markField.appendChild(fragment);
};

renderCard();
*/

var filterForms = document.querySelector('.map__filters');
filterForms.classList.add('ad-form--disabled');
/*
var filterFormElements = document.querySelectorAll('.ad-form__element');

var setDisabled = function () {
  for (var i = 0; i < filterFormElements.length; i++) {
    filterFormElements[i].setAttribute('disabled', 'disabled');
  }
};

setDisabled();

var removeDisabled = function () {
  for (var i = 0; i < filterFormElements.length; i++) {
    filterFormElements[i].removeAttribute('disabled', 'disabled');
  }
};

var adForm = document.querySelector('.ad-form');
var markMain = document.querySelector('.map__pin--main');
var adressInput = adForm.querySelector('#address');

var activePage = function () {
  adressInput.value = markMain.offsetLeft + ' ' + markMain.offsetTop;
  renderMarks();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  filterForms.classList.remove('ad-form--disabled');
  removeDisabled();
};

markMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activePage();
  }
});

markMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_BUTTON) {
    activePage();
  }
});

// валидация количества гостей и комнат

var roomNum = document.querySelector('#room_number');
var guestNum = document.querySelector('#capacity');

var getRoomValidated = function () {
  if (roomNum.value === '100') {
    roomNum.setCustomValidity('Это предложение не для гостей');
  } else if (roomNum.value < guestNum.value) {
    roomNum.setCustomValidity('Недостаточно места для выбранного количества гостей');
  } else if (roomNum.value > guestNum.value) {
    roomNum.setCustomValidity('Это предложение для большего числа гостей');
  } else {
    roomNum.setCustomValidity('');
  }
};

roomNum.addEventListener('change', function () {
  getRoomValidated();
});

guestNum.addEventListener('change', function () {
  getRoomValidated();
});*/
