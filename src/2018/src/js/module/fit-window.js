import ns from './ns';

'use strict';

const $html = $('html');
const WIDTH = 375;
const FONT_SIZE = 100;

const resizeHandler = (evt) => {
  const w = Math.max($(evt.target).width() / WIDTH * FONT_SIZE, 10);

  if (ns.isSp) {
    $html.css({
      "font-size": w + 'px',
    });
  } else {
    $html.css({
      "font-size": '',
    });
  }
}

$(window).on('resize', resizeHandler).trigger('resize');
