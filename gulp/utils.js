const notify = require("gulp-notify");

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title,
			message: "Error <%= error.message %>",
			sound: false,
		}),
	};
};

module.exports = {
	plumberNotify,
};
