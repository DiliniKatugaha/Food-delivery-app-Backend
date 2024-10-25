const User = require('./userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


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
        allowNull: true,
    },
    openHours: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    deliveryPlaces: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    logo: {
        type: DataTypes.BLOB('long'),  // Correct type for logo storage
        allowNull: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    tableName: 'Restaurateur', // Specify the table name to match the database
});


class Signup {
    async signupResDetails(details) {
        if (!details.email || !details.password) throw new Error('Email and Password Fields are required!');
        if (!validator.isEmail(details.email)) throw new Error('Email is not valid!');
        if (!validator.isStrongPassword(details.password)) throw new Error('Password is not strong enough!');

        // Check for existing email
        const existingUser = await User.findOne({ where: { email: details.email } });
        if (existingUser) throw new Error('Email already signed up!');

        const hash = await bcrypt.hash(details.password, 10);

        // Create new user
// Assuming you are using the User model to create users
const newUser = await User.create({
    username: details.username,
    email: details.email,
    password: hash,
    role: 'Restaurateur',
    restaurantId: details.restaurantId, // Make sure to provide the correct restaurantId
});

        await Restaurateur.create({
            username: details.username,
            ownername: details.ownername,
            email: details.email,
            contact: details.contact,
            password: hash,
        })

        return newUser;
    }

     
    
}


class Update {
    async updateResDetails(details, logoFile) {
        // Validate input details
        if (!validator.isEmail(details.email)) throw new Error('Email is not valid!');
        if (!details.username || !details.ownername || !details.contact) {
            throw new Error('All fields are required!');
        }

        // Check if a restaurant with the given email exists
        const existingUser = await User.findOne({ where: { email: details.email } });
        if (!existingUser) {
            throw new Error('Restaurant with the given email does not exist!');
        }

        // Prepare the update query
        let sql = `UPDATE restaurateur SET username = ?, ownername = ?, contact = ? WHERE email = ?`;
        const params = [details.username, details.ownername, details.contact, details.email];

        // Update the logo if it was provided
        if (logoFile) {
            const logoData = fs.readFileSync(logoFile.path); // Read the image file as binary data
            sql = `UPDATE restaurateur SET username = ?, ownername = ?, contact = ?, logo = ? WHERE email = ?`;
            params.splice(3, 0, logoData); // Insert logo data before the email parameter
        }

        // Execute the update query
        await db.execute(sql, params)
            .then((data) => {
                console.log('Profile updated successfully:', data[0]);
            })
            .catch((err) => {
                console.error('Error updating profile:', err.message);
                throw new Error(err.message);
            });
    }
}

module.exports = { Signup, Update };