const userTests = require('./user-tests')
const questionTests = require('./question-tests')
const answerTests = require('./answer-tests')
const quizTests = require('./quiz-tests')
const quizSubmitTests = require('./quiz-submit-tests')
const deleteTests = require('./delete-tests')
const res = {
    json : (data) => {
        res.body = data;
    },
    send : (data) => {
        res.body = data;
    },
    body : {}
}
let req = {
    body : {},
    params : {},
    query: {},
    method : null,
    user : null,
    ip : "_-_-_-_127.0.0.1" 
}
function test() {
    describe("#####TESTING#####", async () => {
        userTests(req,res).then(() => {
        })
        questionTests(req,res).then(() => {
        })
        answerTests(req,res).then(() => {
        })
        quizTests(req,res).then(() => {
        })
        quizSubmitTests(req,res).then(() => {
        })
        deleteTests(req,res).then(() => {
        })
               
    })
    
}
test()