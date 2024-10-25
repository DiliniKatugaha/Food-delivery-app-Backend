const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

// Define the User model
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
        type: DataTypes.INTEGER, // This should match the type used in your database
        allowNull: true, // It can be null for users that are not restaurateurs
    },
    customerId: {
        type: DataTypes.INTEGER, // This should match the type used in your database
        allowNull: true, // It can be null for users that are not restaurateurs
    },
}, {
    timestamps: true, // This enables `createdAt` and `updatedAt`
});


// Sync the model with the database
async function syncUserModel() {
    try {
        await User.sync(); // Use await for better error handling
        console.log('User table created or already exists');
    } catch (error) {
        console.error('Error creating User table:', error);
    }
}

// Call the sync function
syncUserModel();

module.exports = User;
