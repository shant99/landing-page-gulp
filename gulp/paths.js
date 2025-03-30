const buildPath = "build/";

const paths = {
	dest: buildPath,
	html: {
		src: "./src/*.html",
		dest: buildPath,
		watch: "src/**/*.html",
	},
	components: "./src/components/*.html",
	css: {
		src: "./src/scss/**/*.scss",
		dest: `${buildPath}css/`,
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
		dest: `${buildPath}js/`,
		watch: "./src/js/**/*.js",
	},
	assets: {
		images: {
			src: "src/assets/images",
			dest: `${buildPath}assets/images`,
			watch: "src/assets/images/**/*",
		},
	},
};

module.exports = { paths };
