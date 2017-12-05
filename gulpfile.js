var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),	
	gutil = require('gulp-util'),
	concat = require('gulp-concat');

	// paths to assets
var paths = {
    styles: [
        'app/assets/styles/vendor/**/*.css',
        'app/assets/styles/**/*.css',
        'app/assets/styles/**/*.sass'
    ],
    js: [
        'app/assets/scripts/vendor/**/*.js',
        'app/assets/scripts/**/*.js'
    ],
    images: [
        'app/assets/images/**/*'
    ],
    fonts: [
        'app/assets/fonts/**/*'
    ],
	outputDir = 'assets'
};

