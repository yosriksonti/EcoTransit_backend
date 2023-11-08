let error = require("../errors.js")
let utils = require("../utils/index.js")
const answerUseCases = require('../routes/api/answer/index.js').useCases(utils,error)

module.exports = async function  userTests(req,res) {
        it("Create Answer" , (done) => {
            req.body = {
                answer : "Test Answer",
                isCorrect : true,
                questionId : req.question.id
            }
            const result = answerUseCases.createAnswer(req,res)
            result
            .then(() => {
                req.answer = res.body
                done()
                console.log("Created Answer:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Get Answer" , (done) => {
            req.params = {
                id : req.answer.id
            }
            const result = answerUseCases.getAnswer(req,res)
            result
            .then(() => {
                done()
                console.log("Found Answer:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })

        it("Get All Answers" , (done) => {
            req.params = {
                id : req.question.id
            }
            const result = answerUseCases.getAnswers(req,res)
            result
            .then(() => {
                done()
                console.log("Found Answers:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Edit Answer" , (done) => {
            req.body = {
                answer : "Test Answer",
                isCorrect : false,
                questionId : req.question.id
            }
            req.params = {
                id : req.answer.id
            }
            const result = answerUseCases.editAnswer(req,res)
            result
            .then(() => {
                req.answer = res.body
                done()
                console.log("Edited Answer:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
}