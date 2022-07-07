const jwt = require('jsonwebtoken');

exports.requireLogin = (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized Access' })
    }
    else {
        const token = accessToken.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden Access" });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
}

exports.requesterIsUser = (req, res, next) => {
    const requesterId = req.user;
    const userId = req.params.id;
    if (requesterId._id === userId) {
        next();
    }
    else {
        return res.status(403).json({ message: 'Access Denied' });
    }
}