var gulp = require('gulp'),
    sass = require('gulp-sass'),
     header = require('gulp-header'),
     cleanCSS = require('gulp-clean-css'),
     rename = require("gulp-rename"),
     uglify = require('gulp-uglify'),
     pkg = require('./package.json'),
     concat = require('gulp-concat'),
     browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Cargador de Dependencias Js
  gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap/dist/**/bootstrap.bundle.min.js',
      './node_modules/jquery.easing/jquery.easing.min.js', 
      './node_modules/scrollreveal/dist/scrollreveal.min.js' ,
      './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js' ,
      './node_modules/angular/angular.min.js',
      
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./vendor/js'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/css/*'
    ])
    .pipe(gulp.dest('./vendor/font-awesome/css'))

    gulp.src([
      './node_modules/font-awesome/fonts/*',
    ])
    .pipe(gulp.dest('./vendor/font-awesome/fonts'))

  // Cargador de Dependencias CSS
  gulp.src([
    './node_modules/bootstrap/dist/**/bootstrap.min.css',
    './node_modules/magnific-popup/dist/magnific-popup.css' ,
  ])
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./vendor/css'))


  // Magnific Popup
  gulp.src([
     
    ])
    .pipe(gulp.dest('./vendor/magnific-popup'))


});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
