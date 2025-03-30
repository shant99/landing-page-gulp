const { src, dest, series, parallel } = require("gulp");
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));

function styles() {
	return src("./src/scss/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(dest("./dist/css/"))
		.pipe(notify({ message: "CSS скомпилирован!", onLast: true }));
}

exports.default = series(styles);
