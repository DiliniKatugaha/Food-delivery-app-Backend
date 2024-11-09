const jwt = require('jsonwebtoken');
const profileModel = require('../models/profileModel');
const JWT_SECRET = 'your_jwt_secret_key'; 

exports.getCustomerData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email; 
        
        const userDetails = await profileModel.getCustomerDetails(email);

        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userDetails); 
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
};

exports.updateCustomerData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    const { name, email, status, contact, hostel, address } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const currentEmail = decoded.email; 

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