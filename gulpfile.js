'use strict';
 
// var gulp = require('gulp');
// var sass = require('gulp-sass');
 
// sass.compiler = require('node-sass');
 
// gulp.task('sass', function () {
//   return gulp.src('app/sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('app/css/'));
// });
 
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
var 	
	gulp           = require('gulp'),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	autoprefixer   = require('gulp-autoprefixer'),
	notify         = require("gulp-notify"),
	imagemin       = require('gulp-imagemin'), 
    pngquant       = require('imagemin-pngquant'), 
    cache          = require('gulp-cache');

// localhost and autoreaload
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('js', function(cb) {
	return gulp.src([
		'app/libs/jquery/jquery-3.4.1.min.js',
		'app/js/script.js' // always in the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
	cb();
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 2 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function(cb) {
	gulp.parallel(
		'sass', 
		'js',
		'browser-sync'
	)(cb);
	gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
	gulp.watch(['app/libs/**/*.js', 'app/js/main.js'], gulp.series('js'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({ 
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function () {  //clear cache
    return cache.clearAll();
});

gulp.task('build', gulp.series('clear', 'img', function(cb) {
    var buildCss = gulp.src([
        'app/css/main.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src([
        'app/js/scripts.min.js'
        ]) 
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
    cb();
}));

gulp.task('default', gulp.series('watch'));