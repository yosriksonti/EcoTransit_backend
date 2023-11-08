module.exports = function makeGetProfile(db,E,utils) {
    return async function getProfile(req, res) {
        const user = await db.user.findUnique({
            where: {
                id: req.user.id,
            },
            include : {
                quizzes : true,
                submits : true
            } 
        });
    
        delete user.password;
        res.json(user);
    }
}