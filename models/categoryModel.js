const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Menu = require('./menuModel');

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

Category.belongsTo(Menu, { foreignKey: 'menuId' });
Menu.hasMany(Category, { foreignKey: 'menuId', as: 'categories' });

module.exports = Category;
