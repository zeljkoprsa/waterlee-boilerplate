var gulp = require('gulp');

var sass      = require('gulp-sass');
var minifycss = require('gulp-minify-css');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var notify     = require('gulp-notify');
var clean      = require('gulp-clean');
var livereload = require('gulp-livereload');
var lr         = require('tiny-lr');
var server     = lr();

gulp.task('sass', function() {
    return gulp.src('scss/styles.scss')
        .pipe(sass({errLogToConsole: true}))
        //.pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(livereload(server))
        .pipe(notify({
            message: 'Successfully compiled SASS'
        }));
});

gulp.task('js', function() {
    return gulp.src([
            'bower_components/modernizr/modernizr.js',
            'bower_components/foundation/js/foundation/foundation.js',
            'bower_components/foundation/js/foundation/foundation.dropdown.js',
            'bower_components/foundation/js/foundation/foundation.equalizer.js',
            'bower_components/foundation/js/foundation/foundation.offcanvas.js',
            'bower_components/foundation/js/foundation/foundation.orbit.js',
            'bower_components/foundation/js/foundation/foundation.topbar.js',
            'js/easyResponsiveTabs.js',
            'js/elevatezoom/jquery.elevatezoom.js',
        ])
        .pipe(concat('script.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload(server))
        .pipe(notify({
            message: 'Successfully compiled JS'
        }));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['css/styles.css', 'dist/js/script.js'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'js');
});

// Watch
gulp.task('watch', function() {
    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err);
        }

        // Watch .scss files
        gulp.watch('scss/**/*.scss', ['sass']);      

	// Watch .js files
        gulp.watch('js/**/*.js', ['js']); 
    });
});