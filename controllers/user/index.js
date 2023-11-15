var express = require('express');
const maker = require('./use-cases');
const makeCallback = require('../../config/callback');
let E = null,
  utils = null;
var router = express.Router();
let usecases;
function init() {
  usecases = maker(utils, E);
  var v = require('./validations')(E);
  router.post('/signin', v.loginvalidator, makeCallback(usecases.signin));

  router.post('/signup', v.signupValidator, makeCallback(usecases.signup));
  router.post('/forgot',makeCallback(usecases.forgot))
  router.post('/reset',makeCallback(usecases.reset))
  router.get('/verify/:id',makeCallback(usecases.verifyUser))

  // router.get("/script",
  // 	makeCallback(usecases.script))

  // router.get("/script/access",
  // 	makeCallback(usecases.accessScript))
}

// let useCases = {
// 	signin : usecases.signin,
// 	signup,
// 	forgot,
// 	reset,
// 	invitation,
// 	bulkSignUp,
// 	getOrganization
// }
function handler(usecase) {}
exports.router = function (U, errors) {
  utils = U;
  E = errors;
  init();
  return router;
};
exports.useCases = function (U, errors) {
  utils = U;
  E = errors;
  usecases = maker(utils, E);
  return usecases;
};