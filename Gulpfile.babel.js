import gulp from "gulp";

const browserSync = require("browser-sync").create();

const plugins = require("gulp-load-plugins")({
  DEBUG: true,
  scope: ["devDependencies"],
});

const config = {
  src: "src",
  dest: "dist",
  port: 9000,
};

gulp.task("sass", () => (
  gulp.src(`${config.src}/{,!_}*.scss`)
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream())
    .pipe(plugins.count("sass: <%= files %> compiled"))
));

gulp.task("jade", () => (
  gulp.src(`${config.src}/*.jade`)
    .pipe(plugins.data({}))
    .pipe(plugins.jade({ pretty: true }))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.count("jade: <%= files %> compiled"))
));

gulp.task("serve", ["jade", "sass"], () => {
  browserSync.init({
    server: `./${config.dest}`,
  });

  gulp.watch(`${config.src}/*.scss`, ["sass"]);
  gulp.watch(`${config.src}/*.jade`, ["jade"]);
  gulp.watch(`${config.dest}/*.html`).on("change", browserSync.reload);
});

gulp.task("deploy", () => (
  gulp.src(`${config.dest}/*.*`)
    .pipe(plugins.ghPages())
));

gulp.task("default", ["serve"]);
