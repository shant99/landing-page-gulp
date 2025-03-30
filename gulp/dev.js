const { src, dest, series, parallel, watch } = require("gulp");
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));
const inject = require("gulp-inject");
const concat = require("gulp-concat");
const fsExtra = require("fs-extra");
const fs = require("fs");
const gulpClean = require("gulp-clean");
const sourceMaps = require("gulp-sourcemaps");
const gulpPlumber = require("gulp-plumber");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const yargs = require("yargs");
const argv = yargs.argv;
const { paths } = require("./paths.js");
const { plumberNotify } = require("./utils.js");

const isProduction = argv.prod || argv.production;

function watchFiles(cb) {
	watch([paths.html.watch, paths.components], html);
	watch(paths.css.watch, styles);
	watch(paths.assets.images.watch, images);
	watch(paths.scripts.watch, scripts);
	cb();
}

function html() {
	return src(paths.html.src)
		.pipe(
			inject(src([paths.components]), {
				starttag: "<!-- inject:{{path}} -->",
				relative: true,
				transform: (_, file) => file.contents.toString("utf8"),
			})
		)
		.pipe(
			isProduction
				? htmlmin({ collapseWhitespace: true })
				: gulpPlumber(plumberNotify("html"))
		)
		.pipe(dest(paths.dest));
}

function styles() {
	return src(paths.css.src)
		.pipe(gulpPlumber(plumberNotify("Styles")))
		.pipe(sourceMaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(sourceMaps.write())
		.pipe(
			isProduction
				? cleanCSS({ compatibility: "ie8" })
				: gulpPlumber(plumberNotify("sass"))
		)
		.pipe(dest(paths.css.dest))
		.pipe(notify({ message: "CSS скомпилирован!", onLast: true }));
}

function images(done) {
	fsExtra
		.copy(paths.assets.images.src, paths.assets.images.dest, {
			overwrite: true,
			errorOnExist: false,
			preserveTimestamps: true,
		})
		.then(() => done())
		.catch((err) => done(err));
}

function scripts() {
	return src(paths.scripts.src)
		.pipe(gulpPlumber(plumberNotify("JS")))
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
			})
		)
		.pipe(concat("app.js"))
		.pipe(isProduction ? uglify() : gulpPlumber(plumberNotify("JS")))
		.pipe(dest(paths.scripts.dest))
		.pipe(notify({ message: "JS собран!", onLast: true }));
}

function clean(cb) {
	if (fs.existsSync(paths.dest)) {
		return src(paths.dest, { read: false }).pipe(gulpClean({ force: true }));
	}

	cb();
}

module.exports = {
	html,
	styles,
	scripts,
	images,
	watchFiles,
	clean,
};
