var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
];

gulp.task('coffee', function() {
    gulp.src(coffeeSources) //Location of original source files you are going to process.
        .pipe(coffee({ bare: true }) //pipe the file to the coffee object with options
            .on('error', gutil.log)) //log any errors so that execution doesn't stop
        .pipe(gulp.dest('components/scripts')); //location of output file.
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'));
});