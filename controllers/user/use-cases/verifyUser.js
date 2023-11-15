module.exports = function makeVerifyUser(db,E,utils) {
    return async function verifyUser(req, res, next) {
        let { id } = req.params;
        const user = await db.User.findById(id);
    
        console.log("FOUND USER", foundUser);
    
        let incorrectCredentials = new E.NotFoundError("Incorrect Credentials");
        // user exists check
        if (!foundUser) {
            throw incorrectCredentials;
        }
    
        if (foundUser.deleted) {
            throw new E.UserNotAuthenticated("user is deleted");
        }
        
        await db.User.findByIdandUpdate(
            user.id,
            {
                verified: true
            }
        )
        let response = await db.User.findById(id);

        
    
        res.send(response);
    }
}