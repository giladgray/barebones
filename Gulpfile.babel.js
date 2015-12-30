import gulp from "gulp";
const browserSync = require("browser-sync").create();
const plugins = require("gulp-load-plugins")({
  scope: ["devDependencies"],
});

const config = {
  src: "src",
  dest: "dist",
  port: 9000,
};
const srcGlob = (files) => (`${config.src}/${files}`);

gulp.task("jade", () => (
  gulp.src(srcGlob("*.jade"))
    .pipe(plugins.data({}))
    .pipe(plugins.jade({ pretty: true }))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.count("jade: <%= files %> compiled"))
));

gulp.task("js", () => (
  gulp.src(srcGlob("*.js"))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.count("js: <%= files %> copied"))
));

gulp.task("sass", () => (
  gulp.src(srcGlob("{,!_}*.scss"))
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream())
    .pipe(plugins.count("sass: <%= files %> compiled"))
));

gulp.task("serve", ["js", "jade", "sass"], () => {
  browserSync.init({
    server: `./${config.dest}`,
  });

  gulp.watch(`${config.dest}/*.html`).on("change", browserSync.reload);
  gulp.watch(srcGlob("*.jade"), ["jade"]);
  gulp.watch(srcGlob("*.js"), ["js"]);
  gulp.watch(srcGlob("*.scss"), ["sass"]);
});

gulp.task("deploy", () => (
  gulp.src(`${config.dest}/*.*`)
    .pipe(plugins.ghPages())
));

gulp.task("default", ["serve"]);
