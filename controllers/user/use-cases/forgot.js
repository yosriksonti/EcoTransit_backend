
module.exports = function makeForgot(db,E,utils){
    return async function forgot(req, res, next) {
        let { email } = req.body;
        let userExists = await db.User.findOne({email})

        const resetpassword = new db.ResetPassword({
                email,
        });
        let response = await resetpassword.save();

        if (userExists) {
            // await utils.email.sendForgotPassword(link, email);
        } else {
            throw new E.NotFoundError("user not found");
        }

        res.send(response);
    }
}
    