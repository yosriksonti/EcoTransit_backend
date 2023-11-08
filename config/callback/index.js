const limiter = require('../limiter')
module.exports = function makeCallback(usecase) {
    return(req,res) => {
        try{
            console.log("REQUEST ROUTE",req.originalUrl)
            console.log("REQUEST PARAMS",req.params)
            console.log("REQUEST QUERY",req.query)
            console.log("REQUEST BODY",req.body)
            console.log("USE CASE",usecase)
            usecase(req,res).catch((error) => {
                console.error("############ERROR",error,"ERROR############")
                if(error.message.length > 200) {
                    error.message = 'Check with backend administrator to fix the issue.'
                }
                try {
                    res.status(error.status || 400).send({
                        name : error.name, 
                        message : error.message,
                        status : error.status || 400
                    })
                } catch(e){
                    throw new Error(e)
                }
            })
        } catch (e) {
            throw new Error(e)
        }
        
    }
}