'use strict';

(function () {

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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray
  };
})();
