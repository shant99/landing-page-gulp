// Start Project
// gulp --prod
// gulp --dev
const { series, parallel } = require("gulp");
const yargs = require("yargs");
const argv = yargs.argv;
const {
	html,
	styles,
	scripts,
	images,
	watchFiles,
	clean,
} = require("./gulp/dev.js");

const isProduction = argv.prod || argv.production;

function dev(cb) {
	console.log("💻 Режим разработки: компилируем без минификации...");
	return series(clean, parallel(html, styles, scripts, images, watchFiles))(cb);
}
function buildProd(cb) {
	console.log("🚀 Продакшн режим: минифицируем файлы...");
	return series(clean, parallel(html, styles, scripts, images))(cb);
}

exports.clean = clean;
exports.build = isProduction ? buildProd : dev;
exports.default = dev;
