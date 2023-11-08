var bcrypt = require("bcrypt");

module.exports = function makeEditProfile(db,E,utils) {
    return async function editProfile(req, res) {
        const foundUser = await db.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
    
        let password;
    
        if (req.body.oldpassword) {
            let match = await bcrypt.compare(req.body.oldpassword, foundUser.password);
    
            // password match check
            if (!match) {
                throw new E.NotFoundError("Wrong old password");
            }
    
            password = await bcrypt.hash(req.body.newpassword, 10);
        }
    
        delete req.body.newpassword;
        delete req.body.oldpassword;
        // security: preventing non GUI hacks
        delete req.body.isOrganizationAdmin;
    
        let data = { ...req.body, password: password ? password : undefined };
    
        let user = await db.user.update({
            where: {
                id: req.user.id,
            },
            data,
        });
    
        delete user.password;
        res.json(user);
    }
}