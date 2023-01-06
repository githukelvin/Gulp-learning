import gulp from "gulp";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
const sass = gulpSass(nodeSass);
import concat from "gulp-concat";
// const sass = require("gulp-sass")(require("sass"));
/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - points to folder output
    gulp.watch - Watch files and folders for changes


*/

// An example of gulp task that logs Message

gulp.task("message",async function() {
  return console.log("Files compiled successfully");
  
});

// Copy all HTML files

gulp.task("copy", done=> {
  gulp.src("src/*.html")
  .pipe(gulp.dest("dist"));
  done();
});
// Optimize images
gulp.task("image",  async function() {
  gulp.src("src/images/**/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));
});
// Minify JS

// gulp.task("js", async function() {
//     gulp.src("src/js/*.js")
//     .pipe(gulp.dest("dist/js"));
// });
// Compile Sass
gulp.task("sass", async function() {
    gulp.src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// Scripts Concatenation
gulp.task("scripts", async function() {
    gulp
      .src("src/js/*.js")
      .pipe(concat("main.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"));
});

// Watch Files For Changes

gulp.task("watch", async function () {
  gulp.watch("src/sass/*.scss", gulp.series("sass"));
  gulp.watch("src/js/*.js", gulp.series("scripts"));
  gulp.watch("src/*.html", gulp.series("copy"));
});

// Default

gulp.task(
  "default",
  gulp.series("copy", "image", "sass", "scripts", "message", "watch")
);



