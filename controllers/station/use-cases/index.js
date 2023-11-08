const db = require('../../../models')
const makeCreateStation = require('./createStation')
const makeGetStation = require('./getStation')
const makeGetStations = require('./getStations')
let E = null,
	utils = null,
    usecases;
function init() {
    const createStation = makeCreateStation(db,E,utils)
    const getStation = makeGetStation(db,E,utils)
    const getStations = makeGetStations(db,E,utils)
    usecases = Object.freeze({
        createStation,
        getStations,
        getStation,
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}
