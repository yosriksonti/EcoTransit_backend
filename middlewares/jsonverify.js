module.exports = function makeJsonverify(db,jwt,E,utils) {
    return async function jsonverify(req, res, next) {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const token = bearerHeader.split(" ")[1];
    
            try {
                var decoded = jwt.verify(token, process.env.SignKey); //"wrong-secret");
    
                // TODO
                console.log("DECODED", decoded);
                // what about suspended user
                const user = await db.User.findById(decoded.data.id );
                if (user && !user.verified) {
                    throw new E.UserNotAuthenticated("user not verified");
                }
                if (user && String(user.loginStamp) != String(decoded.data.loginStamp)) {
                    console.log(String(user.loginStamp),String(decoded.data.loginStamp))
                    throw new E.UserNotAuthenticated("user connected on another device.");
                }
                if (!user) {
                    throw new E.UserNotAuthenticated("token not valid");
                }
                
                delete user.password;
                req.user = user;
                console.log("USER:", user);
                await db.User.updateOne(
                    { _id: decoded.data.id },
                    {
                       $set: {
                          lastActive : new Date(),
                       }
                    }
                 );
                next();
            } catch (err) {
                err.status = 401;
                next(err);
            }
        } else {
            return next(new E.UserNotAuthenticated("token not supplied"));
        }
    }
}