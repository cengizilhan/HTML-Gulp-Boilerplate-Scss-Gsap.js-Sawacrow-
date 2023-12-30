const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const minifyjs = require('gulp-minify');


const paths = {
    scripts: {
        src: './',
        dest: './dist/',
        assets: './dist/assets/',
        js: './dist/assets/js/'
    }
};

// Reload Server
function reload(done) {
    browserSync.reload();
    done();
}

// Sass compiler
function compileSass() {
    console.warn('Compiling Sass...');
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
}

// Copy assets after build
function copyAssets() {
    return gulp.src(['assets/**/*'])
        .pipe(gulp.dest(paths.scripts.assets));
}

function jsMinify() {
    return gulp.src(['assets/js/*'])
        .pipe(minifyjs())
        .pipe(gulp.dest(paths.scripts.js));
}

// Build files html and reload server
function buildAndReload() {
    return gulp.series(includeHTML, copyAssets, jsMinify, reload);
}

function buildForPages() {
    return gulp.series(includeHTML, copyAssets, jsMinify);
}

function includeHTML() {
    return gulp.src(['*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

exports.includeHTML = includeHTML;

exports.default = function () {
    // Init serve files from the build folder
    browserSync.init({
        server: {
            baseDir: paths.scripts.dest
        }
    });
    // Build and reload at the first time
    gulp.series(buildAndReload())();

    // Watch Sass task
    gulp.watch('./sass/**/*.scss', compileSass);

    // Watch task
    gulp.watch(["*.html", "assets/**/*","./partials/*"], buildAndReload());
};
