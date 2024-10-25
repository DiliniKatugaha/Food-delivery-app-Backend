const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('./userModel'); // Import the User model
const sequelize = require('../config/database');

// Define the Customer model
const Customer = sequelize.define('customer', {
    cus_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment this column
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
}, {
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
});

// Signup customer details
exports.Signup = class {
    async signupCusDetails(body) {
        // Hash the customer's password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create the customer record in the Customer table
        const customer = await Customer.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            status: body.status,
            contact: body.contact,
            hostel: body.hostel,
            address: body.address,
        });

        // After creating the customer, add the record to the User table
        await User.create({
            username: body.username,
            email: body.email,
            password: hashedPassword, // Use the same hashed password
            role: 'Customer', // Set role as 'Customer'
            customerId: customer.cus_id, // Link the customer to this user
            restaurantId: null, // No restaurantId for customers
        });

        return customer;
    }

    // Method to get customer by ID
    async getCustomerById(customerId) {
        const customer = await Customer.findByPk(customerId);
        return customer;
    }

    // Method to update customer details
    async updateCustomer(customerId, body) {
        const customer = await Customer.findByPk(customerId);
        if (!customer) throw new Error('Customer not found');
        await customer.update(body);
        return customer;
    }
};
