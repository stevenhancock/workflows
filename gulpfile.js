var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
];
var sassSources = ['components/sass/style.scss'];//style.scss uses sass import to import the other sass files.
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

gulp.task('coffee', function() {
    gulp.src(coffeeSources) //Location of original source files you are going to process.
        .pipe(coffee({ bare: true }) //pipe the file to the coffee object with options
            .on('error', gutil.log)) //log any errors so that execution doesn't stop
        .pipe(gulp.dest('components/scripts')); //location of output file.
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload());
});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(htmlSources)
    .pipe(connect.reload());
});

gulp.task('json', function() {
    gulp.src(jsonSources)
    .pipe(connect.reload());
});

gulp.task('all', ['html', 'json', 'coffee', 'js', 'connect', 'compass', 'watch']); //Executes all three. If you name this task default, it will run when you enter gulp and you don't have to enter gulp all. You can add watch to this as well, then it will run all of them and then start watch.