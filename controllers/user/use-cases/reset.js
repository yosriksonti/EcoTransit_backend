module.exports = function makeReset(db,bcrypt,E,utils) {
    return async function reset(req, res, next) {
        let { id, newpassword } = req.body;

        // expiry link time compare?
        // check id
        // get email
        // set user password
        // delete from resetPassword

        let resetpassword = await db.ResetPassword.findById(id);

        if (!resetpassword) {
            throw new E.NotFoundError("not found");
        }

        let password = await bcrypt.hash(newpassword, 10);

        const user = await db.User.updateOne(
            { email: resetpassword.email },
            { password });

        await db.ResetPassword.findByIdAndDelete(id);

        res.send("password reset");
    }
}
    