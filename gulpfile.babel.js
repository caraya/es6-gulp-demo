/*jshint esversion: 6*/
/*jshint -W097*/
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins({lazy: true})';

// Imports required for sw-precache
import path from 'path';
import swPrecache from 'sw-precache';

// Aliases $ to the gulp-load-plugins entry point
// so that $.function will work
const $ = gulpLoadPlugins();

const paths = {
  src: 'app/',
  dest: 'dest/'
};

// const sassPaths = {
//   src: `${paths.src}/app.scss`,
//   dest: `${paths.dest}/styles/`
// };
//
// gulp.task('styles', () => {
//   return gulp.src(paths.src)
//     .pipe(sourcemaps.init())
//     .pipe(sass.sync().on('error', $.sass.logError))
//     .pipe(autoprefixer())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(paths.dest));
// });

gulp.task('generate-service-worker', (callback) => {
  swPrecache.write(path.join(paths.src, 'service-worker.js'), {
    staticFileGlobs: [paths.src + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: paths.src
  }, callback);
});
