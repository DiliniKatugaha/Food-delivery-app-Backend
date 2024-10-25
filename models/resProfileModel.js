const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Restaurateur model for the restaurant table
const Restaurateur = sequelize.define('restaurateur', {
    res_id: {  // Primary key
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ownername: {  // Correct the field name to match the database ('ownername')
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    contact: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    openHours: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    deliveryPlaces: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    logo: {
        type: DataTypes.BLOB('long'),  // Correct type for logo storage
        allowNull: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    tableName: 'Restaurateur', // Specify the table name to match the database
});

// Fetch restaurant details by restaurantId (res_id)
async function getRestaurantDetailsByRestaurantId(restaurantId) {
    try {
        const restaurant = await Restaurateur.findOne({
            where: { res_id: restaurantId },  // Use res_id as the primary key
            attributes: [ // Specify only the fields needed for profile retrieval
                'res_id', 'username', 'ownername', 'email', 'contact', 'type',
                'openHours', 'deliveryPlaces', 'address', 'logo', 'createdAt', 'updatedAt'
            ]
        });
        return restaurant ? restaurant : null;
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        throw new Error('An error occurred while fetching restaurant details');
    }
}

// Update restaurant details
async function updateRestaurantDetails(restaurantId, restaurantName, ownerName, contactNumber, openHours, deliveryPlaces, address, email, logoPath) {
    try {
        const [updatedRows] = await Restaurateur.update({
            username: restaurantName,
            ownername: ownerName,  // Ensure this matches the DB column
            contact: contactNumber,
            openHours,
            deliveryPlaces,
            address,
            email,
            logo: logoPath  // Update the logo if necessary
        }, {
            where: { res_id: restaurantId }  // Ensure you're updating the correct row by res_id
        });

        return updatedRows > 0;
    } catch (error) {
        console.error('Error updating restaurant details:', error);
        throw new Error('An error occurred while updating restaurant details');
    }
}

module.exports = {
    getRestaurantDetailsByRestaurantId,
    updateRestaurantDetails,
};
