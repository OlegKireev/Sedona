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
			baseDir: 'build' // Путь к папке которую отслеживать на изменения
		},
		notify: false,
	});
});

// Собираем все js файлы в один
gulp.task('js', function(cb) {
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

// Отслеживаем за изменениями
gulp.task('watch', function(cb) {
	gulp.parallel(
		'sass', 
		'js',
		'browser-sync'
	)(cb);
	gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
	gulp.watch(['source/libs/**/*.js', 'source/js/main.js'], gulp.series('js'));
	gulp.watch('source/*.html').on('change', browserSync.reload);
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

// My tasks

// Очистка папки сборки
gulp.task('clean', function () {
    return del ('build'); // Путь к папке со сборкой
});

// Перенос всех нужных файлов в папку сборки
gulp.task('copy', function() {
    return gulp.src([
        'source/fonts/**/*.{woff,woff2}', // Все файлы шрифтов
		'source/js/**'
    ], {
        base: 'source'
    })
    .pipe(gulp.dest('build'));
});


//clear cache
// gulp.task('clear', function () {
//     return cache.clearAll();
// });

// build2
gulp.task('build2', gulp.series('clean', 'img', 'copy', 'sass', function(cb) {
    
    var buildHtml = gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
    cb();
}));


// Сборка проекта
// gulp.task('build', gulp.series('clear', 'img', function(cb) {
//     var buildCss = gulp.src([
//         'source/css/main.min.css'
//         ])
//     .pipe(gulp.dest('build/css'))

//     var buildFonts = gulp.src('source/fonts/**/*.{woff,woff2}') // Папка с исходниками
//     .pipe(gulp.dest('build/fonts')) // Папка со сборкой

//     var buildJs = gulp.src([ //
//         'source/js/scripts.min.js'
//         ]) 
//     .pipe(gulp.dest('build/js'))

//     var buildHtml = gulp.src('source/*.html')
//     .pipe(gulp.dest('build'));
//     cb();
// }));

gulp.task('default', gulp.series('watch'));