// models/categoryModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Menu = require('./menuModel'); // Make sure to import Menu

// Define the Category model
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Set up the association between Category and Menu
Category.belongsTo(Menu, { foreignKey: 'menuId' });
Menu.hasMany(Category, { foreignKey: 'menuId', as: 'categories' });

module.exports = Category;
