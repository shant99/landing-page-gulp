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

const paths = {
	html: {
		src: "./src/index.html",
		dest: "dist/",
		watch: "src/**/*.html",
	},
	components: "./src/components/*.html",
	css: {
		src: "./src/scss/*.scss",
		dest: "dist/css/",
		watch: "src/scss/**/*.scss",
	},
	scripts: {
		src: [
			"./src/js/libs/**/*.js",
			"./src/js/utils/**/*.js",
			"./src/js/globals/**/*.js",
			"./src/js/components/**/*.js",
			"./src/js/app.js",
		],
		dest: "./dist/js/",
		watch: "./src/js/**/*.js",
	},
	assets: {
		images: {
			src: "src/assets/images",
			dest: "dist/assets/images",
			watch: "src/assets/images/*",
		},
	},
	dest: "./dist/",
};

function watchFiles() {
	watch([paths.html.watch, paths.components], html);
	watch(paths.css.watch, styles);
	watch(paths.assets.images.watch, images);
	watch(paths.scripts.watch, scripts);
}

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title,
			message: "Error <%= error.message %>",
			sound: false,
		}),
	};
};

function html() {
	return src(paths.html.src)
		.pipe(
			inject(src([paths.components]), {
				starttag: "<!-- inject:{{path}} -->",
				relative: true,
				transform: (_, file) => file.contents.toString("utf8"),
			})
		)
		.pipe(dest(paths.dest));
}

function styles() {
	return src(paths.css.src)
		.pipe(gulpPlumber(plumberNotify("Styles")))
		.pipe(sourceMaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(sourceMaps.write())
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
				presets: ["@babel/preset-env"], // настройка Babel
			})
		)
		.pipe(concat("app.js"))
		.pipe(dest(paths.scripts.dest))
		.pipe(notify({ message: "JS собран!", onLast: true }));
}

function clean(cb) {
	if (fs.existsSync(paths.dest)) {
		return src(paths.dest, { read: false }).pipe(gulpClean({ force: true }));
	}

	cb();
}

exports.clean = clean;

exports.default = series(
	clean,
	parallel(html, styles, scripts, images, watchFiles)
);
