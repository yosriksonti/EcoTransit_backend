const db = require('../../../models')
const makeEditProfile = require('./editProfile')
const makeGetProfile = require('./getProfile')
let E = null,
	utils = null,
    usecases;
function init() {
    const editProfile = makeEditProfile(db,E,utils)
    const getProfile = makeGetProfile(db,E,utils)
    usecases = Object.freeze({
        editProfile,
        getProfile
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}
