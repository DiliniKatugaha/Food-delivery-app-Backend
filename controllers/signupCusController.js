const signupCusModel = require('../models/signupCusModel');
const signupCus = new signupCusModel.Signup();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token is missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        req.customerId = decoded.cus_id; 
        next();
    });
};

exports.signupCusDetails = async (req, res) => {
    try {
        const newCustomer = await signupCus.signupCusDetails(req.body);
        res.status(201).json({ message: 'Customer registered successfully', customer: newCustomer });
    } catch (err) {
        console.error('Error during customer signup:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.getCustomerData = [verifyToken, async (req, res) => {
    try {
        const customer = await signupCus.getCustomerById(req.customerId);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        console.error('Error fetching customer data:', err);
        res.status(500).json({ message: 'Error fetching customer data' });
    }
}];

exports.updateCustomerData = [verifyToken, async (req, res) => {
    try {
        const updatedCustomer = await signupCus.updateCustomer(req.customerId, req.body);
        res.json({ message: 'Profile updated successfully', customer: updatedCustomer });
    } catch (err) {
        console.error('Error updating profile data:', err);
        res.status(500).json({ message: 'Error updating profile data' });
    }
}];
