const gulp = require('gulp');
const template = require('gulp-template');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const concat = require('gulp-concat');

gulp.task('json', () =>
  gulp.src('src/translator.json')
  .pipe(template())
  .pipe(gulp.dest('dist'))
);

gulp.task('concat', ['json'], () =>
  gulp.src(['./dist/translator.json', './src/translator.js'])
  .pipe(concat('Voyant.js'))
  .pipe(gulp.dest('./dist'))
);

gulp.task('test', () =>
  gulp.src('./test/runner.html')
  .pipe(mochaPhantomJS())
);

gulp.task('default', ['concat']);
