let error = require("../errors.js")
let utils = require("../utils/index.js")
const quizUseCases = require('../routes/api/quiz/index.js').useCases(utils,error)

module.exports = async function  userTests(req,res) {
        it("Create Quiz" , (done) => {
            req.body = {
                name : "Test Quiz",
                category : "Test",
                introduction : "Introduction",
                deadline : new Date()
                
            }
            const result = quizUseCases.createQuiz(req,res)
            result
            .then(() => {
                req.quiz = res.body
                done()
                console.log("Created Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Get Quiz" , (done) => {
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.getQuiz(req,res)
            result
            .then(() => {
                done()
                console.log("Found Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })

        it("Get All Quizzes" , (done) => {
            req.query = {
                category : 'Test'
            }
            const result = quizUseCases.getQuizzes(req,res)
            result
            .then(() => {
                done()
                console.log("Found Quizzes:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Edit Quiz" , (done) => {
            let deadline = new Date()
            deadline.setMonth(deadline.getMonth()+1)
            req.body = {
                name : "Test Quiz",
                category : "Test",
                introduction : "Introduction 2",
                deadline : deadline
            }
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.editQuiz(req,res)
            result
            .then(() => {
                req.quiz = res.body
                done()
                console.log("Edited Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Put Quiz Questions" , (done) => {
            req.body = {
                questions : JSON.stringify(
                    [
                        {
                            "question" : "Question 1",
                            "grade" : 25,
                            "timer" : 30,
                            "answers" : [
                                {
                                    "answer" : "Answer 1",
                                    "isCorrect" : true
                                },
                                {
                                    "answer" : "Answer 2",
                                    "isCorrect" : false
                                }
                            ]
                        }
                    ]
                ),
                questionIds : req.question.id
            }
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.putQuestions(req,res)
            result
            .then(() => {
                req.quiz = res.body
                done()
                console.log("Edited Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Patch Quiz Questions" , (done) => {
            req.body = {
                questions : JSON.stringify(
                    [
                        {
                            "question" : "Question 1",
                            "grade" : 25,
                            "timer" : 30,
                            "answers" : [
                                {
                                    "answer" : "Answer 1",
                                    "isCorrect" : true
                                },
                                {
                                    "answer" : "Answer 2",
                                    "isCorrect" : false
                                }
                            ]
                        }
                    ]
                ),
                questionIds : req.question.id
            }
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.patchQuestions(req,res)
            result
            .then(() => {
                req.quiz = res.body
                done()
                console.log("Edited Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Put Quiz Students" , (done) => {
            req.body = {
                studentIds : req.user.id
            }
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.putStudents(req,res)
            result
            .then(() => {
                req.quiz = res.body
                done()
                console.log("Edited Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
        it("Patch Quiz Students" , (done) => {
            req.body = {
                studentIds : req.user.id
            }
            req.params = {
                id : req.quiz.id
            }
            const result = quizUseCases.patchStudents(req,res)
            result
            .then(() => {
                req.quiz = res.body
                done()
                console.log("Edited Quiz:",res.body)
                
            }).catch(err => {
                done(err)
            })
        })
}