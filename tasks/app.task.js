/*Elixir Task
 *copyrights to https://github.com/HRcc/laravel-elixir-angular
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');

var elixir = require('laravel-elixir');

var Task = elixir.Task;

elixir.extend('app', function(src, output, outputFilename) {

    var baseDir = src || elixir.config.assetsPath + '/angular/';

    new Task('angular in ' + baseDir, function() {
        // Main file has to be included first.
        return gulp.src([baseDir + "main.js", baseDir + "**/*.js"])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            //.pipe(jshint.reporter('fail')).on('error', onError) //enable this if you want to force jshint to validate
            .pipe(gulpif(! config.production, sourcemaps.init()))
            .pipe(concat(outputFilename || 'app.js'))
            .pipe(ngAnnotate())
            .pipe(gulpif(config.production, uglify()))
            .pipe(gulpif(! config.production, sourcemaps.write()))
            .pipe(gulp.dest(output || config.appConfig.js.outputFolder))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Angular Compiled!',
                icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
                message: ' '
            }));
    }).watch(baseDir + '/**/*.js');

    new Task('do app sass', function() {
        return gulp.src(elixir.config.appConfig.sass.main)
            .pipe(sass())
            .pipe(rename({
                basename: "app"
            }))
            .pipe(gulp.dest(elixir.config.appConfig.css.outputFolder))
    }).watch(elixir.config.appConfig.sass.src);

    new Task('do home sass', function() {
        return gulp.src(elixir.config.appConfig.homesass.main)
            .pipe(sass())
            .pipe(rename({
                basename: "home"
            }))
            .pipe(gulp.dest(elixir.config.appConfig.css.outputFolder))
    }).watch(elixir.config.appConfig.homesass.src);

    new Task('do IE 9', function() {
        return gulp.src(elixir.config.appConfig.sass.ie)
            .pipe(sass())
            .pipe(rename({
                basename: "ie9"
            }))
            .pipe(gulp.dest(elixir.config.appConfig.css.outputFolder))
    }).watch(elixir.config.appConfig.sass.src);
});
