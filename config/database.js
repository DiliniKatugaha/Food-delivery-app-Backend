const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql', // MySQL is being used
    port: process.env.DBPORT || 3306, // Default MySQL port
    logging: false, // Disable logging, or set to console.log if you want to debug queries
});

// Test the connection to the MySQL database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
