var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');

var coffeeSources = ['components/coffee/tagline.coffee'];

gulp.task('coffee', function() {
    gulp.src(coffeeSources[0]) //Location of original source files you are going to process.
        .pipe(coffee({ bare: true }) //pipe the file to the coffee object with options
            .on('error', gutil.log)) //log any errors so that execution doesn't stop
        .pipe(gulp.dest('components/scripts')); //location of output file.
});