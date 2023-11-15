var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyLogger = require("morgan-body");
const cors = require("cors");
const limiter = require('./config/limiter')
// use 'debug' module
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
require('./config/db')

if (process.env.NODE_ENV == "development") {
	//console.log(process.env);
}

let utils = require("./utils");

let errors = require("./errors");

const middlewares = require('./middlewares')

var api = require("./controllers")(utils, errors, middlewares);


// start cron
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ limit : '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(limiter.IPLimiter)
if (process.env.LOCAL === "YES") {
	//bodyLogger(app);
}

app.use("/s/api/", api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// payload limit

// error handler
app.use(function (err, req, res, next) {
	console.error(err);

	let status = err.status || 500;

	// Sendgrid email errors
	if (err.code == 400) {
		console.dir("Email Error:", err.response ? err.response.body : {});
	}

	// details of Prisma error
	if (err.clientVersion) {
		status = 400;
		//console.log(Object.keys(err), err.meta);

		if (!err.code) {
			// before modifying message

			err.message =
				"Check that all required fields are included and field types.";
		} else {
			err.message = err.message.split("\n").reverse()[0].trim();
		}
	}

	// status might have been changed before
	if (status == 500) {
		// record 500 errors only
		// as others will be clear to the client
		console.error(new Date(), "[server error]", err);
		err.message = "Unexpected error, please contact backend personal to fix it";
	}

	res.status(status);

	res.json({
		errors: [
			{
				time: new Date(),
				error: err.name,
				code: err.code,
				message: err.message,
				details: err.details,
			},
		],
	});
});

app.listen(process.env.PORT | 4000,() => {
	console.log("PORT:",process.env.PORT | 4000)
})
module.exports = app;
