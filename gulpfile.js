'use strict';

var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('live-server', function () {
    var server = new LiveServer('./app.js');
    server.start();
});

gulp.task('bundle', ['copy'], function () {
    return browserify({
        entries: 'views/main.jsx',
        debug: true
    })
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./.temp'));
});

gulp.task('copy', function () {
    gulp.src(['./public/stylesheets/*.css', './bower_components/skeleton/css/*.css'])
        .pipe(gulp.dest('./.temp'));
});

gulp.task('serve', ['bundle', 'live-server'], function () {
    browserSync.init({
        proxy: 'http://localhost:3000',
        port: 9001
    });
});

