const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('customer', {
    cus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    
},{
    freezeTableName: true,

});

async function getCustomerDetailsByCustomerId(customerId) {
    try {
        const customer = await Customer.findOne({ 
            where: { cus_id: customerId }, 
            attributes: ['cus_id', 'username', 'email', 'status', 'contact', 'hostel', 'address']
        });
    console.log(customer);
        return customer ? customer : null;
    } catch (error) {
        console.error('Error fetching customer details:', error);
        throw new Error('An error occurred while fetching customer details: ' + error.message);
    }
}

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
            where: { cus_id: customerId } 
        });

        if (updatedRows === 0) {
            return null;
        }

        const updatedCustomer = await Customer.findByPk(customerId);
        return updatedCustomer; 
    } catch (error) {
        console.error('Error updating customer details:', error);
        throw new Error('An error occurred while updating customer details: ' + error.message);
    }
}

module.exports = {
    getCustomerDetailsByCustomerId,
    updateCustomerDetails,
};
