const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Customer model for the customer table
const Customer = sequelize.define('customer', {
    cus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,  // Add this if you want cus_id to auto-increment
    },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hostel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
},{
    freezeTableName: true,

});

// Fetch customer details by customerId (cus_id)
async function getCustomerDetailsByCustomerId(customerId) {
    try {
        const customer = await Customer.findOne({ 
            where: { cus_id: customerId }, 
            attributes: ['cus_id', 'username', 'email', 'status', 'contact', 'hostel', 'address']
        });
    // return customer;
    console.log(customer);
        return customer ? customer : null;
    } catch (error) {
        console.error('Error fetching customer details:', error);
        throw new Error('An error occurred while fetching customer details: ' + error.message);
    }
}

// Update customer details
// Update customer details with `returning: true`
// Update customer details
async function updateCustomerDetails(customerId, customerName, email, status, contact, hostel, address) {
    try {
        const [updatedRows] = await Customer.update({
            username: customerName,
            email: email,
            status: status,
            contact: contact,
            hostel: hostel,
            address: address,
        }, {
            where: { cus_id: customerId }  // Ensure you're updating the correct row by cus_id
        });

        if (updatedRows === 0) {
            // No rows were updated
            return null; // or throw an error based on your preference
        }

        // Fetch the updated customer to return it
        const updatedCustomer = await Customer.findByPk(customerId);
        return updatedCustomer; // Return the updated customer details
    } catch (error) {
        console.error('Error updating customer details:', error);
        throw new Error('An error occurred while updating customer details: ' + error.message);
    }
}

module.exports = {
    getCustomerDetailsByCustomerId,
    updateCustomerDetails,
};
