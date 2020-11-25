const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        req.userData = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log("Could not check authorisation");
        return res.status(401).json({
            message: 'Unauthorised access!'
        });
    }
};