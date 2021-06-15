const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies['ACCESS_TOKEN'];
        const decoded = jwt.decode(token);
        if (decoded != null) {
            req.auth = decoded;
            next();
            return;
        }
    } catch(e) {
        console.error('Auth error', e);
    }
    req.auth = {
        username: 'Anonymous',
        admin: false,
        loggedIn: false,
    };
    next();
};