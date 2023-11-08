var express = require("express");
const middlewareModule = require('./middlewares')

let U,
	E = null;

var router = express.Router();


function init() {
	const middlewares = middlewareModule(U,E)
	// router.use(middlewares.jsonverify);

	// super admin
	// isOrganizationAdmin
	router.use("/profile", require("./profile").router(U, E, middlewares));
	router.use("/station", require("./station").router(U, E, middlewares));
	router.use("/expedition", require("./expedition").router(U, E, middlewares));
	router.use("/iterinary", require("./iterinary").router(U, E, middlewares));
	// router.use("/quiz", require("./quiz").router(U, E, middlewares));
	// router.use("/question", require("./question").router(U, E, middlewares));
	// router.use("/answer", require("./answer").router(U, E, middlewares));
	// router.use("/file", require("./files")(U, E, middlewares));
	// router.use("/quiz-submit", require("./quiz-submit").router(U, E, middlewares));
	

	//router.use("/stage", require("./stage")(E));
}

module.exports = function (utils, errors) {
	U = utils;
	E = errors;
	init();
	return router;
};