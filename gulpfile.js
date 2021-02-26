const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cache = require('gulp-cache');

const paths = {
	imagenes: 'src/img/**/*',
	scss: 'src/scss/**/*.scss',
	javascript: 'src/js/**/*.js',
};

function css() {
	return src(paths.scss)
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(dest('./build/css'));
}

function javascript() {
	return src(paths.javascript).pipe(concat('bundle.js')).pipe(dest('./build/js'));
}

function imagenes() {
	return src(paths.imagenes)
		.pipe(cache(imagemin({ optimizationLevel: 5 })))
		.pipe(dest('build/img'))
		.pipe(notify({ message: 'Imagen Completada' }));
}

function watchArchivos() {
	watch(paths.scss, css);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = parallel(css, javascript, imagenes, watchArchivos);
