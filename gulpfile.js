var elixir = require('laravel-elixir');
require('./tasks/app.task.js');
require('./tasks/bower.task.js');
require('laravel-elixir-livereload');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
 mix
     .bower()
     .app('./angular/')
     .copy('./angular/app/**/*.html', 'public/views/app/app/')
     .copy('./angular/directives/**/*.html', 'public/views/app/directives/')
     .copy('./angular/dialogs/**/*.html', 'public/views/app/dialogs/')
     .livereload([
      'public/js/app/vendor.js',
      'public/js/app/app.js',
      'public/css/app/vendor.css',
      'public/css/app.app.css',
      'public/views/app/**/*.html'
     ], {liveCSS: true})
});