const db = require('../../../models')
const makeCreateIterinary = require('./createIterinary')
const makeGetIterinary = require('./getIterinary')
const makeGetIterinaries = require('./getIterinaries')
let E = null,
	utils = null,
    usecases;
function init() {
    const createIterinary = makeCreateIterinary(db,E,utils)
    const getIterinary = makeGetIterinary(db,E,utils)
    const getIterinaries = makeGetIterinaries(db,E,utils)
    usecases = Object.freeze({
        createIterinary,
        getIterinaries,
        getIterinary,
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}
