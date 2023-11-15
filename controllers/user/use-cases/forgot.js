
module.exports = function makeForgot(db,E,utils){
    return async function forgot(req, res, next) {
        let { email, callback } = req.body;
        let userExists = await db.User.findOne({email})

        const resetpassword = new db.ResetPassword({
                email,
        });
        let response = await resetpassword.save();

        let link = `${callback}${response.id}`;
        response.link = link

        if (userExists) {
            // await utils.email.sendForgotPassword(link, email);
        } else {
            throw new E.NotFoundError("user not found");
        }

        res.send(response);
    }
}
    