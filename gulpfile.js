var browserSync   = require('browser-sync').create();
var gulp          = require('gulp');
var pug           = require('gulp-pug');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var base64        = require('gulp-base64');
var prefix        = require('gulp-autoprefixer');
var rename        = require('gulp-rename');

var onError = function(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    ui: false,
    ghostMode: false,
    server: "dist",
    reloadDelay: 500
  });

  gulp.watch("dist/**/*.html").on("change", browserSync.reload)
});

gulp.task('pug', function () {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: "  "
    }))
    .on('error', onError)
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
  return gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
      './src/js/kapla.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
		.pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(base64({
        extensions: ['svg'],
        maxImageSize: false
      }))
    .pipe(prefix({
      browsers: ['Safari 7', 'last 2 versions']
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('build', ['pug', 'scripts', 'sass']);

gulp.task('default', ['pug', 'sass', 'scripts', 'browser-sync'], function () {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.pug', ['pug']);
});
