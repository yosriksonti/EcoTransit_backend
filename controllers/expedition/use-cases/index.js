const db = require('../../../models')
const makeCreateExpedition = require('./createExpedition')
const makeGetExpedition = require('./getExpedition')
const makeGetExpeditions = require('./getExpeditions')
let E = null,
	utils = null,
    usecases;
function init() {
    const createExpedition = makeCreateExpedition(db,E,utils)
    const getExpedition = makeGetExpedition(db,E,utils)
    const getExpeditions = makeGetExpeditions(db,E,utils)
    usecases = Object.freeze({
        createExpedition,
        getExpeditions,
        getExpedition,
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}
