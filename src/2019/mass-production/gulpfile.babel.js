'use strict';

// import
import gulp from 'gulp';
import pug from 'gulp-pug';
import massProduction from 'gulp-mass-production';
import readConfig from 'read-config';
import path from "path";

const DIST = '../dist/share';

const { sheet } = readConfig('../src/data/ioshishi-slot.json');
const constants = readConfig('../src/assets/constants.json');

constants.BASE_URL = path.join(constants.SITE_ORIGIN, constants.BASE_PATH)

const fileObj = {};

for (let i = 1; i < 32; i++) {
  const item = sheet[i];
  fileObj[item.friendly_id] = item;
}

gulp.task('html', () => {
  gulp.src('*.pug')
    .pipe(massProduction({
      postParams: fileObj,
      template: `_share.pug`,
      locals: constants,
    }))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(DIST));
});

gulp.task('build', gulp.series('html'));
gulp.task('default', gulp.series('build'));
