var gulp = require('gulp');
var notifier = require('node-notifier');
var $ = require('gulp-load-plugins')();

var sass = require('gulp-sass');
var util = require('gulp-util');
var csso = require('gulp-csso');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');

var paths = {
    scripts: __dirname + '/../swagsite/themes/appsforghent/assets/js',
    styles: __dirname + '/../swagsite/themes/appsforghent/assets/css'
};

gulp.task('serve', ['build'], function() {
    gulp.watch(
        [__dirname + '/css/*.scss', __dirname + '/dev/css/_*.scss'],
        {debounceDelay: 400},
        ['sass']
        );
    gulp.watch(
        [__dirname + '/js/*.js'],
        {debounceDelay: 400},
        ['js']
        );
});

// Jobs
var defaultJobs = ['sass', 'js'];
gulp.task('default', defaultJobs);
gulp.task('build', defaultJobs);

gulp.task('sass', function() {
    return gulp.src(__dirname + '/css/*.scss')
    .on('error', standardHandler)
    .pipe(
        sass( {
            includePaths: ['scss'],
            errLogToConsole: true
        } ) )
    .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2'))
    .pipe( csso() )
    .pipe( minifyCSS() )
    .pipe( gulp.dest(paths.styles) );
});

gulp.task('js', function() {
    return gulp.src([__dirname + '/js/*.js'])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .on('error', standardHandler)
    .pipe(gulp.dest(paths.scripts))
});

function standardHandler(err){
    notifier.notify({ title:"Gulp crashed!", message: 'Something went wrong. Check your console.' });
    util.log(util.colors.red('Error'), err.message);
}
