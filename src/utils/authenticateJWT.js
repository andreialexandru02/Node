const jwt = require('jsonwebtoken');
const secretKey = 'my_secret_key';

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authenticateJWT;
