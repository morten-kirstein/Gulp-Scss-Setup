'use strict';

/**
 * 1: DEPENDENCIES 
 */

 var  gulp = require('gulp'),                         // Gulp Core
      sass = require('gulp-sass'),                    // Sass Compiler
      sourcemaps = require('gulp-sourcemaps'),        // Generate Sourcemaps               
      bourbon = require('node-bourbon'),              // Sass Mixin
      rename = require('gulp-rename'),                // rename files
      notify = require('gulp-notify'),                // Send notifications to OSX
      concat = require('gulp-concat'),                // Concatting Files
      plumber = require('gulp-plumber'),              // Disable Interrupts
      minifycss = require('gulp-minify-css'),         // Minifying css
      browserSync = require('browser-sync'),          // Sync stylesheets and devices 
      autoPrefixer = require('gulp-autoprefixer');    // Prefix stylesheet



/**
 * 2: TARGETS 
 */

 var target = {
    scss_src : 'app/sass/**/*.scss',
    css_dest : 'app/css/'
 };


 
 /**
 * 3: SASS TASK
 */

 bourbon.includePaths;

 var  SassOptions = {
        sourcemap: true,
        style: "compact",
        includePaths: require('node-bourbon').includePaths
      };

gulp.task('sass', function() {
    gulp.src(target.scss_src)                       //  Get the files
      .pipe(plumber())                              //  Make sure gulp continues on errors
      .pipe(sourcemaps.init())                      //  Sourcemap
      .pipe(sass(SassOptions))                      //  Compile all sass
      .pipe(minifycss())                            //  Minifycss
      .pipe(sourcemaps.write())                     //  Add Source File                       
      .pipe(gulp.dest(target.css_dest))             //  Where to put files
      .pipe(notify({message: 'SCSS Processed'}));   //  Notify on process done
});


 /**
 * 4: BROWSER SYNC
 */

gulp.task('browser-sync', function() {
    browserSync.init(['app/css/*.css'],{
        proxy: "yourlocal.dev"  

    });
});


 /**
 * 5: WATCHES
 */

 gulp.task('default', function() {
     gulp.run('sass', 'browser-sync');
     gulp.watch('app/sass/**/*.scss', function(){
        gulp.run('sass');
     });
 });
