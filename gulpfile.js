'use strict';
 
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
    cache          = require('gulp-cache'),
    del            = require('del');

// localhost and autoreaload
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build' // Путь к папке в которой запускается browser-sync
		},
		notify: false,
	});
});

// Конвертация SCSS в CSS
gulp.task('sass', function() {
	return gulp.src('source/sass/**/*.scss') // Путь к файлам SCSS
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 2 versions'])) // Автопрефиксер
	.pipe(gulp.dest('build/css/')) // Куда класть стандартный файл CSS
	.pipe(rename({suffix: '.min', prefix : ''})) // Добавляем префикс к файлу
	.pipe(cleanCSS()) // Минифицируем файл
	.pipe(gulp.dest('build/css/')) // Куда класть минифицированный файл CSS
	.pipe(browserSync.reload({stream: true})); // Обновляем страницу
});

// Обработка изображений
gulp.task('img', function() {
  return gulp.src('source/img/**/*') // Путь к папке с изображениями
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('build/img')); // Куда кладем обработанные изображения
});

// Объединяем библиотеки к основному .js-файлу
gulp.task('concat', function(cb) {
	return gulp.src([
		'source/libs/jquery/jquery-3.4.1.min.js',
		'source/js/script.js' // Всегда в конце
		])
	.pipe(concat('script.min.js')) // Название собраного .js-файла
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({stream: true}));
	cb();
});

// Очистка папки сборки
gulp.task('clean', function () {
	return del ('build'); // Удаляем всю папку со сборкой
});

// Перенос всех нужных файлов в папку сборки
gulp.task('copy', function() {
	return gulp.src([
		'source/fonts/**/*.{woff,woff2}' // Все файлы шрифтов
    ], {
		base: 'source' // Указываем исходную папку, для того чтобы весь путь к файлу не затерся
    })
    .pipe(gulp.dest('build'));
});

// Обновление html-файлов
gulp.task('html', function() {
	return gulp.src('source/*.html') // Берем все html файлы в папке исходников
	.pipe(gulp.dest('build')) // Кладем их в папку со сборкой
});

// Обновление js-файлов
gulp.task('js', function() {
	return gulp.src('source/js/*.js') // Берем все js файлы в папке исходников
	.pipe(uglify()) // Минифицируем
	.pipe(gulp.dest('build/js/')) // Кладем их в папку со сборкой
	.pipe(browserSync.reload({stream: true})); // Обновляем страницу
});

// Отслеживаем за изменениями
gulp.task('watch', function(cb) {
	gulp.parallel(

		'browser-sync'
	)(cb);
	gulp.watch('source/sass/**/*.scss', gulp.series('sass')); // При сохранении любого .scss файла выполнить таск 'sass'
	gulp.watch(['source/libs/**/*.js', 'source/js/script.js'], gulp.series('js')); // При сохранении любого .js файла выполнить таск 'js'
	gulp.watch('source/**/*.html', gulp.series('html')); // При сохранении любого .html файла выполнить таск 'html'
	gulp.watch('source/*.html').on('change', browserSync.reload); // При изменении любого .html файла обновить страницу
});

// Сборка проекта
gulp.task('build', gulp.series(
	'clean', // Очищаем папку сборки
	'img', // Обработка изображении и помещение их в папку сборки
	'copy', // Копируем файлы ненуждаюзиеся в обработке
	'sass', // Конвертируем SCSS в CSS и помещаем их в папку сборки
	'js', // Минифицируем все js файлы и помещаем их в папку сборки
	'html', // Перемещаем файлы HTML в папку сборки
	function(cb) {
    cb();
}));

gulp.task('default', gulp.series('build', 'watch'));