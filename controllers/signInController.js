const signInModel = require('../models/signInModel');
const jwt = require('jsonwebtoken');  // Include JWT for authentication
const signin = new signInModel.Signin();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';  // Use an environment variable for the secret

// Signin function
exports.signinDetails = async (req, res) => {
    try {
        const user = await signin.signinDetails(req.body);

        // Log the user role and restaurantId to ensure it's being returned correctly
        console.log("Role returned from model:", user.role);
        console.log("Restaurant ID returned from model:", user.restaurantId);
        console.log("Customer ID returned from model:", user.customerId);

        // Create JWT token after successful login
        const tokenPayload = { 
            email: req.body.email.trim(),
            role: user.role
        };

        // Add restaurantId if the user is a Restaurateur
        if (user.role === 'Restaurateur' && user.restaurantId) {
            tokenPayload.restaurantId = user.restaurantId;
        }else if (user.role === 'Customer' && user.customerId) {
            // Include customerId for customers
            tokenPayload.customerId = user.customerId;
        }

        const token = jwt.sign({ 
            email: req.body.email.trim(), 
            role: user.role, 
            restaurantId: user.restaurantId,
            customerId:user.customerId
            // Include the restaurant ID if available
        }, JWT_SECRET, {
            expiresIn: '5h',  // Token expires in 1 hour
        });
        
        // Send the token and role back to the client
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(400).json({ message: err.message });
    }
};   