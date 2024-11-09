const signInModel = require('../models/signInModel');
const jwt = require('jsonwebtoken');
const signin = new signInModel.Signin();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 

exports.signinDetails = async (req, res) => {
    try {
        const user = await signin.signinDetails(req.body);

        console.log("Role returned from model:", user.role);
        console.log("Restaurant ID returned from model:", user.restaurantId);
        console.log("Customer ID returned from model:", user.customerId);

        const tokenPayload = { 
            email: req.body.email.trim(),
            role: user.role
        };

        if (user.role === 'Restaurateur' && user.restaurantId) {
            tokenPayload.restaurantId = user.restaurantId;
        }else if (user.role === 'Customer' && user.customerId) {
            tokenPayload.customerId = user.customerId;
        }

        const token = jwt.sign({ 
            email: req.body.email.trim(), 
            role: user.role, 
            restaurantId: user.restaurantId,
            customerId:user.customerId
        }, JWT_SECRET, {
            expiresIn: '5h',  
        });
        
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(400).json({ message: err.message });
    }
};   