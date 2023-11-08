class ExpressValidationError extends Error {
	constructor(message, details) {
		super(message);
		this.name = "ExpressValidationError";
		this.status = "400";
		this.details = details;
	}
}

class ExistsError extends Error {
	constructor(message) {
		super(message);
		this.name = "ExistsError";
		this.status = "400";
	}
}

class InvalidValue extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidValue";
		this.status = "400";
	}
}

class InvalidAction extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidAction";
		this.status = "400";
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFoundError";
		this.status = "404";
	}
}

class UserNotAuthenticated extends Error {
	constructor(message) {
		super(message);
		this.name = "UserNotAuthenticated";
		this.status = "401";
	}
}

class UserNotAuthorized extends Error {
	constructor(message) {
		super(message);
		this.name = "UserNotAuthorized";
		this.status = "403";
	}
}

module.exports.NotFoundError = NotFoundError;
module.exports.ExpressValidationError = ExpressValidationError;
module.exports.ExistsError = ExistsError;
module.exports.UserNotAuthenticated = UserNotAuthenticated;
module.exports.UserNotAuthorized = UserNotAuthorized;
module.exports.InvalidValue = InvalidValue
module.exports.InvalidAction = InvalidAction
