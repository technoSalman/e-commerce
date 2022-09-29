require('dotenv').config();
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-undef
const config = process.env;

const verifyToken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        return res.status(403).send('No token found');
    }
    try{
        req.user = jwt.verify(token, config.TOKEN_KEY);
    }
    catch(error){
        return res.status(401).send('Invalid token');
    }
    next();
};


module.exports = verifyToken;