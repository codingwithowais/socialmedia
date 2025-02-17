const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(404).send("Token Required");
    }
    jwt.verify(token , process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(404).send("Invalid Token");
        }
        req.user = user;
        next();
    })
}
module.exports = fetchuser;