const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
    let token;

    // Get token from headers or cookies
    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
    } else {
        token = req.cookies['Authorization'];
    }

    if (!token) {
        return res.status(403).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    try {
        // Expecting "Bearer <token>"
        const userToken = token.split(' ')[1];

        const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

        req.user = jwtVerified; // attach decoded payload to request
        next(); // continue to route
    } catch (error) {
        // Handle expired tokens specifically
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired',
                expiredAt: error.expiredAt
            });
        }

        // Handle other JWT errors
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};
