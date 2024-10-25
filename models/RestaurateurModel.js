const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

// Define the Restaurateur model
const Restaurateur = sequelize.define('restaurateur', {
    res_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ownername: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    type:{
        type:DataTypes.STRING(50),
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
    logo: {
        type: DataTypes.BLOB('long'), // Store logo as a BLOB
        allowNull: true,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    tableName: 'restaurateur', // Specify the table name in the database
});

// Static method to get all restaurateurs
Restaurateur.getDetails = async () => {
    try {
        const restaurateurs = await Restaurateur.findAll({
            attributes: ['res_id', 'username', 'ownername', 'email', 'contact', 'type', 'openHours', 'deliveryPlaces', 'logo'], // Specify the fields to fetch
        });

        // Convert the BLOB to a base64-encoded string for each restaurateur
        return restaurateurs.map(restaurant => {
            const restaurantData = restaurant.get({ plain: true }); // Get plain object representation
            if (restaurantData.logo) {
                const logoBase64 = restaurantData.logo.toString('base64');
                return {
                    ...restaurantData,
                    logo: `data:image/png;base64,${logoBase64}` // Make sure to use appropriate MIME type for the image
                };
            }
            return restaurantData;
        });
    } catch (error) {
        console.error('Error fetching restaurateur details:', error);
        throw new Error('An error occurred while fetching restaurateur details');
    }
};

// Export the model
module.exports = { Restaurateur };
