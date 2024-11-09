const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER, 
        allowNull: true, 
    },
    customerId: {
        type: DataTypes.INTEGER, 
        allowNull: true, 
    },
}, {
    timestamps: true, 
});


async function syncUserModel() {
    try {
        await User.sync(); 
        console.log('User table created or already exists');
    } catch (error) {
        console.error('Error creating User table:', error);
    }
}

syncUserModel();

module.exports = User;
