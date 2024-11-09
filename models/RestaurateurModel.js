const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
        type: DataTypes.BLOB('long'), 
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'restaurateur', 
});

Restaurateur.getDetails = async () => {
    try {
        const restaurateurs = await Restaurateur.findAll({
            attributes: ['res_id', 'username', 'ownername', 'email', 'contact', 'type', 'openHours', 'deliveryPlaces', 'logo'], // Specify the fields to fetch
        });

        return restaurateurs.map(restaurant => {
            const restaurantData = restaurant.get({ plain: true }); 
            if (restaurantData.logo) {
                const logoBase64 = restaurantData.logo.toString('base64');
                return {
                    ...restaurantData,
                    logo: `data:image/png;base64,${logoBase64}` 
                };
            }
            return restaurantData;
        });
    } catch (error) {
        console.error('Error fetching restaurateur details:', error);
        throw new Error('An error occurred while fetching restaurateur details');
    }
};

module.exports = { Restaurateur };
