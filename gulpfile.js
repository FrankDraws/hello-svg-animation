/* 
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dist - Points to the folder to output
    gulp.watch - Watch files and folders for changes
    gulp.aws - Upload files to S3 bucket

*/

const gulp = require('gulp');
const minifycss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;


// Copy all HTML files
gulp.task('copyHTML' , async function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Minify CSS
gulp.task('minifycss' , async function(){
    gulp.src('src/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

// Minify Images
gulp.task('imgminify', async function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// Watch and Browser Sync
gulp.task('watch', function() {
    browserSync.init({
        injectChanges: true,
        proxy: "http://0.0.0.0:8000/dist/",
        // browser: "firefox",
        ghostMode: {
            clicks: false,
            scroll: false
        }
        
    });
    
    gulp.watch('src/css/*.css', gulp.series('minifycss'));
    gulp.watch('src/*.html',    gulp.series('copyHTML'));
    gulp.watch('src/images/*',  gulp.series('imgminify'));

    gulp.watch("dist/**/**").on("change", reload);
});

gulp.task('default', gulp.parallel('watch'));