const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('./userModel'); 
const sequelize = require('../config/database');

const Customer = sequelize.define('customer', {
    cus_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
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
    freezeTableName: true, 
});

exports.Signup = class {
    async signupCusDetails(body) {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const customer = await Customer.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            status: body.status,
            contact: body.contact,
            hostel: body.hostel,
            address: body.address,
        });

        await User.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            role: 'Customer',
            customerId: customer.cus_id, 
            restaurantId: null, 
        });

        return customer;
    }

    async getCustomerById(customerId) {
        const customer = await Customer.findByPk(customerId);
        return customer;
    }

    async updateCustomer(customerId, body) {
        const customer = await Customer.findByPk(customerId);
        if (!customer) throw new Error('Customer not found');
        await customer.update(body);
        return customer;
    }
};
