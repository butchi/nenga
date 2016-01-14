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
