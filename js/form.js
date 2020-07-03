'use strict';

(function () {
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

  roomNumber.addEventListener('change', getRoomValidated);

  guestNumber.addEventListener('change', getRoomValidated);
}());
