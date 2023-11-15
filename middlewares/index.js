
const makeJsonverify = require('./jsonverify')

var jwt = require("jsonwebtoken");
const db = require('../models')


let E = null,
utils = null,
middlewares;

function init() {  
    const jsonverify = makeJsonverify(db,jwt,E,utils)
    middlewares = Object.freeze({
        jsonverify
    })
}


module.exports = function (U,errors) {
utils = U;
E = errors;
init()
return middlewares
}