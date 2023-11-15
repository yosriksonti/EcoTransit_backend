const { body, validationResult } = require("express-validator");
var E = null;

const PASSWORD_SIZE = 4;

loginvalidator = [
	//body("email").isEmail().normalizeEmail(),
	body("password").isLength({ min: PASSWORD_SIZE }),
	commonErrorResponse,
];

signupValidator = [
	body("email").isEmail().normalizeEmail(),
	body("name").isLength({ min: 3, max: 50 }).trim().escape(),
	body("lastname").isLength({ min: 3, max: 50 }).trim().escape(),
	body("password").isLength({ min: PASSWORD_SIZE }),
	commonErrorResponse,
];

forgotValidator = [
	body("email").isEmail().normalizeEmail(),
	commonErrorResponse,
];

function commonErrorResponse(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		//return res.status(400).json({ errors: errors.array() });
		//return next();
		//console.error(errors);
		return next(new E.ExpressValidationError("Invalid input", errors.array()));
	}
	next();
}
module.exports = function (errors) {
	E = errors;
	return {
		loginvalidator: loginvalidator,
		signupValidator: signupValidator,
		forgotValidator: forgotValidator,
	};
};
