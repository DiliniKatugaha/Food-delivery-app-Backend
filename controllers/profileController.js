// profileController.js

const jwt = require('jsonwebtoken');
const profileModel = require('../models/profileModel'); // Ensure this points to your profile model
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret

// Get customer data
exports.getCustomerData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Get token from headers
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email; // Get email from the token
        
        // Fetch user details from the model
        const userDetails = await profileModel.getCustomerDetails(email);

        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userDetails); // Return the user's details
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
};

// Update customer data
exports.updateCustomerData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Get token from headers
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    const { name, email, status, contact, hostel, address } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const currentEmail = decoded.email; // Get email from the token

        // Update user details using the model
        const updatedUser = await profileModel.updateCustomerDetails(name, email, status, contact, hostel, address, currentEmail);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating customer data:', error);
        res.status(500).json({ message: 'An error occurred while updating data' });
    }
};