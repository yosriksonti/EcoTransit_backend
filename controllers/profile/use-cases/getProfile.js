module.exports = function makeGetProfile(db,E,utils) {
    return async function getProfile(req, res) {
        const user = await db.User.findById(req.user.id);
    
        user.password = undefined;
        res.json(user);
    }
}