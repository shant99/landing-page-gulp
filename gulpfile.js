const { src, dest, series, parallel, watch } = require("gulp");
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));
const inject = require("gulp-inject");

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
		src: "",
		dest: "dist/js/",
		watch: "",
	},
	dist: "./dist",
};

function watchFiles() {
	watch([paths.html.watch, paths.components], html);
	watch(paths.css.watch, styles);
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
		.pipe(dest(paths.dist));
}

function styles() {
	return src(paths.css.src)
		.pipe(sass().on("error", sass.logError))
		.pipe(dest(paths.css.dest))
		.pipe(notify({ message: "CSS скомпилирован!", onLast: true }));
}

function scripts() {
	return src();
}

function images() {
	return;
}

exports.default = series(parallel(html, styles), watchFiles);
