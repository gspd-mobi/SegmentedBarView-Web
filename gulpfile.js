var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('minify', function(){
    gulp.src(['./src/core.js','./src/svg.js','./src/bar.js'])
        .pipe(concat('segmentedbar.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('segmentedbar.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(){
    gulp.run('minify');

    gulp.watch("./src/*.js", function(event){
        gulp.run('minify');
    });
});