'use strict';

(function () {
  var markTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createMark = function (data) {
    var markElement = markTemplate.cloneNode(true);
    var markImg = markElement.querySelector('img');

    markElement.style.left = data.location.x + window.data.MARK_SIZE.RADIUS + 'px';
    markElement.style.top = data.location.y + window.data.MARK_SIZE.HEIGHT + 'px';

    markImg.src = data.author.avatar;
    markImg.alt = data.offer.title;

    return markElement;
  };

  var renderMarks = function () {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.data.adverts.length; j++) {
      fragment.appendChild(createMark(window.data.adverts[j]));
    }

    window.data.markField.appendChild(fragment);
  };

  window.mark = {
    createMark: createMark,
    renderMarks: renderMarks
  };
})();
