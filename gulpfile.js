/**
 * Created by chotoxautinh on 1/1/17.
 */
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var cond = require('gulp-cond');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

function bundle(filename) {
    process.env.NODE_ENV = require('./config').env || 'development';
    let product = process.env.NODE_ENV === 'production';
    return browserify(filename, {debug: !product})
        .transform(babelify, {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: [
                "transform-object-rest-spread",
                'transform-runtime'
            ],
            sourceMaps: !product
        })
        .bundle()
        .on('error', function (err) {
            console.error(err.message);
            console.error(err.codeFrame);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cond(product, uglify())) // now gulp-uglify works
        .pipe(gulp.dest('dist/'));
}

gulp.task('bundle', function () {
    return bundle('src/index.js');
});

gulp.task('default', ['bundle']);