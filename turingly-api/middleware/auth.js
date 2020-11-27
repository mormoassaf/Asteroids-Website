const jwt = require('jsonwebtoken');

exports.check = (req, res, next) => {
    try {
        console.log(req.headers);

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        req.body.userData = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log("Could not check authorisation");
        console.log(error);
        return res.status(401).json({
            message: 'Unauthorised access!'
        });
    }
};