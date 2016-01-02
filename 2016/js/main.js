(function resize() {
  'use strict';

  var $html;
  var WIDTH = 320;
  var FONT_SIZE = 10;

  function resizeHandler() {
    var w = Math.max($(this).width() / WIDTH * FONT_SIZE, 10);
    $html.css({
      "font-size": w + 'px'
    });
  }

  $(function () {
    $html = $('html');
    $(window).on('resize', resizeHandler).trigger('resize');
  });
})();

$(function main() {
  'use strict';

  function closeEyes() {
    $eyeOpen.hide();
    $eyeClose.show();
  }

  function openEyes() {
    $eyeOpen.show();
    $eyeClose.hide();
  }

  var $saru = $('.saru');

  var $eyeOpen = $saru.find('.saru--animal-character_eyes_open');
  var $eyeClose = $saru.find('.saru--animal-character_eyes_close');

  var eventList = {
    OPENEYES: 'OPENEYES',
    CLOSEEYES: 'CLOSEEYES',
  };

  $saru.on(eventList.OPENEYES, function () {
    var delay = 500 + 5000 * Math.random();
    openEyes();
    setTimeout(function () {
      $saru.trigger(eventList.CLOSEEYES);
    }, delay);
  });

  $saru.on(eventList.CLOSEEYES, function () {
    var delay = 50 + 100 * Math.random();
    closeEyes();
    setTimeout(function () {
      $saru.trigger(eventList.OPENEYES);
    }, delay);
  });

  $saru.trigger(eventList.OPENEYES);
});
