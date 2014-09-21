var gulp = require('gulp')
var eol = require('gulp-eol')

gulp.task('eol', function(){
  gulp.src([
    'LICENSE',
    '.git*',
    '**/*.md',
    '**/*.js',
    '!node_modules/'
    ])
    .pipe(eol('\n'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['eol'])
