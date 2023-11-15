const db = require('../../../models')
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const makeSignin = require("./signin")
const makeSignup = require("./signup")
const makeReset = require("./reset")
const makeForgot = require("./forgot")
const makeVerifyUser = require("./verifyUser")
let E = null,
	utils = null,
    usecases;

function init() {
    const signin = makeSignin(db,bcrypt,jwt,E,utils)
    const signup = makeSignup(db,bcrypt,jwt,E,utils)
    const forgot = makeForgot(db,E,utils)
    const reset = makeReset(db,bcrypt,E,utils)
    const verifyUser = makeVerifyUser(db,E,utils)
    usecases = Object.freeze({
        signin,
        signup,
        forgot,
        reset,
        verifyUser
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}