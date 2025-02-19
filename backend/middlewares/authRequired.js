const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authRequired = async (req, res, next)=> {
    const { authorization } = req.headers;

    if(!authorization){
        res.status(404).json({ error: "Authorization token required!" });
    }

    const token = authorization.split(" ")[1];

    try {
        await jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken)=> {
            if(err){
                res.status(400).json({ error: "Authorization failed!" });
            }
            const _id = decodedToken.id;
            req.user = await User.findOne({_id}).select("_id");
            next();
        })
    } catch(err) {
        res.status(400).json({ error: "Authorization failed!" });
    }
}


module.exports = authRequired;