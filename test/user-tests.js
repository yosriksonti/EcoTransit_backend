let error = require("../errors.js")
let utils = require("../utils")
const userUseCases = require('../routes/user').useCases(utils,error)

module.exports = async function  userTests(req,res) {
        it("Sign up" , (done) => {
            req.body = {
                email : "test"+Math.random()+"@gmail.com",
                password : "1234",
                name : "Joe",
                lastname : "Doe"
            }
            const result = userUseCases.signup(req,res)
            result
            .then(() => {
                req.user = res.body
                done()
                console.log("Signed up User:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Verify User" , (done) => {
            req.params = {
                id : req.user.id,
            }
            const result = userUseCases.verifyUser(req,res)
            result
            .then(() => {
                setTimeout(()=> {},500)
                done()
                console.log("Verified User:",res.body)
            }).catch(error => {
                done(err)
            })
        })
        it("Sign in" , (done) => {
            req.body = {
                email : req.user.email,
                password : "1234"
            }
            const result = userUseCases.signin(req,res)
            result
            .then(() => {
                setTimeout(()=> {},500)
                done()
                console.log("Signed in User:",res.body)
            }).catch(err => {
                done(err)
            })
        })
        it("Forgot" , (done) => {
            req.body = {
                email : req.user.email,
                callback : "https://gamma.pyra.ai/forgot/password"
            }
            const result = userUseCases.forgot(req,res)
            result
            .then(() => {
                done()
                console.log("Forgot User:",res.body)
            }).catch(e => {
                done(e)
            })
        })
}