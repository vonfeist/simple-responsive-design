var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect-php'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync');

var output = './public/css';
var autoprefixerOptions = {
    browsers: ['last 2 versions']
};
gulp.task('styles', function () {
    return sass('sass/styles.scss', {style: 'compressed', sourcemap: true})
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('connect-sync', function () {
    connect.server({
        root: 'public',
    }, function () {
        browserSync({
            proxy: '127.0.0.1:8000/public/index.html'
        });
    });
});

gulp.task('watch', function () {
    gulp.watch("sass/**", ['styles']);
    gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'connect-sync'], function () {
    gulp.start('watch');
});