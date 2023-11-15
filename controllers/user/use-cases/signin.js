module.exports = function makeSignin(db,bcrypt,jwt,E,utils) {
    return async function signin(req, res, next) {
        
        let { email, password } = req.body;
        console.log(email,password)
        let foundUser = await db.User.findOne({email});
        let loginStamp = new Date()
        console.log("FOUND USER", foundUser);
        
        let incorrectCredentials = new E.NotFoundError("Incorrect Credentials");
        // user exists check
        if (!foundUser) {
            throw incorrectCredentials;
        }
        if (!foundUser.verified) {
            throw new E.UserNotAuthenticated("user is NOT verified");
        }
        
    
        let match = await bcrypt.compare(password, foundUser.password);
    
        // password match check
        if (!match) {
            throw incorrectCredentials;
        }
        
        delete foundUser.password;
    
        const payload = {
            id : foundUser.id,
            name: foundUser.name,
            lastname: foundUser.lastname,
            email: foundUser.email,
            role: foundUser.role,
            createdAt: foundUser.createdAt,
            loginStamp : String(loginStamp)
        };
    
        var accessToken = jwt.sign({ data: payload }, process.env.SignKey, {
            expiresIn: "7d",
        });
        await db.User.updateOne(
            { _id: foundUser.id },
            {
               $set: {
                  loginStamp,
                  lastActive: new Date()
               }
            }
         );
        // TODO
        // foundUser.organization.pipelines
        // found.pipelines (not organization admin)
    
        // build the response
        let response = {
            token: accessToken,
            ...payload,
            //pipelines: foundUser.organization.pipelines,
        };
        res.send(response);        
    }
}