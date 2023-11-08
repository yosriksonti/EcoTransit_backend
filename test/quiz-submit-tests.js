let error = require("../errors.js")
let utils = require("../utils/index.js")
const quizSubmitUseCases = require('../routes/api/quiz-submit/index.js').useCases(utils,error)

module.exports = async function  userTests(req,res) {
        it("Create Quiz Submit" , (done) => {
            req.body = {
                state : "DONE",
                quizId : req.quiz.id                
            }
            const result = quizSubmitUseCases.createQuizSubmit(req,res)
            result
            .then(() => {
                req.quizSubmit = res.body
                done()
                console.log("Created Quiz Submit:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Get Quiz Submit" , (done) => {
            req.params = {
                id : req.quizSubmit.id
            }
            const result = quizSubmitUseCases.getQuizSubmit(req,res)
            result
            .then(() => {
                done()
                console.log("Found Quiz Submit:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })

        it("Get All Quiz Submits" , (done) => {
            const result = quizSubmitUseCases.getQuizSubmits(req,res)
            result
            .then(() => {
                done()
                console.log("Found Quiz Submits:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Edit Quiz Submit" , (done) => {
            req.body = {
                state : "PENDING"               
            }
            req.params = {
                id : req.quizSubmit.id
            }
            const result = quizSubmitUseCases.editQuizSubmit(req,res)
            result
            .then(() => {
                req.quizSubmit = res.body
                done()
                console.log("Edited Quiz Submit:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Put Quiz Submitted Answers" , (done) => {
            req.body = {
                submittedAnswers : JSON.stringify(
                    [
                        {
                            "questionId" : req.question.id,
                            "answerId" : req.answer.id
                        }
                    ]
                )
            }
            req.params = {
                id : req.quizSubmit.id
            }
            const result = quizSubmitUseCases.putSubmittedAnswers(req,res)
            result
            .then(() => {
                req.quizSubmit = res.body
                done()
                console.log("Edited Quiz Submit:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
}