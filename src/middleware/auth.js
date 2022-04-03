const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const currentToken = req.header('Authorization');
        const decodeToken = jwt.verify(currentToken, process.env.JWTTOKEN);
        const user = await User.findOne({ _id: decodeToken._id, 'tokens.token': currentToken });
        if (!user) throw new Error("Please Authenticate");
        req.token = currentToken;
        req.user = user;
    } catch (e) {
        res.status(401).send(e.message);
    }
    next();
}


module.exports = { auth }