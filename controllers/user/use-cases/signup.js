
module.exports = function makeSignup (db,bcrypt,jwt,E,utils) {
    return async function signup(req, res, next) {

        let { email, name, lastname, verified, role, tel } = req.body;
        let boolVerified = String(verified) === "true"
        let password = await bcrypt.hash(req.body.password, 10);
        const user = new db.User({
            email, 
            password,
            name, 
            lastname,
            verified : boolVerified,
            role,
            tel,
        })
        const result = await user.save()
        
        

        var accessToken = jwt.sign({ data: result }, process.env.SignKey, {
            expiresIn: "7d",
        });

        // build the response
        let response = {
            //token: accessToken,
            id : result.id,
            name: result.name,
            lastname: result.lastname,
            email: result.email,
            role: result.role,
            createdAt: result.createdAt
        };
       
        res.send(response);
        // if(!boolVerified){
        //     let link = "https://"+process.env.APP+".pyra.ai/verify/"+organization.users[0].id
        //     let to = email
        //     let mail =  await utils.email.sendVerificationEmail(name,to,organizationName,link).catch((e) => {
        //         console.log(e)
        //     })
        //     console.log("sent",mail)
        // } 

    }
}