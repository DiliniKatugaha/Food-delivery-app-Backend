// models/menuModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Menu model
const Menu = sequelize.define('Menu', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Assuming you save the image URL or path
        allowNull: true,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryFee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Menu;
