const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or wrong format' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err); // Log the exact error
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        console.log("Decoded Token:", decoded); // Ensure restaurantId or other fields are included
        req.user = decoded; // Attach decoded token payload to request (contains restaurantId or other user info)
        next();
    });
};

module.exports = { protect };
