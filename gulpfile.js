const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

const scripts = require('./scripts');
const styles = require('./styles');
var sass = require('gulp-sass');

var devMode = false;

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './dist',
};
gulp.task('css', function() {
    gulp.src(styles)
        .pipe(sass({includePaths: [config.bootstrapDir + '/assets/stylesheets'],}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('html', function() {
    gulp.src('./src/templates/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('build', function() {
    gulp.start(['fonts','css','js','html'])
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('start', function() {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/templates/**/*.html'], ['html']);
});


