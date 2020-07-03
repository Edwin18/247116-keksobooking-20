'use strict';

(function () {
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

  var markField = document.querySelector('.map__pins');

  // создаем объявление - объект с описанием жилья
  var generateAdvert = function () {
    var LOCATION_MAX_X = markField.clientWidth - GAP - MARK_SIZE.RADIUS;
    var locationX = window.utils.getRandomNumber(LOCATION_MIN_X, window.utils.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X));
    var locationY = window.utils.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    return {
      'author': {
        'avatar': window.utils.getRandomElement(AVATAR_LIST)
      },
      'offer': {
        'title': window.utils.getRandomElement(TITLE_LIST),
        'address': window.utils.getRandomNumber(GAP, document.querySelector('.map__pins').offsetWidth - GAP) + ', ' + locationY,
        'price': window.utils.getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': window.utils.getRandomElement(HOUSING_LIST),
        'rooms': window.utils.getRandomNumber(1, 100),
        'guests': window.utils.getRandomNumber(1, 100),
        'checkin': window.utils.getRandomElement(TIME_LIST),
        'checkout': window.utils.getRandomElement(TIME_LIST),
        'features': window.utils.getRandomArray(FEATURES_LIST).join(', '),
        'description': window.utils.getRandomElement(DESCRIPTION_LIST),
        'photos': window.utils.getRandomArray(PHOTOS_LIST)// тут должен быть массив случайной длxcv
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

  var adverts = generateAdverts();

  window.data = {
    MARK_SIZE: MARK_SIZE,
    markField: markField,
    adverts: adverts
  };
})();
