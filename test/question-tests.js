let error = require("../errors.js")
let utils = require("../utils/index.js")
const questionUseCases = require('../routes/api/question/index.js').useCases(utils,error)

module.exports = async function  userTests(req,res) {
        it("Create Question" , (done) => {
            req.body = {
                question : "Test Question",
                category : "Test",
                grade : 20,
                timer : 300
            }
            const result = questionUseCases.createQuestion(req,res)
            result
            .then(() => {
                req.question = res.body
                done()
                console.log("Created Question:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Get Question" , (done) => {
            req.params = {
                id : req.question.id
            }
            const result = questionUseCases.getQuestion(req,res)
            result
            .then(() => {
                done()
                console.log("Found Question:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })

        it("Get All Questions" , (done) => {
            req.query = {
                category : 'Test'
            }
            const result = questionUseCases.getQuestions(req,res)
            result
            .then(() => {
                done()
                console.log("Found Questions:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Edit Question" , (done) => {
            req.body = {
                question : "Test Question",
                category : "Test",
                grade : 25,
                timer : 300
            }
            req.params = {
                id : req.question.id
            }
            const result = questionUseCases.editQuestion(req,res)
            result
            .then(() => {
                req.question = res.body
                done()
                console.log("Edited Question:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Put Question Answers" , (done) => {
            req.body = {
                answers : JSON.stringify(
                    [
                        {
                            "answer" : "Answer 1",
                            "isCorrect" : true
                        },
                        {
                            "answer" : "Answer 2",
                            "isCorrect" : false
                        }
                    ]
                )
            }
            req.params = {
                id : req.question.id
            }
            const result = questionUseCases.putAnswers(req,res)
            result
            .then(() => {
                req.question = res.body
                done()
                console.log("Edited Question:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Patch Question Answers" , (done) => {
            req.body = {
                answers : JSON.stringify(
                    [
                        {
                            "answer" : "Answer 3",
                            "isCorrect" : true
                        }
                    ]
                )
            }
            req.params = {
                id : req.question.id
            }
            const result = questionUseCases.patchAnswers(req,res)
            result
            .then(() => {
                req.question = res.body
                done()
                console.log("Edited Question:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
}