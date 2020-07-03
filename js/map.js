'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER = 'Enter';

  var map = document.querySelector('.map');
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
    var addressTop = parseInt(markMain.style.top, 10) + window.data.MARK_SIZE.HEIGHT;
    var addressLeft = parseInt(markMain.style.left, 10) + window.data.MARK_SIZE.RADIUS;
    return Math.round(addressLeft) + ', ' + Math.round(addressTop);
  };

  turnBlocks(formAdvertBlocks, disableBlock);
  turnBlocks(formFiltersBlocks, disableBlock);
  blockAdress.value = fillFieldAdress();

  var activePage = function () {
    map.classList.remove('map--faded');
    formAdvert.classList.remove('ad-form--disabled');
    window.mark.renderMarks(window.mark.createMark);
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
})();
