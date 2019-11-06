const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const rename = require('gulp-rename');

// create readable css from scss files
function sassTask() {
    return src(['src/**/*.scss', 'src/**/*.css', '!src/**/_*.scss', '!src/var.scss'])
        .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest('dist/'))
}
// create minified scss files
function sassMinTask() {
    return src(['src/**/*.scss', 'src/**/*.css', '!src/**/_*.scss', '!src/var.scss'])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function (path) {
            path.basename += ".min";
            return path;
        }))
        .pipe(dest('dist/'))
}
// delete dist folder
function cleanTask() {
    return del(['dist']);
}

// start development watch scss change
exports.default = exports.dev = series(sassTask, function () {
    watch('src/**/*.scss', sassTask)
})
exports.clean = cleanTask;
exports.build = series(cleanTask, sassTask, sassMinTask)
