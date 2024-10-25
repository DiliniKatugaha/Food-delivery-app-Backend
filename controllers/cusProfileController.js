const cusProfileModel = require('../models/cusProfileModel');

// Get customer profile
exports.getCustomerProfile = async (req, res) => {
    try {
        const customerId = req.user.customerId;
        if (!customerId) {
            return res.status(401).json({ message: 'Unauthorized: Invalid customer ID' });
        }

        const customerDetails = await cusProfileModel.getCustomerDetailsByCustomerId(customerId);
        if (!customerDetails) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customerDetails);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
};

// Update customer profile
// Update customer profile
// Update customer profile
// Update customer profile
exports.updateCustomerProfile = async (req, res) => {
    const { username, email, status, contact, hostel, address } = req.body; // Use username here

    if (!username || !email || !contact) {
        return res.status(400).json({ message: 'Customer name, email, and contact number are required' });
    }

    try {
        const customerId = req.user.customerId; // Use customerId from decoded token
        if (!customerId) {
            return res.status(401).json({ message: 'Unauthorized: Invalid customer ID' });
        }

        const updatedCustomer = await cusProfileModel.updateCustomerDetails(
            customerId, username, email, status, contact, hostel, address
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found or no changes made' });
        }

        // Log the updated customer
        console.log('Updated Customer:', updatedCustomer);

        res.status(200).json({ message: 'Profile updated successfully', updatedCustomer });
    } catch (error) {
        console.error('Error updating customer data:', error);
        res.status(500).json({ message: 'An error occurred while updating data' });
    }
};
