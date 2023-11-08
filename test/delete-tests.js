let error = require("../errors.js")
let utils = require("../utils/index.js")
const quizSubmitUseCases = require('../routes/api/quiz-submit/index.js').useCases(utils,error)
const quizUseCases = require('../routes/api/quiz/index.js').useCases(utils,error)
const answerUseCases = require('../routes/api/answer/index.js').useCases(utils,error)
const questionUseCases = require('../routes/api/question/index.js').useCases(utils,error)

module.exports = async function  userTests(req,res) {
        it("Delete Quiz Submit" , (done) => {
            req.params = {
                id : req.quizSubmit.id
            }
            const result = quizSubmitUseCases.deleteQuizSubmit(req,res)
            result
            .then(() => {
                done()
                console.log("Deleted Quiz Submit:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Delete Quiz" , (done) => {
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.deleteQuiz(req,res)
            result
            .then(() => {
                done()
                console.log("Deleted Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })

        it("Delete Answer" , (done) => {
            req.params = {
                id : req.answer.id
            }
            const result = answerUseCases.deleteAnswer(req,res)
            result
            .then(() => {
                done()
                console.log("Deleted Answer:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Delete Question" , (done) => {
            req.params = {
                id : req.question.id
            }
            const result = questionUseCases.deleteQuestion(req,res)
            result
            .then(() => {
                setTimeout(()=> {
                    process.exit(0)
                },500)
                done()
                console.log("Deleted Question:",res.body)
                
            }).catch(err => {
                setTimeout(()=> {
                    process.exit(-1)
                },500)
                done(err)
            })
        })
}