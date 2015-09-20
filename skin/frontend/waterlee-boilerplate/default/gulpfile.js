var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    rimraf = require('gulp-rimraf'),
    browserSync = require('browser-sync'),    
    env = process.env.NODE_ENV || 'development';

// SASS tasks
gulp.task('sass', function() {
    return gulp.src('src/scss/styles.scss')
        .pipe(gulpif(env === 'development', sourcemaps.init()))
        .pipe(gulpif(env === 'development', sass.sync().on('error', sass.logError)))
        .pipe(gulpif(env === 'development', sourcemaps.write()))
        .pipe(gulpif(env === 'production', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'production', minifycss()))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'))
        .pipe(notify('Successfully compiled SASS'));
});

// JS tasks
gulp.task('js', function() {
    return gulp.src([
            'bower_components/foundation/js/vendor/modernizr.js',
            'bower_components/foundation/js/foundation/foundation.js',
            'bower_components/foundation/js/foundation/foundation.dropdown.js',
            'src/js/foundation.equalizer.js',
            'bower_components/foundation/js/foundation/foundation.offcanvas.js',
            'bower_components/foundation/js/foundation/foundation.orbit.js',
            'bower_components/foundation/js/foundation/foundation.topbar.js',
            'src/js/elevatezoom/jquery.elevatezoom.js',
            'bower_components/dw-bxslider-4/src/js/jquery.bxslider.js'
        ])
        .pipe(gulpif(env === 'development', sourcemaps.init()))
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(concat('script.js'))
        .pipe(gulpif(env === 'development', sourcemaps.write()))
        .pipe(gulp.dest('js'))
        .pipe(notify('Successfully compiled JS'));
});

// Clean
gulp.task('clean', function() {
  return gulp
    .src(['css', 'js'], {read: false})
    .pipe(rimraf());
});

// BrowserSync
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost/waterlee/",
        port: 8080
    });
});

// Watch
gulp.task('watch', function() {
   
        // Watch .scss files
        gulp.watch('src/scss/**/*.scss', ['sass']);      

        // Watch .js files
        gulp.watch('src/js/**/*.js', ['js', browserSync.reload]); 
    
});

// Default task
gulp.task('default', ['sass', 'js', 'watch', 'browser-sync'], function() {

});